const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const BotCommands = require('./modules/commands')
const MusicPlayer = require('./services/music-player')
const Bot = require('./services/bot')

require('dotenv').config()
const client = new Discord.Client()

let musicPlayer
let bot

client.once('ready', () =>{
  bot = new Bot(new MusicPlayer('https://www.youtube.com/watch?v=JTszj4iZUMw'))
  console.log('ready!')
})

client.login(process.env.DISCORD_CLIENT_SECRET)

client.on('message', async (message) => {
  // remember to get member channel obj
  if(message.author.bot) return
  if(!message.content.startsWith(']')) return

  let commandArgs = message.content.split(' ')
  commandArgs[0] = commandArgs[0].substr(1) // to remove the ']' character

  await BotCommands.run(message.channel, commandArgs)
})

 client.on('voiceStateUpdate', (previousDiscState, currentDiscState) => {
  const currentChannel = currentDiscState.channel
  const previousChannel = previousDiscState.channel
  const isGroovy = currentDiscState.member.nickname === 'Groovy' ? true : false

  if(previousChannel === null && currentChannel !== null){
    bot.joinOrNot(currentChannel, isGroovy)
  } else if(previousChannel !== null && currentChannel === null){
    bot.leaveOrStay(previousChannel, isGroovy)
    return
  } else{
    if(currentChannel.id === previousChannel.id){
      console.log('do nothin')
      return
    }
    bot.joinOrNot(currentChannel, isGroovy)
  }
})



