<template>
  <b-button @click="togglePlay" large fullwidth :static="edit" class="my-audio">
    <span class="my-text">
      <i class="fal fa-compact-disc" :class="playIcon"></i>&nbsp;{{ audioInfo.name }}
    </span>
    <span class="my-progress" :style="{ 'width': progress }" />
    
    <edit-audio v-if="edit" :audioId="this.audioInfo.id" />
    
  </b-button>
</template>

<script>
import { mapState } from 'vuex'
import fs from 'fs'
import dataurl from 'dataurl'

import EditAudio from './EditAudio.vue'

export default {
  props: {
    audioInfo: {
      required: true,
      type: Object
    }
  },

  components: {
    EditAudio
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
    fs.readFile(this.audioInfo.file, function (err, data) {
      if (err) throw err
      this.audio = new Audio(dataurl.convert({ data, mimetype: 'audio/mp3' }))

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
    }.bind(this))
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
    },

    ...mapState({
      edit: state => state.edit
    })
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
  position: relative;
  max-width: 100%;

  margin: 20px;

  .my-text {
    z-index: 1;
    background-color: transparent;
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
