<template>
  <div>
    <GlobalEvents @drop.prevent="fileDrop"/>
    <b-button @click="open">Add</b-button>
    <b-modal :active.sync="active" :width="640" v-if="active">
    <template slot="header">
      <p class="modal-card-title">Add Audio</p>
    </template>

    <audio-form v-bind.sync="audio" />

    <template slot="footer">
      <button class="button is-success" @click="save">Save</button>
      <button class="button" @click="close">Cancel</button>
    </template>  
  </b-modal>
  </div>  
</template>

<script>
import AudioForm from './forms/AudioForm'

import { mapActions } from 'vuex'
import path from 'path'

export default {
  components: {
    AudioForm
  },

  data () {
    return {
      audio: {
        name: undefined,
        file: undefined
      },
      active: false
    }
  },

  watch: {
    'audio.file': function () {
      if (this.audio.name === undefined && this.audio.file !== undefined) {
        this.audio.name = this.audio.file.name
      }
    }
  },

  methods: {
    open () {
      this.active = true
    },

    save () {
      this.add(this.audio)

      this.close()
    },

    close () {
      this.active = false
    },

    fileDrop (event) {
      this.open()
      this.audio.file = path.parse(event.dataTransfer.files[0].path)
    },

    ...mapActions(['add'])
  }
}
</script>
