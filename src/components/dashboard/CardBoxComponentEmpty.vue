<script setup>
import WaitingSpinner from "@/components/dashboard/WaitingSpinner.vue";
defineProps({
  waiting: Boolean,
});
</script>

<template>
  <div class="text-center py-24 text-gray-500 dark:text-slate-400">
    <p v-if="!waiting">Nothing's here…</p>
    <WaitingSpinner v-else />
  </div>
</template>
