<template>
  <progress
    class="progress"
    v-on="$listeners"
    :class="modifiersClass"
  ><slot /></progress>
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
