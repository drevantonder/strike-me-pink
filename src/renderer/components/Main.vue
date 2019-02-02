<template>
  <drop @drop="handleDrop" class="drop">
    <add-audio :file-path.sync="filePath" />
    
    <audio-component :audio="audio" />
  </drop>
</template>

<script>
import TestAudioFile from '../assets/test.mp3'
import AudioComponent from './AudioComponent'
import AddAudio from './AddAudio'

export default {
  components: {
    AudioComponent,
    AddAudio
  },

  data () {
    return {
      audio: new Audio(TestAudioFile),
      filePath: undefined
    }
  },

  methods: {
    handleDrop (data, event) {
      event.preventDefault()
      this.filePath = event.dataTransfer.files[0].path
    }
  }
}
</script>

<style lang="scss">
.drop {
  height: 100%;
  width: 100%;
}
</style>
