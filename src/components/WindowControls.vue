<template>
  <div class="window-controls">
  <b-button rounded @click="minimize">
    <i class="fal fa-minus" />
  </b-button>
  <b-button rounded @click="toggleMaximize">
    <i class="fal" :class="maximizeIcon" />
  </b-button>
  <b-button rounded danger outlined @click="close">
    <i class="fal fa-times" />
  </b-button>
  </div>
</template>

<script>
import { remote } from 'electron'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      window: remote.getCurrentWindow(),
      maximized: false
    }
  },
  mounted () {
    var self = this

    this.maximized = this.window.isMaximized()

    this.window.on('maximize', () => {
      self.maximized = true
    })
    this.window.on('unmaximize', () => {
      self.maximized = false
    })
  },

  methods: {
    ...mapActions(['saveProject']),

    minimize () {
      this.window.minimize()
    },

    toggleMaximize () {
      if (!this.window.isMaximized()) {
        this.window.maximize()
      } else {
        this.window.unmaximize()
      }
    },

    close () {
      if (this.hasUnsavedChanges) {
        var buttons = ['Save and close', 'Close without saving', 'Cancel']

        var indexOfButtonClicked = remote.dialog.showMessageBox(remote.getCurrentWindow(), {
          type: 'warning',
          message: 'Warning, you have unsaved changes.',
          buttons: buttons,
          defaultId: buttons.indexOf('Cancel'),
          cancelId: buttons.indexOf('Cancel')
        })

        var button = buttons[indexOfButtonClicked]
        if (button === 'Cancel') {
          return
        } else if (button === 'Save and close') {
          this.saveProject()
        }
      }
      this.window.close()
    }
  },

  computed: {
    ...mapState({
      hasUnsavedChanges: state => state.persist.hasUnsavedChanges
    }),

    maximizeIcon () {
      return this.maximized ? 'fa-compress-alt' : 'fa-expand-alt'
    }
  }
}
</script>

<style lang="scss">
.window-controls {
  // position: absolute;
  // right: 0;
  // top: 0;
  // left: auto;
  padding: 0;
  margin: 0;

  .button {
  margin: 0;
  }
}
</style>
