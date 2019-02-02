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
import path from 'path'

export default {
  props: {
    audioInfo: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      duration: 0,
      showVolume: false,
      currentTime: 0,
      loop: false,
      volume: 1,
      paused: false,
      audio: null
    }
  },

  async mounted () {
    this.audio = new Audio(path.join('static', this.audioInfo.file))

    this.audio.currentTime = this.currentTime
    this.audio.loop = this.loop
    this.audio.volume = this.volume

    if (this.paused) {
      this.audio.pause()
    } else {
      this.audio.play()
    }

    this.duration = this.audio.duration

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
