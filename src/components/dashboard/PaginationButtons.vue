<script setup>
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";

defineProps({
  pagesList: {
    type: Array,
    default: null,
  },
  currentPageHuman: {
    type: Number,
    default: null,
  },
  numPages: {
    type: Number,
    default: null,
  },
});

defineEmits(["change-page"]);
</script>

<template>
  <BaseLevel v-if="numPages > 1">
    <BaseButtons>
      <BaseButton
        v-for="page in pagesList"
        :key="page"
        :active="page.active"
        :label="page.label"
        :color="page.active ? 'lightDark' : 'whiteDark'"
        small
        @click="$emit('change-page', page.url)"
      />
    </BaseButtons>
    <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
  </BaseLevel>
</template>
