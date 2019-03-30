<template>
  <drop class="drop">
    <nav class="navbar is-fixed-top is-white">
      <div class="filename is-size-6">
        <template v-if="currentFile !== undefined">
          {{ currentFile | getFileAttribute('base') }}<template v-if="hasUnsavedChanges">*</template>
        </template>
        <template v-else>
          Unsaved Project
        </template>
      </div>
      <div class="navbar-drag" />
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              File
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="newProject">
                New
              </a>
              <a class="navbar-item" @click="openProject">
                Open
              </a>
              <a class="navbar-item" @click="saveProject">
                Save
              </a>
              <a class="navbar-item" @click="saveProjectAs">
                Save As
              </a>
              <div class="navbar-item">
                <div class="field">
                  <input id="automatic-saving-switch" type="checkbox" name="automatic-saving-switch" class="switch is-rounded is-outlined is-small" @change="setAutoSave($event.target.checked)" :checked="autoSave">
                  <label for="automatic-saving-switch">Auto Save</label>
                </div>
              </div>
            </div>
          </div>

          <div class="navbar-item">
            <div class="field">
              <input id="edit-mode-switch" type="checkbox" name="edit-mode-switch" class="switch is-rounded is-outlined" @change="setEdit($event.target.checked)" :checked="edit">
              <label for="edit-mode-switch">Edit Mode</label>
            </div>
          </div>
          <div class="navbar-item" v-if="edit">
            <add-group />
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <window-controls />
          </div>
        </div>
      </div>
    </nav>

    <main>
      <grid-layout
        :layout="layout"
        :col-num="groupsPerRow"
        :row-height="150"
        :is-draggable="edit"
        :is-resizable="edit"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="false"
        @layout-updated="onLayoutUpdated"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i">
          <group-component :id="item.i" />
        </grid-item>
      </grid-layout>
    </main>
    <!-- <span style="position: absolute; top: 0; left: 0; width: 20px; height: 99vh; background-color: yellow;" /> -->
  </drop>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import GroupComponent from './GroupComponent'
import WindowControls from './WindowControls'
import AddGroup from './AddGroup.vue'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    GroupComponent,
    WindowControls,
    GridLayout: VueGridLayout.GridLayout,
    AddGroup
  },

  data () {
    return {
      layout: []
    }
  },

  created () {
    this.layout = this.groupList.map(group => Object.assign({}, { ...group.grid, i: group.id }))
  },

  computed: {
    ...mapState({
      groups: state => state.groups.items,
      edit: state => state.edit,
      autoSave: state => state.persist.autoSave,
      currentFile: state => state.persist.currentFile,
      hasUnsavedChanges: state => state.persist.hasUnsavedChanges,
      groupsPerRow: state => state.groups.groupsPerRow
    }),
    ...mapGetters(['groupList', 'currentFileName'])
  },

  watch: {
    groupList () {
      this.layout = this.groupList.map(group => Object.assign({}, { ...group.grid, i: group.id }))
    }
  },

  methods: {
    ...mapActions(['setEdit', 'updateGroup', 'saveProject', 'openProject', 'newProject', 'saveProjectAs', 'setAutoSave']),

    onLayoutUpdated (layout) {
      layout.forEach(function (grid) {
        this.updateGroup({ ...this.groups[grid.i], grid })
      }.bind(this))
    }
  }
}
</script>

<style lang="scss">
main {
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  padding-top: 12px;
}

.navbar {
  z-index: 1000 !important;
  border-bottom: 1px solid #e3e3e3;
}

.drop {
  height: 100vh;
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 3.25rem;
}

.groups {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  padding: 16px;
}

.navbar-drag {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  -webkit-app-region: drag;
}

.navbar-item {
  -webkit-app-region: no-drag;
}

.filename {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
