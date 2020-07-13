import BotActions from ('./bot-actions')

class Bot {
  constructor(){
    this.voiceChannel = null
    this.inVoiceChat = false
  }

  static inVoiceChat(){
    return this.inVoiceChat
  }

  static async changeVoiceState(voiceChannel = null, musicPlayer){
    this.inVoiceChat = !this.inVoiceChat
    this.voiceChannel = voiceChannel

    if(this.inVoiceChat){
      const voiceConnection = await voiceChannel.join().catch(err => console.log('Err!', err))
      musicPlayer.playMusic(voiceConnection)
    } else {      
      musicPlayer.stopMusic(voiceChannel)
      voiceChannel.leave()
    }
  }

  static sendMessage(channel, message){
    console.log('sending ', message)
  }
}

module.exports = Bot