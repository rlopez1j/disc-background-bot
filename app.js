const Discord = require('discord.js')
const ytdl = require('ytdl-core')

require('dotenv').config()
const client = new Discord.Client()

client.once('ready', () => console.log('ready!'))
client.login(process.env.DISCORD_CLIENT_SECRET)
let backgroundMusic = 'https://www.youtube.com/watch?v=JTszj4iZUMw' // Jolly Roger Bay 10 Hours - Super Mario 64

 client.on('message', (message) => {
   const availableCommands = {
     'leave': {
       run: () => {
         for(const connection of client.voice.connections.values()){
           connection.disconnect()
         }
       }
     },
   }
   if(message.author.bot) return

   if(!message.content.startsWith(']')) return

   const commandArgs = message.content.split(' ')
   const commandString = commandArgs[0].substr(1) // to remove the ']' character
   const command = availableCommands[commandString]

   if(typeof command !== 'undefined'){
     command.run()
   }
 })

 client.on('voiceStateUpdate', (previousDiscState, currentDiscState) => {
  const channelEntered = currentDiscState.channel
  const channelLeft = previousDiscState.channel

  if(channelEntered !== null){
    for(const user of channelEntered.members.values()){
      if(user.user.username === 'Groovy'){
        channelEntered.leave()
        return
      }
    }
  }

  if(channelLeft !== null){  
    const botInChat = channelLeft.members.has(client.user.id)
    let onlyBots = true

    for(const user of channelLeft.members.values()){
      if(!user.user.bot){
        onlyBots = false
      }
    }

    if(botInChat || onlyBots){
      channelLeft.leave()
    }

    return
  }

   let numUsersInChat = channelEntered.members.size
   if(numUsersInChat === 1){ // only user in chat
    console.log('play music🎵') 

    currentDiscState.channel.join()
    const broadcast = client.voice.createBroadcast()
    broadcast.play(ytdl(backgroundMusic))
      .on('finish', () => currentDiscState.channel.leave())
    for(const connection of client.voice.connections.values()){
      connection.play(broadcast)
    }
   }
 })



