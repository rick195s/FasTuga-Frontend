<script setup>
import { mdiCog } from "@mdi/js";
import { useSlots, computed } from "vue";
import BaseIcon from "@/components/dashboard/BaseIcon.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import IconRounded from "@/components/dashboard/IconRounded.vue";

defineProps({
  icon: {
    type: String,
    default: null,
  },
  endIcon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
});

defineEmits(["endIconClick"]);

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <section
    :class="{ 'pt-6': !main }"
    class="mb-6 flex items-center justify-between"
  >
    <div class="flex items-center justify-start">
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        color="light"
        class="mr-3"
        bg
      />
      <BaseIcon v-else-if="icon" :path="icon" class="mr-2" size="20" />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton
      v-else
      :icon="endIcon || mdiCog"
      color="whiteDark"
      @icon-click="$emit('endIconClick')"
    />
  </section>
</template>
