const Discord = require('discord.js');
const token = require('./chat_token.js');
const input = require('./input_handler.js');

const client = new Discord.Client();
client.login(token);

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var output = input.handle_message(message.content);
  if (output) {
    message.reply(output);
  }
});
