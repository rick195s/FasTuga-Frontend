<script setup>
import { mdiChartTimelineVariant } from "@mdi/js";
import { useRouter } from "vue-router";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxTransaction from "@/components/dashboard/CardBoxTransaction.vue";
import PaginationButtons from "@/components/dashboard/PaginationButtons.vue";
import WaitingSpinner from "@/components/dashboard/WaitingSpinner.vue";

const axios = inject("axios");
const router = useRouter();

const orders = ref([]);

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const waiting = ref(false);

const loadOrders = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(url || "orders");

    orders.value = response.data;

    numPages.value = orders.value.meta.last_page;
    currentPageHuman.value = orders.value.meta.current_page;
    pagesList.value = orders.value.meta.links;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const goToOrder = (order) => {
  router.push({ name: "order", params: { id: order.id } });
};

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Orders"
        main
      >
      </SectionTitleLineWithButton>

      <WaitingSpinner v-if="waiting" />

      <CardBoxTransaction
        v-for="order in orders.data"
        v-else
        :key="order.id"
        :amount="order.total_price"
        :date="order.created_at"
        :type="order.payment_type"
        :status="order.status"
        :name="order.customer_name ?? 'Anonymous'"
        :account="order.payment_reference"
        @click="goToOrder(order)"
      />

      <PaginationButtons
        v-if="!waiting"
        :num-pages="numPages"
        :current-page-human="currentPageHuman"
        :pages-list="pagesList"
        @change-page="loadOrders"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
