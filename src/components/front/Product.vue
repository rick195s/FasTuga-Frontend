<script setup>
import { ref } from "vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pType: {
    type: Boolean,
    required: true,
  },
});

const productQuantity = ref(0);
let staticQuantitity = 0;

const emit = defineEmits(["add-product", "remove-product"]);

const addProduct = (productId, productPhoto, productName, productPrice) => {
  if(productQuantity.value < staticQuantitity){
    emit("remove-product", {
      id: productId,
      photo: productPhoto,
      name: productName,
      price: productPrice,
      quantity: staticQuantitity - productQuantity.value,
    });
    staticQuantitity = productQuantity.value;
    return;
  }
  if (productQuantity.value > staticQuantitity) {
    emit("add-product", {
      id: productId,
      photo: productPhoto,
      name: productName,
      price: productPrice,
      quantity: productQuantity.value,
    });
    staticQuantitity = productQuantity.value;
  }
};

</script>

<style scoped>
@import "@/../src/assets/css/style.css";
</style>

<template>
  <div :class="{'col-lg-6 menu-item all' : true, 'filter-remove' : pType}">
    <img :src="photoUrl" class="menu-img" alt="" />
    <div class="menu-content">
      <a href="#">{{ name }}</a>
      <span>{{ price }}€</span>
      <input id="quantity" type="number" v-model="productQuantity" min="0" step="1" max="10" @change="addProduct(productId, photoUrl, name, price)"/>
    </div>
    <div class="menu-ingredients">
      {{ description }}
    </div>
  </div>
</template>