<template>
  <drop class="drop">
    <window-controls />
    <div>
      <div>
        <add-audio :file-path.sync="filePath" />
        <b-button @click="toggleEdit" :success="edit">Edit</b-button>
      </div>
    </div>
    <div style="overflow-x: hidden; overflow-y: auto;">
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <div style="display: inline-block; flex: 1;">
          <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" />
        </div>
        <div style="display: inline-block; flex: 1;">
          <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" />
        </div>
        <div style="display: inline-block; flex: 1;">
          <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" />
        </div>
      </div>
    </div>
  </drop>
</template>

<script>
import AudioComponent from './AudioComponent'
import AddAudio from './AddAudio'
import WindowControls from './WindowControls'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AudioComponent,
    AddAudio,
    WindowControls
  },

  data () {
    return {
      filePath: undefined
    }
  },

  computed: {
    ...mapState({
      audio: state => state.audio.audio,
      edit: state => state.edit
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
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
