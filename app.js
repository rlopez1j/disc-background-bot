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
  musicPlayer = new MusicPlayer('https://www.youtube.com/watch?v=JTszj4iZUMw')
  bot = new Bot()
})

client.login(process.env.DISCORD_CLIENT_SECRET)

client.on('message', async (message) => {
  if(message.author.bot) return
  if(!message.content.startsWith(']')) return

  let commandArgs = message.content.split(' ')
  commandArgs[0] = commandArgs[0].substr(1) // to remove the ']' character

  await BotCommands.run(message.channel, commandArgs)
})

 client.on('voiceStateUpdate', (previousDiscState, currentDiscState) => {
   
 })



