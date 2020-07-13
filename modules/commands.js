const Bot = require('../services/bot')

const commands = {
  'leave': {
    run: async (channel, args = null) =>{
      if(Bot.inVoiceChat){
        Bot.changeVoiceState()
      } else {
        await Bot.sendMessage(channel, 'I am not in the chat!')
      }
    } 
  },

  'help': {
    run: async (channel, args) => await Bot.sendMessage(channel, 'I\'m too lazy to type a help command')
  },

  'add': {
    run: async (channel, args) => {
      if(Bot.inVoiceChat()){
        await Bot.sendMessage(channel, "I am already in the chat!")
      } else {
        // add bot to user channel
        // play default
      }
    }
  }
}

module.exports = BotCommands = {
  run: async (channel, args) => {
    const command = commands[args[0]]
    
    if(typeof command !== 'undefined'){
      await command.run(channel, args)
    } else {
      await Bot.sendMessage(channel, 'This is not a command. Try ]help for help.')
    }
  }
}