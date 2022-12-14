<script setup>
import { computed } from "vue";
import { mdiCellphone, mdiCreditCardOutline, mdiAt } from "@mdi/js";
import CardBox from "@/components/dashboard/CardBox.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import PillTag from "@/components/dashboard/PillTag.vue";
import IconRounded from "@/components/dashboard/IconRounded.vue";

const props = defineProps({
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  if (props.type === "PAYPAL") {
    return mdiAt;
  } else if (props.type === "MBWAY") {
    return mdiCellphone;
  }

  return mdiCreditCardOutline;
});

const statusColor = computed(() => {
  if (props.status === "Delivered") {
    return "success";
  } else if (props.status === "Cancelled") {
    return "danger";
  } else if (props.status === "Preparing") {
    return "info";
  } else if (props.status === "Ready") {
    return "warning";
  }

  return "danger";
});
</script>

<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <IconRounded :icon="icon" :color="statusColor" class="md:mr-6" />
        <div class="text-center space-y-1 md:text-left md:mr-6">
          <h4 class="text-xl">{{ amount }} €</h4>

          <p class="text-gray-500 dark:text-slate-400">
            <b>{{ date }}</b> via {{ type }}
          </p>
        </div>
      </BaseLevel>
      <div class="text-center md:text-right space-y-2">
        <p class="text-sm text-gray-500">
          {{ name }}
        </p>
        <div>
          <PillTag :color="statusColor" :label="status" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
