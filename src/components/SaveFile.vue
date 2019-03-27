<template>
  <b-button primary @click="showSaveDialog">
    Save
  </b-button>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const { dialog } = require('electron').remote

export default {
  computed: mapState(['currentFile']),

  methods: {
    showSaveDialog () {
      var filePath = dialog.showSaveDialog({ title: 'Save Project', filters: ['.json'] })

      if (!filePath) return

      this.setCurrentFile(filePath)
    },

    ...mapActions(['setCurrentFile'])
  }
}
</script>
