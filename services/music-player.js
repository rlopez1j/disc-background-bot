const ytdl = require('ytdl-core')

class MusicPlayer {
  constructor(defaultSong, voiceConnectionObject){
    this.playing = false
    this.songPlaying = null
    this.defaultSong = defaultSong
  }

  static playing() {
    return this.playing
  }

  playMusic(voiceConnection){
    console.log('playing music🎵') 
  }

  stopMusic(voiceChannel){
    console.log('stopping music⛔')
  }

  changeSong(songUrl){

  }

}

module.exports = MusicPlayer