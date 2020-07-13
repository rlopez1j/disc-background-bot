class Bot {
  constructor(musicPlayer){
    this.voiceChannel = null
    this.inVoiceChat = false
    this.musicPlayer = musicPlayer
  }

  static inVoiceChat(){
    return this.inVoiceChat
  }

  static botChannel() {
    return this.voiceChannel !== null ? this.voiceChannel.id : null
  }

  static async changeVoiceState(voiceChannel = null){
    this.inVoiceChat = !this.inVoiceChat
    this.voiceChannel = voiceChannel

    if(this.inVoiceChat){
      const voiceConnection = await voiceChannel.join().catch(err => console.log('Err!', err))
      this.musicPlayer.playMusic(voiceConnection)
    } else {      
      this.musicPlayer.stopMusic(voiceChannel)
      voiceChannel.leave()
    }
  }

  joinOrNot(channel, isGroovy, validChannelChange){
    if(this.inVoiceChat && isGroovy){
      console.log('leave')
      return
    }
    if(channel.members.size === 0 || validChannelChange){
      console.log('join')
    }
  }

  leaveOrStay(channel, isGroovy){
    if(!this.inVoiceChat) return
    if(this.voiceChannel.id !== channel.id) return
    if(isGroovy || channel.members.size == 1){
      // changeVoiceState(channel)
      console.log('leave')
    }
  }

  static sendMessage(channel, message){
    console.log('sending ', message)
  }
}

module.exports = Bot