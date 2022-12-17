<script setup>
import CardBoxWidget from "@/components/dashboard/CardBoxWidget.vue";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
} from "@mdi/js";
import { ref, inject, onMounted } from "vue";

const axios = inject("axios");

const statistics = ref({
  customers_count: 0,
  sales: "",
  orders_count: 0,
});

const loadStatistics = async () => {
  const response = await axios.get("/statistics");
  console.log(response.data);
  statistics.value = { ...response.data };
};
onMounted(() => {
  loadStatistics();
});
</script>
<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
    <CardBoxWidget
      trend="12%"
      trend-type="up"
      color="text-emerald-500"
      :icon="mdiAccountMultiple"
      :number="statistics.customers_count"
      label="Customer"
    />
    <CardBoxWidget
      trend="12%"
      trend-type="down"
      color="text-blue-500"
      :icon="mdiChartTimelineVariant"
      :string="statistics.sales"
      suffix="€"
      label="Sales"
    />
    <CardBoxWidget
      trend="Overflow"
      trend-type="alert"
      color="text-red-500"
      :icon="mdiCartOutline"
      :number="statistics.orders_count"
      label="Orders"
    />
  </div>
</template>
