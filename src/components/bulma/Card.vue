<template>
  <div class="card">
    <header class="card-header" v-if="$slots.header || $slots['header-title']">
      <slot name="header">
        <p class="card-header-title">
          <slot name="header-title" />
        </p>
      </slot>
    </header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>
