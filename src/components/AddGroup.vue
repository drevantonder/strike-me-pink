<template>
  <b-button primary @click="open">
    Add Group
    <object-modal :active.sync="active" title="Add Group" @save="save" @close="close">
      <group-form v-bind.sync="group" />
    </object-modal>
  </b-button>
</template>

<script>
import GroupForm from './forms/GroupForm'
import { mapActions } from 'vuex'
import ObjectModal from './ObjectModal.vue'

function data () {
  return {
    group: {
      name: undefined
    },
    active: false
  }
}

export default {
  components: {
    GroupForm,
    ObjectModal
  },

  data () {
    return data()
  },

  methods: {
    open () {
      this.active = true
    },

    save () {
      this.addGroup(this.group)

      this.close()
    },

    close () {
      this.active = false

      this.reset()
    },

    reset () {
      Object.assign(this.$data, data())
    },

    ...mapActions({
      addGroup: 'addGroup'
    })
  }
}
</script>
