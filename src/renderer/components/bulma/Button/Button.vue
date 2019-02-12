<template>
  <a 
    class="button" 
    v-on="$listeners"
    :class="modifiersClass"
  >
    <slot />
  </a>
</template>

<script>
import { COLORS, SIZES } from './../constants'
import { isModifier } from './../mixins'

export default {
  mixins: [isModifier(
    'rounded',
    'outlined',
    'inverted',
    'active',
    'focused',
    'fullwidth',
    'static',
    ...COLORS,
    ...SIZES
  )]
}
</script>
