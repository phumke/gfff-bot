const Discord = require('discord.js');
const token = require('./chat_token.js');
const input = require('./input_constants.js')

const client = new Discord.Client();
client.login(token);

client.on('ready', () => {
  console.log('I am ready!');
});

// TODO convert this to a string -> fn map instead
client.on('message', message => {
  var content = message.content.toLowerCase();

  console.log(content);

  if (content === input.HELP) {
    message.reply('Commands: mh, my hero, brett likes men, brett loves dicks, our <count> heros, oh#');
  } else if (content === input.MY_HERO ||
            content === input.MY_HERO2) {
    message.reply(getRandomHero());
  } else if (content === input.BRETT_LIKES_MEN ||
            content === input.BRETT_LOVES_DICKS ||
            (content.includes(input.BRETT) && content.includes(input.MEN))) {
    message.reply('(Always), and you\'re ' + getRandomHero());
  } else if (content.includes(input.OUR) &&
            content.includes(input.HEROS)) {
    var count = parseInt(content.split(' ')[1]);
    if (!isNaN(count)) {
      message.reply(getRandomHeros(count).join(', '));
    } else if (isNaN(count) && content.split(' ').length <= 3) {
      message.reply('Please include a count, like our 3 heros');
    }
  } else if (content.startsWith(input.OH) &&
            content !== input.OH) {
    var count = parseInt(content[2]);
    if (!isNaN(count)) {
      message.reply(getRandomHeros(count).join(', '));
    } else {
      message.reply('Please include a count, like oh3');
    }
  } else if (content === input.MY_WEENIS ||
            content === input.WEENIS) {
    message.reply(':eggplant:');
  }
});

function getRandomHeros(count) {
  var heros = new Set();

  for (i = 0; i < count; ++i) {
    var hero = getRandomHero();
    while (heros.has(hero)) {
      hero = getRandomHero();
    }
    heros.add(hero);
  }

  return Array.from(heros);
}

function getRandomHero () {
  var herolist = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjorn', 'Widowmaker', 'D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Ana', 'Lucio', 'Mercy', 'Symmetra', 'Zenyatta'];
  return chooseRandom(herolist);
}

function chooseRandom (items) {
  return items[Math.round(Math.random() * (items.length - 1))];
}
