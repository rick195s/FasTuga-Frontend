<script setup>
import { mdiChartTimelineVariant } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxTransaction from "@/components/dashboard/CardBoxTransaction.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import PaginationButtons from "@/components/dashboard/PaginationButtons.vue";

const axios = inject("axios");

const toastType = ref("");
const toastMessage = ref("");

const orders = ref([]);

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const loadOrders = async (url) => {
  try {
    const response = await axios.get(url || "orders");

    orders.value = response.data;

    numPages.value = orders.value.meta.last_page;
    currentPageHuman.value = orders.value.meta.current_page;
    pagesList.value = orders.value.meta.links;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  loadOrders();
});
</script>

<template>
  <LayoutAuthenticated>
    <NotificationToast
      v-if="toastType"
      :type="toastType"
      :message="toastMessage"
      @close="toastType = ''"
    ></NotificationToast>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Orders"
        main
      >
      </SectionTitleLineWithButton>

      <CardBoxTransaction
        v-for="order in orders.data"
        :key="order.id"
        :amount="order.total_price"
        :date="order.created_at"
        :type="order.payment_type"
        :status="order.status"
        :name="order.customer_name ?? 'Anonymous'"
        :account="order.payment_reference"
      />
      <PaginationButtons
        :num-pages="numPages"
        :current-page-human="currentPageHuman"
        :pages-list="pagesList"
        @change-page="loadOrders"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
