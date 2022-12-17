<script setup>
import { mdiChartTimelineVariant, mdiAlertRemoveOutline } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import {
  mdiPencil,
  mdiPlus,
  mdiListBox,
  mdiImage,
  mdiPiggyBank,
  mdiFood,
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxItem from "@/components/dashboard/CardBoxItem.vue";
import CardBoxItemAdmin from "@/components/dashboard/CardBoxItemAdmin.vue";
import CardBoxClient from "@/components/dashboard/CardBoxClient.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import { useUserStore } from "@/stores/user";


const store = useUserStore();
const emit = defineEmits(["create"]);
const axios = inject("axios");
const socket = inject("socket");

const toastType = ref("");
const toastMessage = ref("");
const waiting = ref(false);
const allInputs = ref(true);

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");

const isModelUpdateUser = ref(false);
const productToUpdate = ref([null]);


const products = ref([]);
//['hot dish','cold dish','drink','dessert']
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
  type: [],
  photo: [],
  description: [],
  price: [],
});

const productToCreate = ref({
  name: [],
  type: [],
  photo: [],
  description: [],
  price: [],
});

const setPhoto = (file) => {
  productToCreate.value.photo = file;
};

const setToast = (message, type) => {
  toastType.value = null
  console.log(message)
  toastType.value = type
  toastMessage.value = message
}

const setError = (error) => {
  //formHeaderTitle.value = "Error: ";
  //waiting.value = false;
  formStatusCurrent.value = "danger";
  if (!error.response.data) {
    formHeaderContent.value = "Register failed";
  } else {
    toastMessage.value = error.response.data.message;
    toastType.value = "danger";
    formHeaderContent.value = error.response.data.message;
    populateErrors(error.response.data.errors);
  }
};

const populateErrors = (errors) => {
  formErrors.value.name = errors.name;
  formErrors.value.type = errors.email;
  formErrors.value.photo = errors.photo;
  formErrors.value.description = errors.description;
  formErrors.value.price = errors.price;
};

const cleanForm = () => {
  productToCreate.value = {
    name: [],
    type: [],
    photo: [],
    description: [],
    price: [],
  };
  productToCreate.value.photo = null;
};

const cleanErrors = () => {
  formErrors.value = {
    name: [],
    type: [],
    photo: [],
    description: [],
    price: [],
  };
};

const createNewProduct = () => {
  isModelUpdateUser.value = true;
}

const create = async () => {
  cleanErrors();
  try {
    allInputs.value = true;
    const formData = new FormData();

    for (var key in productToCreate.value) {
      if (productToCreate.value[key]) {
        formData.append(key, productToCreate.value[key]);
      }
      if(productToCreate.value[key].length == 0){
        formErrors.value[key] = ['required field']
        allInputs.value = false;
      }
    }
    
    if(allInputs.value){
      const response = await axios.post("/products", formData);
      toastMessage.value = "Product created successfully";
      toastType.value = "success";
      cleanForm();
    }else{
      populateErrors(formErrors.value);
      toastMessage.value = "Required fields wasn't fielded";
      toastType.value = "danger";
    }
    loadProducts()
  } catch (error) {
    setError(error);
  }
}

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
    <!-- #region ------------------------------- INSERT PRODUCT --------------------------------->
    <CardBoxModal v-model="isModelUpdateUser" title="Create Product" button="info" has-cancel @confirm="create">
      <br>
      
      <FormField label="Name" :errors="formErrors.name" help="Please enter Name">
        <FormControl v-model="productToCreate.name" :icon="mdiFood" name="name" autocomplete="" placeholder="Name"
          type="text"/>
      </FormField>
      <FormField label="Type" :errors="formErrors.type" help="Please enter Type">
        <FormControl v-model="productToCreate.type" :icon="mdiListBox" name="type" autocomplete="type"
          placeholder="Type" type="select" :options="productTypes" />
      </FormField>
      <FormField label="Price" :errors="formErrors.price" help="Please enter Price">
        <FormControl v-model="productToCreate.price" :icon="mdiPiggyBank" name="price" autocomplete="price"
          placeholder="price" type="money" />
      </FormField>
      <FormField label="Description" :errors="formErrors.description" help="Please enter Description">
        <FormControl v-model="productToCreate.description" :icon="mdiPencil" name="description"
          autocomplete="description" placeholder="Description" type="textarea" />
      </FormField>
      <FormField :errors="formErrors.photo" label="Photo" help="Max 500kb" name="photo">
        <FormFilePicker label="Upload" @update:modelValue="setPhoto" :icon="mdiImage" />
      </FormField>
      <template #footer>
        <BaseButtons>
          <BaseButton type="submit" color="info" label="Register" />
          <BaseButton to="/dashboard" color="info" outline label="Back" />
        </BaseButtons>
      </template>
    </CardBoxModal>
    <!-- #endregion -->
    <NotificationToast v-if="toastType" :type="toastType" :message="toastMessage" @close="toastType = ''">
    </NotificationToast>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" :title="`Products`" main>
        <BaseButton label="Create new Product" :icon="mdiPlus" color="whiteDark" @click="createNewProduct" />
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div v-for="item in products" :key="item.id" class="flex flex-col justify-between">
          <CardBoxItemAdmin :name="item.name" :avatar="item.photo_url" :price="item.price" :product="item" 
            @update="loadProducts()" @delete="loadProducts()" @insert="loadProducts()" @operationMessage="setToast" />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>