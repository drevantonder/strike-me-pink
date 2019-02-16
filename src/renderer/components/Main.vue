<template>
  <drop class="drop">
    <div class="field">
      <input id="switchRoundedOutlinedDefault" type="checkbox" name="switchRoundedOutlinedDefault" class="switch is-rounded is-outlined" @change="setEdit($event.target.checked)" :checked="edit">
      <label for="switchRoundedOutlinedDefault">Edit Mode</label>
    </div>
    <window-controls />
    <div>
      <div>
        <add-audio :file-path.sync="filePath" />
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
    ...mapActions(['setEdit'])
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
