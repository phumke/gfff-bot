
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
