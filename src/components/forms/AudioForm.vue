<template>
  <form class="is-size-6">
    <b-field>
      <b-label>Name</b-label>
      <b-control>
        <b-input type="text" placeholder="Name" :value="name" @input="$emit('update:name', $event)" />
      </b-control>
    </b-field>

    <b-field>
      <b-label>File</b-label>
      <b-control>
        <b-file :files="[ { name: 'Audio Files', extensions: ['mp3'] } ]" @open="openFile">{{ fileName }}</b-file>
      </b-control>
    </b-field>

    <b-field>
      <b-label>Volume</b-label>
      <b-control>
        <vue-slider :value="volume" @change="$emit('update:volume', $event)" />
      </b-control>
    </b-field>
  </form>
</template>

<script>
import VueSlider from 'vue-slider-component'
import path from 'path'

export default {
  props: {
    name: {
      required: true
    },

    file: {
      required: true
    },

    volume: {
      required: true
    }
  },

  components: {
    VueSlider
  },

  computed: {
    fileName () {
      return this.file ? path.basename(this.file) : 'None selected 😢'
    }
  },

  methods: {
    openFile (filePaths) {
      this.$emit('update:file', filePaths[0])
    }
  }
}
</script>
