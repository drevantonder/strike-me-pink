<template>
  <b-button large fullwidth @click="open">
    Add
    <GlobalEvents @drop.prevent="fileDrop"/>
    <portal to="root">
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
    </portal>
  </b-button>
</template>

<script>
import AudioForm from './forms/AudioForm'

import { mapActions } from 'vuex'
import path from 'path'

function data () {
  return {
    audio: {
      name: undefined,
      file: undefined
    },
    active: false
  }
}

export default {
  components: {
    AudioForm
  },

  data () {
    return data()
  },

  props: {
    groupId: {
      required: true,
      type: String
    }
  },

  watch: {
    'audio.file': function () {
      if (this.audio.name === undefined && this.audio.file !== undefined) {
        this.audio.name = path.basename(this.audio.file, path.extname(this.audio.file))
      }
    }
  },

  methods: {
    open () {
      this.active = true
    },

    save () {
      this.add({ ...this.audio, groupId: this.groupId })

      this.close()
    },

    close () {
      this.active = false

      this.reset()
    },

    fileDrop (event) {
      this.open()
      this.audio.file = event.dataTransfer.files[0].path
    },

    reset () {
      Object.assign(this.$data, data())
    },

    ...mapActions({
      add: 'audio/add'
    })
  }
}
</script>
