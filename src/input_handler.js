// TODO make these all regex and pass the matched regex along with the msg to the functions - in order to reduce rerunning duplicate code - hower this could be more expensive if everything is regex
// TODO switch all for (elem in elems) to elems.forEach() notation
// TODO add newlines to help response
// TODO add link to OW so you can query your and others ranks

handle_message = function(msg) {
  var msgl = msg.toLowerCase();
  var retval = '';

  console.log(msgl);

  retval = handle_exact_input(msgl);
  if (!retval) {
    retval = handle_contains_all(msgl);
  }
  if (!retval) {
    retval = handle_regex(msgl);
  }

  return retval;
};

handle_exact_input = function(msgl) {
  if (msgl in exact_input) {
    return exact_input[msgl](msgl);
  }

  return '';
};

handle_contains_all = function(msgl) {
  for (entry in contains_all) {
    var matchable_elems = contains_all[entry].terms;
    var to_call = contains_all[entry].fn;
    var matches = true;

    matchable_elems.forEach(function callback(elem, index, array) {
      if (matches && !msgl.includes(elem)) {
        matches = false;
      }
    });

    if (matches) {
      return to_call(msgl);
    }
  }
  return '';
}

handle_regex = function(msgl) {
  for (regex in input_regex) {
    var matched = new RegExp(regex).exec(msgl);
    if (matched && matched.length > 0) {
      var to_call = input_regex[regex];
      return to_call(msgl);
    }
  }

  return '';
};

// TODO refactor to put this into the main_functionality.js file

getHelp = function(msg) {
  return 'Commands: help, mh, my hero, brett likes men, brett loves dicks, our <count> heros, oh#';
};

getOurHeros = function(msg) {
  var count;

  if (msg.startsWith('oh')) {
    count = parseInt(msg[2]);
  } else {
    count = parseInt(msg.split(' ')[1]);
  }

  return getRandomHeros(count).join(', ');
};

getMyHero = function(msg) {
  return getRandomHero();
};

getEggplant = function(msg) {
  return ':eggplant:';
};

brettLikesMen = function(msg) {
  return '(Always), and you\'re ' + getRandomHero();
};

// -------

getRandomHero = function() {
  var herolist = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjorn', 'Widowmaker', 'D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Ana', 'Lucio', 'Mercy', 'Symmetra', 'Zenyatta'];
  return chooseRandom(herolist);
};

getRandomHeros = function(count) {
  var heros = new Set();

  for (i = 0; i < count; ++i) {
    var hero = getRandomHero();
    while (heros.has(hero)) {
      hero = getRandomHero();
    }
    heros.add(hero);
  }

  return Array.from(heros);
};

chooseRandom = function(items) {
  return items[Math.round(Math.random() * (items.length - 1))];
};

var exact_input = {
  'help': getHelp,
  'my hero': getMyHero,
  'mh': getMyHero,
  'brett likes men': brettLikesMen,
  'brett loves dicks': brettLikesMen,
  'weenis': getEggplant,
  'my weenis': getEggplant,
};

var contains_all = {
  brettLikesMen: {
    terms: [
      'brett',
      'men',
    ],
    fn: brettLikesMen
  },
};

var input_regex = {
  'oh[1-6]': getOurHeros,
  'our [1-6] heros': getOurHeros,
};


module.exports = {
  handle_message: handle_message,
};
