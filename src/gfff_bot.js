const Discord = require('discord.js');
const token = require('../conf/chat_token.js');
const input = require('./input_handler.js');

const client = new Discord.Client();
client.login(token);

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var output = input.handle_message(message.content);
  if (output) {
    if (typeof output.then === 'function') {
      output.then(val => message.reply(val));
    } else {
      message.reply(output);
    }
  }
});
