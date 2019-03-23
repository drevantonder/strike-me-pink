<template>
  <span style="pointer-events: auto; margin-left: auto;">
    <edit-icons @edit="open" @remove="removeAudio(audio)"/>

    <object-modal :active.sync="active" title="Edit Audio" @save="save" @close="close">
      <audio-form v-bind.sync="audio" />

      <hr />

      <audio-component :audio-info="{...audio, name: 'Preview'}" />
    </object-modal>
  </span>
</template>

<script>
import EditIcons from './EditIcons.vue'
import AudioForm from './forms/AudioForm.vue'
import AudioComponent from './AudioComponent.vue'
import ObjectModal from './ObjectModal.vue'
import { mapState, mapActions } from 'vuex'
import { clone } from '../util'

function data () {
  return {
    active: false
  }
}

export default {
  components: {
    AudioForm,
    AudioComponent,
    ObjectModal,
    EditIcons
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
        return clone(state.audio.items[this.audioId])
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
