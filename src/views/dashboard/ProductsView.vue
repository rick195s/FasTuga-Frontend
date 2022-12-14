<script setup>
import { mdiChartTimelineVariant, mdiAlertRemoveOutline } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import {
  mdiTrashCan,
  mdiCancel,
  mdiCircleEditOutline,
  mdiAccount,
  mdiPencil,
  mdiPlus
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxItem from "@/components/dashboard/CardBoxItem.vue";
import CardBoxItemAdmin from "@/components/dashboard/CardBoxItemAdmin.vue";
import CardBoxClient from "@/components/dashboard/CardBoxClient.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

const axios = inject("axios");
const socket = inject("socket");



const toastType = ref("");
const toastMessage = ref("");


const products = ref([]);

/*const cancelOrder = async () => {
  modalCancelOrder.value = false;
  try {
    const response = await axios.patch(`orders/${props.id}`, { status: "C" });
    order.value = response.data;

    if (order.value.data.status == "Cancelled") {
      toastType.value = "success";
      toastMessage.value = "Order canceled successfully";

      if (order.value.data.order_delivery) {
        socket.emit("order-cancelled", order.value.data.order_delivery);
      }
      return;
    }
  } catch {}
  toastType.value = "danger";
  toastMessage.value = "Error canceling order";
};*/

const loadProducts = async (url) => {
  try {
    const response = await axios.get(url || `products/`);

    products.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadProducts();
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
      <BaseButton 
        label="Create new Product"
        :icon="mdiPlus"
      />
      <br><br>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div
          v-for="item in products"
          :key="item.id"
          class="flex flex-col justify-between"
        >
          <CardBoxItemAdmin
            :name="item.name"
            :avatar="item.photo_url"
            :price="item.price"
            :product="item"
          />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>