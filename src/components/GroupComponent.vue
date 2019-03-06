<template>
  <div class="group box">
    <div class="top">
      <b-tag primary medium class="name">{{ group.name }}</b-tag>
      <edit-group v-if="edit" :group-id="group.id" />
    </div>

    <div style="display: inline-block; padding: 8px;">
      <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" :is-static="edit">
        <edit-audio v-if="edit" :audio-id="audioInfo.id" />
      </audio-component>
      <add-audio :group-id="group.id" v-if="edit"/>
    </div>
  </div>
</template>

<script>
import AudioComponent from './AudioComponent'
import AddAudio from './AddAudio'
import EditAudio from './EditAudio.vue'
import EditGroup from './EditGroup.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AddAudio,
    EditAudio,
    EditGroup,
    AudioComponent
  },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    ...mapState({
      group (state) { return state.groups.items[this.id] },
      edit: state => state.edit
    }),

    // ...mapGetters('audioList'),

    audio () {
      return this.$store.getters.audioList.filter(audio => audio.groupId === this.group.id)
    }
  }
}
</script>

<style lang="scss">
@mixin space-out($min, $max) {
  @for $i from $min through $max {
    &:first-child:nth-last-child(#{$i}),
    &:first-child:nth-last-child(#{$i}) ~ & {
      width: 1 / $i * 100%;
    }
  }
}

.group {
  // @include space-out(1, 6);
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.top {
  position: absolute;
  top: 0;
  transform:translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  right: 12px;
  left: 12px;
}
</style>
