<template>
  <div 
    class="column" 
    :class="modifiersClass" 
    v-on="$listeners">
    <slot />
  </div>  
</template>

<script>
import { isModifier } from './mixins'

export default {
  mixins: [isModifier('narrow', 'three-quarters', 'two-thirds', 'one-third', 'one-quarter', 'one-half', 'full')]
}
</script>