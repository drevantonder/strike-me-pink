<template>
  <drop class="drop">
    <div class="navbar is-fixed-top is-white">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field">
              <input id="switchRoundedOutlinedDefault" type="checkbox" name="switchRoundedOutlinedDefault" class="switch is-rounded is-outlined" @change="setEdit($event.target.checked)" :checked="edit">
              <label for="switchRoundedOutlinedDefault">Edit Mode</label>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <window-controls />
          </div>
        </div>
      </div>
    </div>

    <main>
      <grid-layout
        :layout.sync="layout"
        :col-num="6"
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

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    GroupComponent,
    WindowControls,
    GridLayout: VueGridLayout.GridLayout
  },

  data () {
    return {
      layout: []
    }
  },

  created () {
    this.layout = this.groups.map(g => Object.assign({}, { ...g.grid, i: g.id }))
  },

  computed: {
    ...mapState({
      groups: state => state.groups.items,
      edit: state => state.edit
    })
  },

  methods: {
    ...mapActions(['setEdit', 'updateGroup']),

    onLayoutUpdated (layout) {
      layout.forEach(function (grid) {
        this.updateGroup({ ...this.groups.find(g => g.id === grid.i), grid })
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
</style>
