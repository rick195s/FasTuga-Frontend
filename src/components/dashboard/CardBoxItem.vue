<script setup>
import { computed } from "vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import PillTag from "@/components/dashboard/PillTag.vue";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const statusColor = computed(() => {
  if (props.status === "Waiting") {
    return "warning";
  } else if (props.status === "Preparing") {
    return "info";
  } else if (props.status === "Ready") {
    return "success";
  }

  return "warning";
});
</script>

<template>
  <CardBox class="mb-6 last:mb-0 overflow-hidden" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar class="w-12 mr-6" :avatar="avatar" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">{{ price }}</p>
        </div>
      </BaseLevel>
      <PillTag :color="statusColor" :label="status" />
    </BaseLevel>
  </CardBox>
</template>
