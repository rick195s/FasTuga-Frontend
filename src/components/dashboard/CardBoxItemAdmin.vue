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
  mdiPiggyBank,
  mdiFood,
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
import NotificationToast from "@/components/dashboard/NotificationToast.vue";

const emit = defineEmits(["update","delete","insert","operationMessage"]);
const axios = inject("axios");
const isModelUpdateUser = ref(false);
const productTypes = [
  {
    value: "hot dish",
    label: "Hot Dish",
  },
  {
    value: "cold dish",
    label: "Cold Dish",
  },
  {
    value: "drink",
    label: "Drink",
  },
  {
    value: "dessert",
    label: "Dessert",
  },
];

const formErrors = ref({
  name: [],
  photo: [],
  old_password: [],
  password: [],
});

const productToUpdate = ref({
  name: "",
  type: "",
  photo: null,
  description: "",
  price: "",
  _method:"PUT"
});


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

const setPhoto = (file) => {
  productToUpdate.value.photo = file;
};

const edit = async (product) => {
  isModelUpdateUser.value = true;
  productToUpdate.value = { ...product};
};

const update = async (product) => {
  try {
    if (product.photo) {
      const formData = new FormData();
      formData.append("photo", product.photo);

      await axios.post(`products/${product.id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    const res = await axios.put(`products/${product.id}`, product);
    console.log(res)
    emit('update')
    emit('operationMessage', "Product updated successfully", "success")
  } catch (error) {
    //console.log(error)
    emit('operationMessage', error.response.data.message, "danger")
  }
};

const destroy = async (product) => {
  try {
    const res = await axios.delete(`products/${product.id}`);
    console.log(res)
    emit('operationMessage', "Product deleted successfully", "success")
    emit('delete')
  } catch (error) {
    console.log(error)
    emit('operationMessage', "Product was not deleted", "danger")
  }
};
</script>

<template>
  <!-- #region ------------------------------- UPDATE PRODUCT ------------------------------- -->
  <CardBoxModal 
      v-model="isModelUpdateUser"
      title="Update Product"
      button="info"
      has-cancel
      @confirm="update(productToUpdate)">

    <FormField label="Name">
        <FormControl 
          :icon="mdiFood"
          name="name"
          autocomplete=""
          placeholder="Name"
          type="text"
          :modelValue="productToUpdate.name"
          v-model="productToUpdate.name"
        />
    </FormField>
    <FormField label="Type">
        <FormControl
          :icon="mdiListBox"
          name="type"
          autocomplete="type"
          placeholder="Type"
          type="select"
          :options="productTypes"
          :computedType="productToUpdate.type"
          v-model="productToUpdate.type"
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
          v-model="productToUpdate.price"
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
          v-model="productToUpdate.description"
        />
    </FormField>
    <FormField :errors="formErrors.photo" label="Photo" help="Max 500kb" name="photo">
      <FormFilePicker label="Upload" @update:modelValue="setPhoto" />
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
              @click="destroy(product)"
            />
      </BaseButtons>
    </BaseLevel>
  </CardBox>
</template>
