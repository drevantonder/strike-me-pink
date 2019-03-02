<template>
  <span style="pointer-events: auto;">
    <b-button @click="open">Edit</b-button>
    <b-button @click="removeAudio(audio)">Delete</b-button>

    <b-modal :active.sync="active" :width="640" v-if="active">
      <template slot="header">
        <p class="modal-card-title">Edit Audio</p>
      </template>

      <audio-form v-bind.sync="audio" />

      <template slot="footer">
        <button class="button is-success" @click="save">Save</button>
        <button class="button" @click="close">Cancel</button>
      </template>
    </b-modal>
  </span>
</template>

<script>
import AudioForm from './forms/AudioForm.vue'

import { mapState, mapActions } from 'vuex'

function data () {
  return {
    active: false
  }
}

export default {
  components: {
    AudioForm
  },

  props: {
    audioId: {
      required: true,
      type: String
    }
  },

  data () {
    return data()
  },

  computed: {
    ...mapState({
      audio: function (state) {
        return state.audio.items.find(a => a.id === this.audioId)
      }
    })
  },

  methods: {
    open () {
      this.active = true
    },

    save () {
      this.updateAudio(this.audio)

      this.close()
    },

    close () {
      this.active = false
      this.reset()
    },

    reset () {
      Object.assign(this.$data, data())
    },

    ...mapActions({
      updateAudio: 'updateAudio',
      removeAudio: 'removeAudio'
    })
  }
}
</script>
