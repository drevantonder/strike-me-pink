<template>
  <div class="modal" :class="modifiersClass" >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head" v-if="$slots.header">
        <slot name="header" />
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-card-foot" v-if="$slots.footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>
import { isModifier } from './mixins'

export default {
  mixins: [isModifier('active')],

  methods: {
    close () {
      this.$emit('update:active', false)
    },

    open () {
      this.$emit('update:active', false)
    }
  }
}
</script>
