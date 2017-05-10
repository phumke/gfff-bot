module.exports = {
// TODO new code still in work - saving this here until I can get home and finish refactoring
// TODO make these all regex and pass the matched regex along with the msg to the functions - in order to reduce rerunning duplicate code - hower this could be more expensive if everything is regex
// TODO modify the exports to only export the handle message routineg

exact_input: {
  'help': getHelp(),
  'my hero': getMyHero(),
  'mh': getMyHero(),
  'brett likes men': brettLikesMen(),
  'brett loves dicks': brettLikesMen(),
  'weenis': getEggplant(),
  'my weenis': getEggplant(),
},

contains_all: {
  [
    'brett',
    'men',
  ]: brettLikesMen(),
  [
    'our',
    'heros',
  ]: getOurHeros(),
},

input_regex: {
  'oh[1-6]': getOurHeros(),
},

handle_message: function(msg) {
  var msgl = msg.toLowerCase();
  var retval;

  console.log(msgl);

  retval = handle_exact_input(msgl);
  if (!retval) {
    retval = handle_contains_all(msgl);
  }
  if (!retval) {
    retval = handle_regex(msgl);
  }

  return retval;
},

handle_exact_input: function(msgl) {
  if this.exact_input.contains(msgl) {
    return exact_input[msgl];
  }

  return null;
},

handle_contains_all: function(msgl) {
  for entry in contains_all {
    var elems = entry.key();
    var to_call = entry.value();
    var matches = true;

    for elem in elems {
      if !msgl.contains(elem) {
        matches = false;
        break;
      }
    }
    if matches {
      return to_call(msgl);
    }
  }
  return null;
},

handle_regex: function(msgl) {
  for entry in input_regex {
    var regex = entry.key();
    var to_call = entry.value();
    var matched = regex.exec(msgl);
    if matched.length > 0 {
      return to_call(msgl);
    }
  }

  return null;
},

// TODO refactor to put this into the main_functionality.js file

getHelp: function(msg) {
  return 'Commands: help, mh, my hero, brett likes men, brett loves dicks, our <count> heros, oh#';
},

getOurHeros: function(msg) {
  var count;

  if msg.startsWith('oh') {
    count = parseInt(content[2]);
  } else {
    count = parseInt(content.split(' ')[1]);
  }

  return getRandomHeros(count);
},

getMyHero: function(msg) {
  return getRandomHero();
},

eggplant: function(msg) {
  return ':eggplant:';
},

brettLikesMen: function(msg) {
  return '(Always), and you\'re ' + getRandomHero();
},

// -------

getRandomHero: function() {
  var herolist = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjorn', 'Widowmaker', 'D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Ana', 'Lucio', 'Mercy', 'Symmetra', 'Zenyatta'];
  return chooseRandom(herolist);
},

getRandomHeros: function(count) {
  var heros = new Set();

  for (i = 0; i < count; ++i) {
    var hero = getRandomHero();
    while (heros.has(hero)) {
      hero = getRandomHero();
    }
    heros.add(hero);
  }

  return Array.from(heros);
},

chooseRandom: function(items) {
  return items[Math.round(Math.random() * (items.length - 1))];
},

}
