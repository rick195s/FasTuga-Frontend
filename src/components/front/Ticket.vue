<script setup>
import {
  mdiTicket
} from "@mdi/js";
import BaseIcon from "@/components/dashboard/BaseIcon.vue";

const props = defineProps({
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
    required: true,
  }
});
</script>


<template>
  <div class="col-lg-6 menu-item filter-starters">
    <div class="menu-content" style="border:1px solid #cda45e; border-radius:25px;">
      <BaseIcon  :path="mdiTicket" h="155px"/>
      <span>{{ticketNumber}}</span>
      <a href="#">{{ status }}</a>
      <span>{{ date }}</span>
      <!--<input id="quantity" type="number" value="0" min="0" step="1" max="10" />-->
    </div>
  </div>
</template>
<style scoped>
@import "/src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
