<template>
  <portal to="root">
    <b-modal :active="active" @update:active="$emit('update:active', $event)" :width="640" v-if="active">
      <template slot="header">
        <p class="modal-card-title">{{ title }}</p>
      </template>

      <slot />

      <template slot="footer">
        <button class="button is-success" @click="$emit('save')">Save</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </template>
    </b-modal>
  </portal>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },

    active: {
      required: true,
      type: Boolean
    }
  }
}
</script>
