<template>
  <b-button large fullwidth @click="open">
    Add
    <GlobalEvents @drop.prevent="fileDrop"/>
    <object-modal :active.sync="active" title="Add Audio" @save="save" @close="close">
      <audio-form v-bind.sync="audio" />

      <hr />

      <audio-component :audio-info="{...audio, name: 'Preview'}" />
    </object-modal>
  </b-button>
</template>

<script>
import AudioForm from './forms/AudioForm'
import AudioComponent from './AudioComponent.vue'
import { mapActions } from 'vuex'
import path from 'path'
import ObjectModal from './ObjectModal.vue'

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
    AudioForm,
    AudioComponent,
    ObjectModal
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
      this.addAudio({ ...this.audio, groupId: this.groupId })

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
      addAudio: 'addAudio'
    })
  }
}
</script>
