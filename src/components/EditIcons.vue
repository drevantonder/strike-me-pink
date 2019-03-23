<template>
  <span>
    <b-button @click="$emit('edit')" rounded small><i class="fa fa-pencil"/></b-button>
    <b-button @click="$emit('remove')" rounded small><i class="fa fa-trash"/></b-button>
  </span>
</template>
