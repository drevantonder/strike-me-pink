<template>
  <div style="margin-left: auto;">
    <b-button @click="open" rounded small><i class="fa fa-pencil"/></b-button>
    <b-button @click="remove" rounded small><i class="fa fa-trash"/></b-button>

    <object-modal :active.sync="active" title="Add Group" @save="save" @close="close">
      <group-form v-bind.sync="group" />
    </object-modal>
  </div>
</template>

<script>
import GroupForm from './forms/GroupForm'
import { mapActions, mapState } from 'vuex'
import ObjectModal from './ObjectModal.vue'
import { clone } from '../util'

function data () {
  return {
    active: false
  }
}

export default {
  components: {
    GroupForm,
    ObjectModal
  },

  props: {
    groupId: {
      required: true,
      type: String
    }
  },

  data () {
    return data()
  },

  computed: {
    ...mapState({
      group: function (state) {
        return clone(state.groups.items[this.groupId])
      }
    })
  },

  methods: {
    open () {
      this.active = true
    },

    remove () {
      this.removeGroup(this.group)
      this.removeAudioByGroup(this.group.id)
    },

    save () {
      this.updateGroup(this.group)

      this.close()
    },

    close () {
      this.active = false

      this.reset()
    },

    reset () {
      Object.assign(this.$data, data())
    },

    ...mapActions(['updateGroup', 'removeGroup', 'removeAudioByGroup'])
  }
}
</script>
