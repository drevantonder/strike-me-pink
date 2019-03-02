<template>
  <div class="group box">
    <b-tag primary medium class="name">{{ group.name }}</b-tag>
    <div style="display: inline-block; padding: 8px;">
      <audio-component v-for="audioInfo in audio" :key="audioInfo.dir" :audio-info="audioInfo" />
      <add-audio :groupId="group.id" v-if="edit"/>
    </div>
  </div>
</template>

<script>
import AudioComponent from './AudioComponent'
import AddAudio from './AddAudio'
import { mapState } from 'vuex'

export default {
  components: {
    AddAudio,
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
      group (state) { return state.groups.items.find(g => g.id === this.id) },
      audio (state) { return state.audio.items.filter(a => a.groupId === this.group.id) },
      edit: state => state.edit
    })
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

.name {
  position: absolute;
  top: 0;
  transform:translateY(-50%);
  z-index: 10;
}
</style>
