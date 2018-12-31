<template>
  <b-columns vcentered>
    <b-column narrow>
      <b-button primary rounded inverted @click="togglePlay">
        <i class="fal" :class="playIcon"></i>
      </b-button>
      <b-button primary rounded inverted @click="toggleLoop">
        <i class="fa-repeat" :class="loopIcon"></i>
      </b-button>
    </b-column>
    <b-column>
      <b-progress primary small :value="currentTime" :max="duration" ref="currentTime" @click="changeCurrentTime"></b-progress>
    </b-column>
    <b-column v-show="showVolume" @mouseenter="showVolume = true" @mouseleave="showVolume = false">
      <b-progress primary small :value="volume" :max="1" ref="volume" @click="changeVolume"></b-progress>
    </b-column>
    <b-column narrow @mouseenter="showVolume = true" @mouseleave="showVolume = false">
      <b-button primary rounded inverted ><i class="fal fa-volume"></i></b-button>
    </b-column>
  </b-columns>
</template>

<script>
import TestAudioFile from '../assets/test.mp3'

export default {
  data () {
    return {
      audio: new Audio(TestAudioFile),
      paused: true,
      currentTime: 0,
      duration: 0,
      loop: false,
      showVolume: false,
      volume: 0
    }
  },

  mounted () {
    this.audio.play()
    this.audio.currentTime = this.currentTime

    this.duration = this.audio.duration
    this.paused = this.audio.paused
    this.loop = this.audio.loop
    this.volume = this.audio.volume

    var that = this
    this.audio.addEventListener('play', () => { that.paused = false })
    this.audio.addEventListener('pause', () => { that.paused = true })
    this.audio.addEventListener('timeupdate', () => { that.currentTime = that.audio.currentTime })
    this.audio.addEventListener('durationchange', () => { that.duration = that.audio.duration })
  },

  methods: {
    togglePlay () {
      if (this.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },

    toggleLoop () {
      if (this.loop) {
        this.audio.loop = false
        this.loop = false
      } else {
        this.audio.loop = true
        this.loop = true
      }
    },

    changeVolume (e) {
      const element = this.$refs.volume.$el
      this.volume = (e.pageX - element.offsetLeft) / element.offsetWidth
      this.audio.volume = this.volume
    },

    changeCurrentTime (e) {
      const element = this.$refs.currentTime.$el
      this.currentTime = ((e.pageX - element.offsetLeft) / element.offsetWidth) * this.duration
      this.audio.currentTime = this.currentTime
    }
  },

  computed: {
    playIcon () {
      return 'fa-' + (this.paused ? 'play' : 'pause')
    },

    loopIcon () {
      return this.loop ? 'far' : 'fal'
    }
  }
}
</script>
