<template>
  <form class="is-size-6">
    <b-field>
      <b-label>Name</b-label>
      <b-control>
        <b-input type="text" placeholder="Name" :value="name" @input="$emit('update:name', $event)" />
      </b-control>
    </b-field>
  </form>
</template>

<script>
export default {
  props: {
    name: {
      required: true
    }
  }
}
</script>
