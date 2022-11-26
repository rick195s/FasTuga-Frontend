<script setup>
import { colorsBgLight } from "@/colors.js";
import WaitingSpinner from "@/components/dashboard/WaitingSpinner.vue";

defineProps({
  color: {
    type: String,
    required: true,
  },
  waiting: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex flex-col mb-6 -mt-6 -mr-6 -ml-6 animate-fade-in">
    <div
      :class="[colorsBgLight[color]]"
      class="rounded-t-2xl flex items-center flex-row justify-between p-6 transition-colors"
    >
      <slot />
      <WaitingSpinner v-if="waiting" />
    </div>
  </div>
</template>
