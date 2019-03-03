<template>
  <span style="pointer-events: auto;">
    <b-button @click="open">Edit</b-button>
    <b-button @click="removeAudio(audio)">Delete</b-button>

    <object-modal :active.sync="active" title="Edit Audio" @save="save" @close="close">
      <audio-form v-bind.sync="audio" />

      <hr />

      <audio-component :audio-info="{...audio, name: 'Preview'}" />
    </object-modal>
  </span>
</template>

<script>
import AudioForm from './forms/AudioForm.vue'
import AudioComponent from './AudioComponent.vue'
import ObjectModal from './ObjectModal.vue'

import { mapState, mapActions } from 'vuex'

function data () {
  return {
    active: false
  }
}

export default {
  components: {
    AudioForm,
    AudioComponent,
    ObjectModal
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
