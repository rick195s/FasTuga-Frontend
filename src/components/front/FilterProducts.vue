<style scoped>
@import '@/../src/assets/css/style.css';
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>

<script setup>
const props = defineProps({
  pType: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li :data-filter="'.' + pType">
    {{ pType }}
  </li>
</template>
