<template>
  <form>
    <b-field>
      <b-label>Name</b-label>
      <b-control>
        <b-input type="text" placeholder="Name" :value="name" @input="$emit('update:name', $event)" />
      </b-control>
    </b-field>
    
    <b-file :files="[ { name: 'Audio Files', extensions: ['mp3'] } ]" @open="openFile">{{ fileName }}</b-file>
  </form>
</template>

<script>
import path from 'path'

export default {
  props: {
    name: {
      required: true
    },

    file: {
      required: true
    }
  },

  computed: {
    filePath: {
      get () {
        return path.join(this.file.dir, this.file.base)
      }
    },

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