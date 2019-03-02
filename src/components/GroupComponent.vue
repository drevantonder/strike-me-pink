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
import { mapState, mapActions } from 'vuex'

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
      group (state) { return state.groups.groups.find(g => g.id === this.id) },
      audio (state) { return state.audio.audio.filter(a => a.groupId === this.group.id) },
      edit: state => state.edit
    })
  },

  methods: {
    ...mapActions({
      update: 'groups/update'
    }),

    onMoved (i, newX, newY) {
      console.log(i, newX, newY)
    },

    onResized (i, newH, newW) {
      console.log(i, newH, newW)
    },

    onMove (i, newX, newY) {
      console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY)
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

.name {
  position: absolute;
  top: 0;
  transform:translateY(-50%);
  z-index: 10;
}
</style>
