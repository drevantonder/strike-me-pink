<template>
  <drop @drop="handleDrop">
    <audio-component :audio="audio" />
  </drop>
</template>

<script>
import TestAudioFile from '../assets/test.mp3'
import AudioComponent from './AudioComponent'

export default {
  components: {
    AudioComponent
  },

  data () {
    return {
      audio: new Audio(TestAudioFile)
    }
  },

  methods: {
    handleDrop (data, event) {
      event.preventDefault()
      const files = event.dataTransfer.files
    }
  }
}
</script>
