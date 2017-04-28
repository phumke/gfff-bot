const Discord = require('discord.js');
const token = require('./chat_token.js');

const client = new Discord.Client();
client.login(token);

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var content = message.content.toLowerCase();

  if (content === 'help') {
    message.reply('Commands: mh, my hero, brett likes men');
  } else if (content === 'my hero' ||
            content === 'mh') {
    message.reply(getRandomHero());
  } else if (content === 'brett likes men') {
    message.reply('(Always), and you\'re ' + getRandomHero());
  }
});

function getRandomHero () {
  var herolist = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjorn', 'Widowmaker', 'D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Ana', 'Lucio', 'Mercy', 'Symmetra', 'Zenyatta'];
  return chooseRandom(herolist);
}

function chooseRandom (items) {
  return items[Math.round(Math.random() * (items.length - 1))];
}
