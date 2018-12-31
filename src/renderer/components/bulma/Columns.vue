<template>
  <div 
    class="columns" 
    :class="modifiersClass" 
    v-on="$listeners">
    <slot />
  </div>  
</template>

<script>
import { isModifier } from './mixins'

export default {
  mixins: [isModifier('vcentered')]
}
</script>