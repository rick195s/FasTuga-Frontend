<script setup>
import { computed, ref, inject } from "vue";
import {
  mdiTrashCan,
  mdiCancel,
  mdiCircleEditOutline,
  mdiAccount,
  mdiListBox,
  mdiFileDocument,
  mdiImage,
  mdiPencil,
  mdiPiggyBank
} from "@mdi/js";
import CardBox from "@/components/dashboard/CardBox.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import PillTag from "@/components/dashboard/PillTag.vue";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

const emit = defineEmits(["update"]);
const isModelUpdateUser = ref(false);
const productToUpdate = ref([null]);
productToUpdate.value = {
  name: "",
  type: "",
  description: "",
  price: ""
};

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
  }

});

const edit = async (product) => {
  isModelUpdateUser.value = true;
  productToUpdate.value = { ...product};
};

const destroy = () => {
  alert("delete");
};
</script>

<template>
  <!-- #region ------------------------------- UPDATE PRODUCT ------------------------------- -->
  <CardBoxModal v-model="isModelUpdateUser" title="Update Product" button="info" has-cancel
    @confirm="emit('update', productToUpdate)">

    <FormField label="Name">
        <FormControl 
          :icon="mdiAccount"
          name="name"
          autocomplete=""
          placeholder="Name"
          type="text"
          :modelValue="productToUpdate.name"
        />
    </FormField>
    <FormField label="Type">
        <FormControl
          :icon="mdiListBox"
          name="type"
          autocomplete="type"
          placeholder="Type"
          type="select"
          :options="['hot dish','cold dish','drink','dessert']"
          :computedType="productToUpdate.name"
        />
    </FormField>
    <FormField label="Price">
        <FormControl
          :icon="mdiPiggyBank"
          name="price"
          autocomplete="price"
          placeholder="price"
          type="money"
          :modelValue="productToUpdate.price"
        />
    </FormField>
    <FormField label="Description">
        <FormControl
          :icon="mdiPencil"
          name="description"
          autocomplete="description"
          placeholder="Description"
          type="textarea"
          :modelValue="productToUpdate.description"
        />
    </FormField>

    <FormField label="Pefile Photo">
        <FormControl
          :icon="mdiImage"
          name="photo"
          autocomplete="photo"
          placeholder="photo"
          type="file"
        />
    </FormField>
      
  </CardBoxModal>
  <!-- #endregion -->
  <CardBox class="mb-6 last:mb-0 overflow-hidden" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar style="border-radius: 50%; width:90px; height:90px;" class="w-12 mr-6" :avatar="avatar" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">{{ price }}</p>
        </div>
      </BaseLevel>
      <BaseButtons>
          <BaseButton
              color="info"
              :icon="mdiCircleEditOutline"
              small
              @click="edit(product)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="destroy()"
            />
      </BaseButtons>
    </BaseLevel>
  </CardBox>
</template>
