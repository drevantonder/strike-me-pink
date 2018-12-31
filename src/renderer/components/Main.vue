<template>
  <audio-component :audio="audio" />
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
  }
}
</script>
