<script setup>
import { mdiTicket } from "@mdi/js";
import BaseIcon from "@/components/dashboard/BaseIcon.vue";

defineProps({
  ticketNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="col-lg-3 menu-item filter-starters">
    <div class="menu-content ticket">
      <BaseIcon :path="mdiTicket" />
      <span>{{ ticketNumber }}</span>
      <span :class="[{ 'text-light': status != 'Preparing' }]">{{
        status
      }}</span>

      <span>{{ date }}</span>
      <!--<input id="quantity" type="number" value="0" min="0" step="1" max="10" />-->
    </div>
  </div>
</template>
<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
