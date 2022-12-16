<script setup>
const props = defineProps({
  pType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <li :data-filter="'.' + isActive" :class="{ active: isActive }">
    {{ pType }}
  </li>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
