<template>
  <main>
    <add-audio :file-path.sync="filePath" />
    <drop @drop="handleDrop">
      <audio-component :audio="audio" />
    </drop>
  </main>
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
