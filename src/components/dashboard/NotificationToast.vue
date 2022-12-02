<script setup>
import { mdiCheckBold, mdiCloseThick } from "@mdi/js";
import { computed } from "vue";
import { getButtonColor } from "@/colors.js";
import BaseIcon from "@/components/dashboard/BaseIcon.vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
  message: {
    type: String,
    default: null,
  },
});

defineEmits(["close"]);

const icon = computed(() => {
  switch (props.type) {
    case "success":
      return mdiCheckBold;
    case "danger":
      return mdiCloseThick;
  }

  return mdiCheckBold;
});
</script>

<template>
  <div
    id="toast"
    class="flex z-10 fixed right-5 bottom-5 items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg"
      :class="getButtonColor(type)"
    >
      <BaseIcon :path="icon" />
    </div>
    <div class="ml-3 text-sm font-normal">{{ message }}</div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Close"
      @click="$emit('close')"
    >
      <BaseIcon :path="mdiCloseThick" />
    </button>
  </div>
</template>
