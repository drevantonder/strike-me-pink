<template>
  <drop class="drop">
    <add-audio :file-path.sync="filePath" />
    <b-button @click="toggleEdit">Edit</b-button>
    <b-columns style="width: 100%">
      <b-column>
        <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" />
      </b-column>
    </b-columns>
    
    
  </drop>
</template>

<script>
import AudioComponent from './AudioComponent'
import AddAudio from './AddAudio'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AudioComponent,
    AddAudio
  },

  data () {
    return {
      filePath: undefined
    }
  },

  computed: {
    ...mapState({
      audio: state => state.audio
    })
  },

  methods: {
    ...mapActions(['toggleEdit'])
  }
}
</script>

<style lang="scss">
.drop {
  height: 100%;
  width: 100%;
}
</style>
