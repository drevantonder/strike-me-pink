<template>
  <div large :static="isStatic" class="box ac-box">
    <template v-if="fileExists">
      <div class="ac-context">
        <span class="ac-controls">
          <a @click="togglePlay">
            <span class="icon" :class="activeColor">
              <i class="fas" :class="playIcon"></i>
            </span>
          </a>
          <a @click="stop">
            <span class="icon" :class="activeColor">
              <i class="fas fa-stop"></i>
            </span>
          </a>
        </span>
        <span class="ac-text">
          {{ audioInfo.name }}
        </span>
        <span class="ac-controls">
          <span>
            {{ currentTime | SecToTime }}/{{ duration | SecToTime }}
          </span>
          <a @click="toggleLoop">
            <span class="icon" :class="activeColor">
              <i class="fas" :class="loopIcon"></i>
            </span>
          </a>
        </span>
      </div>

      <vue-slider :value="currentTime" :max="Math.floor(duration)" :lazy="true" @change="changeCurrentTime" class="ac-slider" :tooltip-formatter="val => SecToTime(val)" />
    </template>
    <template v-else>
      <p class="has-text-danger"><i class="fal fa-exclamation-triangle"></i>&nbsp;Could not find file, please edit and locate file</p>
    </template>
    <slot />

  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import fs from 'fs'
import path from 'path'

function SecToTime (t) {
  function padZero (v) {
    return (v < 10) ? '0' + v : v
  }

  return padZero(parseInt((t / (60)) % 60)) + ':' + padZero(parseInt((t) % 60))
}

export default {
  components: {
    VueSlider
  },

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

  created () {
    this.setupAudio()
  },

  methods: {
    togglePlay () {
      if (this.isStatic) return

      if (this.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },

    stop () {
      if (this.isStatic) {
        return
      }
      this.audio.pause()
      this.audio.currentTime = 0
    },

    toggleLoop () {
      if (this.isStatic) return

      if (this.loop) {
        this.audio.loop = false
        this.loop = false
      } else {
        this.audio.loop = true
        this.loop = true
      }
    },

    changeCurrentTime (time) {
      this.currentTime = time
      this.audio.currentTime = this.currentTime
    },

    openEditModal (e) {
      this.editModalActive = true
    },

    setupAudio () {
      if (this.audioInfo.file === undefined) return
      if (this.audio) {
        this.audio.source = this.audioInfo.file
        this.audio.load()
        console.log(this.audioInfo.file)
        console.log(this.audio)
      } else {
        if (this.fileExists) {
          this.audio = new Audio(this.audioInfo.file)
        } else {
          return
        }
      }

      this.audio.currentTime = this.currentTime
      this.audio.loop = this.loop

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

    SecToTime
  },

  watch: {
    'audioInfo.volume' () {
      if (this.audio) {
        this.audio.volume = this.audioInfo.volume / 100
      }
    },

    'audioInfo.file' () {
      this.setupAudio()
    }
  },

  computed: {
    playIcon () {
      return this.paused ? 'fa-play' : 'fa-pause'
    },

    loopIcon () {
      return this.loop ? 'fa-repeat' : 'fa-arrow-to-right'
    },

    activeColor () {
      return this.isStatic ? 'has-text-grey' : 'has-text-primary'
    },

    fileExists () {
      if (this.audioInfo.file) {
        return path.extname(this.audioInfo.file) && fs.existsSync(this.audioInfo.file)
      } else {
        return true
      }
    }
  },

  filters: {
    SecToTime
  },

  destroyed () {
    if (this.audio) {
      this.audio.pause()
    }
  }
}
</script>

<style lang="scss">
.ac-box {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;

  .ac-context {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ac-controls {
      z-index: 1;
    }

    .ac-text {
      z-index: 1;
      background-color: transparent;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .ac-progress {
      position: absolute;
      display: block;
      min-height: 100%;
      border-radius: inherit;
      background-color: rgb(43,194,83);
      overflow: hidden;
      top: 0;
      left: 0;
    }
  }

  .ac-slider {
    margin-top: 8px;
  }
}
</style>
