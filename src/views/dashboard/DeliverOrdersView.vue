<script setup>
import { mdiChartTimelineVariant, mdiRefresh } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import PaginationButtons from "@/components/dashboard/PaginationButtons.vue";
import CardBoxTransaction from "@/components/dashboard/CardBoxTransaction.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";

import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import CardBoxComponentEmpty from "@/components/dashboard/CardBoxComponentEmpty.vue";

const axios = inject("axios");
const socket = inject("socket");

const orders = ref([]);
const isModalOrder = ref(false);

const toastType = ref("");
const toastMessage = ref("");

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const orderSelected = ref(null);

const waiting = ref(false);

const loadOrders = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(url || "orders/deliver");

    orders.value = response.data;

    numPages.value = orders.value.meta.last_page;
    currentPageHuman.value = orders.value.meta.current_page;
    pagesList.value = orders.value.meta.links;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const showOrderModal = (order) => {
  orderSelected.value = order;
  isModalOrder.value = true;
};

const deliverOrder = async () => {
  isModalOrder.value = false;
  try {
    const response = await axios.put(`orders/${orderSelected.value.id}`, {
      status: "D",
    });

    console.log(orderSelected.value.id);
    socket.emit("order-delivered", orderSelected.value.id);

    orderSelected.value = response.data;
    toastType.value = "success";
    toastMessage.value = "Success changing order status";
    loadOrders();
  } catch (error) {
    toastType.value = "danger";
    toastMessage.value = "Error changing order status";
  }
};

onMounted(() => {
  socket.emit("register", "deliverers");
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
    <CardBoxModal
      v-model="isModalOrder"
      title="Change Order Status"
      button="info"
      :has-done="false"
    >
      <BaseButton color="success" label="Delivered" @click="deliverOrder" />
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        :end-icon="mdiRefresh"
        title="Orders To Deliver"
        main
        @end-icon-click="loadOrders"
      >
      </SectionTitleLineWithButton>

      <span v-if="!waiting && orders.data?.length > 0">
        <CardBoxTransaction
          v-for="order in orders.data"
          :key="order.id"
          :account="order.payment_reference"
          :amount="`Order #${order.ticket_number}`"
          :type="order.payment_type"
          :date="order.customer_name ?? 'Anonymous'"
          :status="order.status"
          @click="showOrderModal(order)"
        />
        <PaginationButtons
          v-if="!waiting"
          :num-pages="numPages"
          :current-page-human="currentPageHuman"
          :pages-list="pagesList"
          @change-page="loadOrders"
        />
      </span>
      <CardBoxComponentEmpty v-else :waiting="waiting" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
