<script setup>
import { mdiChartTimelineVariant, mdiAlertRemoveOutline } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxItem from "@/components/dashboard/CardBoxItem.vue";
import CardBoxClient from "@/components/dashboard/CardBoxClient.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

const axios = inject("axios");
const socket = inject("socket");

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const toastType = ref("");
const toastMessage = ref("");

const modalCancelOrder = ref(false);
const order = ref([]);
const orderItems = ref([]);
const customer = ref([]);

const cancelOrder = async () => {
  modalCancelOrder.value = false;
  try {
    const response = await axios.patch(`orders/${props.id}`, { status: "C" });
    order.value = response.data;

    if (order.value.data.status != "Cancelled") {
      throw response;
    }

    toastType.value = "success";
    toastMessage.value = "Order canceled successfully";
    if (order.value.data.id) {
      socket.emit("order-cancelled", order.value.data.id);
    }
  } catch {
    toastType.value = "danger";
    toastMessage.value = "Error canceling order";
  }
};

const loadOrder = async (url) => {
  try {
    const response = await axios.get(url || `orders/${props.id}`);

    order.value = response.data;
    orderItems.value = order.value.data.order_items;
    customer.value = order.value.data.customer;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadOrder();
});
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="modalCancelOrder"
      title="Cancel Order"
      button="danger"
      button-label="Cancel Order"
      @confirm="cancelOrder"
    >
      <p>This is action cannot be undone</p>
    </CardBoxModal>
    <NotificationToast
      v-if="toastType"
      :type="toastType"
      :message="toastMessage"
      @close="toastType = ''"
    ></NotificationToast>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        :title="`Order #${order.data?.ticket_number}`"
        main
      >
        <BaseButton
          v-if="order.data?.status != 'Cancelled'"
          label="Cancel Order"
          :icon="mdiAlertRemoveOutline"
          color="whiteDark"
          @click="modalCancelOrder = true"
        />
      </SectionTitleLineWithButton>

      <CardBoxClient
        :price="`${order.data?.total_price} €`"
        :status="order.data?.status"
        :avatar="order.data?.customer?.photo_url"
        :name="order.data?.customer?.name ?? 'Anonymous'"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div
          v-for="item in orderItems"
          :key="item.id"
          class="flex flex-col justify-between"
        >
          <CardBoxItem
            :name="item.product.name"
            :avatar="item.product.photo_url"
            :price="`${item.price_on_purchase} €`"
            :status="item.status"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
