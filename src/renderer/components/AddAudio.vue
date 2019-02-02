<template>
  <b-modal :active.sync="show" :width="640" v-if="show">
    <template slot="header">
      <p class="modal-card-title">Add Audio</p>
    </template> 

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="name">
      </div>
    </div>
    
    <div class="file">
      <label class="file-label">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label" @click="showOpenDialog(file.dir)">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          {{ file.base }}
        </span>
      </label>
    </div>
    <template slot="footer">
      <button class="button is-success" @click="save">Save</button>
      <button class="button">Cancel</button>
    </template>  
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

const { dialog } = require('electron').remote
const path = require('path')

export default {
  props: {
    filePath: {
      required: false,
      type: [String, undefined],
      default: undefined
    }
  },

  data () {
    return {
      customName: undefined
    }
  },

  computed: {
    show () {
      return this.filePath !== undefined
    },

    file () {
      return path.parse(this.filePath)
    },

    name: {
      get () {
        return this.customName || this.file.name
      },

      set (value) {
        this.customName = value
      }
    }
  },

  methods: {
    showOpenDialog (path) {
      dialog.showOpenDialog({
        defaultPath: path,
        filters: [ { name: 'Audio Files', extensions: ['mp3'] } ]
      }, this.openFile)
    },

    openFile (filePaths) {
      if (Array.isArray(filePaths)) {
        this.$emit('update:filePath', filePaths[0])
      }
    },

    save () {
      this.add({
        name: this.name,
        file: this.file
      })

      this.$emit('update:filePath', undefined)
    },

    ...mapActions({
      add: 'audio/add'
    })
  }
}
</script>
