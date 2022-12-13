<script setup>
import { mdiChartTimelineVariant } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import PaginationButtons from "@/components/dashboard/PaginationButtons.vue";
import WaitingSpinner from "@/components/dashboard/WaitingSpinner.vue";
import CardBoxItem from "@/components/dashboard/CardBoxItem.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";

const axios = inject("axios");
const socket = inject("socket");

const orderItems = ref([]);
const isModelItem = ref(false);

const toastType = ref("");
const toastMessage = ref("");

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const orderItemSelected = ref(null);

const waiting = ref(false);

const loadItems = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(url || "orderItems");

    orderItems.value = response.data;

    numPages.value = orderItems.value.meta.last_page;
    currentPageHuman.value = orderItems.value.meta.current_page;
    pagesList.value = orderItems.value.meta.links;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const showItemModal = (item) => {
  orderItemSelected.value = item;
  isModelItem.value = true;
};

const changeItemStatus = async (newStatus) => {
  isModelItem.value = false;
  try {
    const response = await axios.put(
      `orderItems/${orderItemSelected.value.id}`,
      {
        status: newStatus,
      }
    );

    orderItemSelected.value = response.data;
    checkStatusChanged(newStatus);
    loadItems();
  } catch (error) {
    toastType.value = "danger";
    toastMessage.value = "Error changing item status";
  }
};

const checkStatusChanged = (newStatus) => {
  if (
    (newStatus == "W" && orderItemSelected.value.data.status == "Waiting") ||
    (newStatus == "P" && orderItemSelected.value.data.status == "Preparing") ||
    (newStatus == "R" && orderItemSelected.value.data.status == "Ready")
  ) {
    toastType.value = "success";
    toastMessage.value = "Order item status changed";

    if (orderItemSelected.value.data.order_status == "R") {
      socket.emit("order-ready", orderItemSelected.value.data.order_id);
    }
  } else {
    toastType.value = "danger";
    toastMessage.value = "Error changing item status";
  }
};

onMounted(() => {
  loadItems();
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
      v-model="isModelItem"
      title="Change Item Status"
      button="info"
      :has-done="false"
    >
      <BaseButtons>
        <BaseButton
          color="warning"
          label="Waiting"
          @click="changeItemStatus('W')"
        />
        <BaseButton
          color="info"
          label="Pending"
          @click="changeItemStatus('P')"
        />
        <BaseButton
          color="success"
          label="Ready"
          @click="changeItemStatus('R')"
        />
      </BaseButtons>
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Items To Prepare"
        main
      >
      </SectionTitleLineWithButton>

      <WaitingSpinner v-if="waiting" />

      <CardBoxItem
        v-for="item in orderItems.data"
        v-else
        :key="item.id"
        :name="`Order #${item.order_ticket_number} - ${item.product.name} `"
        :avatar="item.product.photo_url"
        :price="`Notes: ${item.notes ?? ''}`"
        :status="item.status"
        @click="showItemModal(item)"
      />

      <PaginationButtons
        v-if="!waiting"
        :num-pages="numPages"
        :current-page-human="currentPageHuman"
        :pages-list="pagesList"
        @change-page="loadItems"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
