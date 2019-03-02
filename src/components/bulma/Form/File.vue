<template>
  <div class="file">
    <label class="file-label">
      <!-- <input class="file-input" type="file"> -->
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label" @click="showOpenDialog">
          Choose a file...
        </span>
      </span>
      <span class="file-name">
          <slot />
        </span>
    </label>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
  props: {
    defaultPath: {
      required: false
    },
    filters: {
      required: false
    }
  },

  methods: {
    showOpenDialog () {
      dialog.showOpenDialog(this.hasProps ? {
        defaultPath: this.defaultPath,
        filters: this.filters
      } : {}, this.openFile)
    },

    openFile (filePaths) {
      this.$emit('open', filePaths)
    }
  },

  computed: {
    hasProps () {
      return this.defaultPath || this.filters
    }
  }
}
</script>
