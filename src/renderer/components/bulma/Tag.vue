<template>
  <span class="tag" :class="modifiersClass"><slot /></span>
</template>

<script>
import { COLORS, SIZES } from './constants'
import { isModifier } from './mixins'

export default {
  mixins: [isModifier(
    ...COLORS,
    ...SIZES
  )]
}
</script>