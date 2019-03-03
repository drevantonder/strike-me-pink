<template>
  <b-button @click="togglePlay" large :static="isStatic" class="my-audio">
    <span class="my-text">
      <i class="fal fa-compact-disc" :class="playIcon"></i>&nbsp;{{ audioInfo.name }}
    </span>
    <span class="my-progress" :style="{ 'width': progress }" />

    <slot />

  </b-button>
</template>

<script>
export default {
  props: {
    audioInfo: {
      required: true,
      type: Object
    },

    isStatic: {
      required: false,
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      duration: 0,
      showVolume: false,
      currentTime: 0,
      loop: false,
      volume: 1,
      paused: true,
      audio: null,

      editModalActive: false
    }
  },

  mounted () {
    this.audio = new Audio(this.audioInfo.file)

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
      if (this.edit) {
        return
      }
      if (this.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
        this.audio.currentTime = 0
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
    },

    openEditModal (e) {
      this.editModalActive = true
    }
  },

  computed: {
    playIcon () {
      return this.paused ? '' : 'fas fa-spin'
    },

    loopIcon () {
      return this.loop ? 'far' : 'fal'
    },

    progress () {
      return (this.currentTime / this.duration * 100).toString() + '%'
    }
  },

  filters: {
    SecToTime (t) {
      function padZero (v) {
        return (v < 10) ? '0' + v : v
      }

      return padZero(parseInt((t / (60)) % 60)) + ':' + padZero(parseInt((t) % 60))
    }
  },

  destroyed () {
    this.audio.pause()
  }
}
</script>

<style lang="scss">
.my-audio {
  display: flex;
  position: relative;
  margin: 16px 0;

  .my-text {
    z-index: 1;
    background-color: transparent;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .my-progress {
    position: absolute;
    display: block;
    min-height: 100%;
    border-radius: inherit;
    background-color: rgb(43,194,83);
    overflow: hidden;
    left: 0;
  }
}
</style>
