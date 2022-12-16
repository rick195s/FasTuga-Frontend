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

<style scoped>
@import '@/../src/assets/css/style.css';
</style>

<template>
  <li :data-filter="'.' + isActive" :class="{ active: isActive }">
    {{ pType }}
  </li>
</template>