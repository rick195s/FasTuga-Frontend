<script setup>
import { mdiCog } from "@mdi/js";
import CardBox from "@/components/dashboard/CardBox.vue";
import NumberDynamic from "@/components/dashboard/NumberDynamic.vue";
import BaseIcon from "@/components/dashboard/BaseIcon.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import PillTagTrend from "@/components/dashboard/PillTagTrend.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";

defineProps({
  number: {
    type: Number,
    default: 0,
  },
  string: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  trend: {
    type: String,
    default: null,
  },
  trendType: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <CardBox>
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <PillTagTrend :trend="trend" :trend-type="trendType" small />
      <BaseButton
        :icon="mdiCog"
        icon-w="w-4"
        icon-h="h-4"
        color="lightDark"
        small
      />
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <NumberDynamic
            v-if="number"
            :value="number"
            :prefix="prefix"
            :suffix="suffix"
          />
          <p v-if="string">{{ prefix }} {{ string }} {{ suffix }}</p>
        </h1>
      </div>
      <BaseIcon
        v-if="icon"
        :path="icon"
        size="48"
        w=""
        h="h-16"
        :class="color"
      />
    </BaseLevel>
  </CardBox>
</template>
