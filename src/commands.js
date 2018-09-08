// TODO refactor to put this into the main_functionality.js file

dpsHeros = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjorn', 'Widowmaker', 'Doomfist', 'Symmetra'];
healerHeros = ['Ana', 'Brigitte', 'Lucio', 'Mercy', 'Zenyatta', 'Moria'];
tankHeros = ['D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Wrecking Ball', 'Winston', 'Zarya'];

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
  var herolist = dpsHeros + healerHeros + tankHeros;
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

getRandomHealer = function() {
  return chooseRandom(healerHeros);
};

getRandomTank = function() {
  return chooseRandom(tankHeros);
};

getRandomDPS = function() {
  return chooseRandom(dpsHeros);
};

getRandomTeam = function() {
  return([getRandomHealer(), getRandomTank(), getRandomDPS(), getRandomDPS()].join(', '));
}
