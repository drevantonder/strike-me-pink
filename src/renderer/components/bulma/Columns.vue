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
  mixins: [isModifier(
    'vcentered',
    'multiline',
    'variable',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8')]
}
</script>