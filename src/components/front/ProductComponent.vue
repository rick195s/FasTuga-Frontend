<script setup>
import { watch, ref, onMounted } from "vue";
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
  previousQuantity: {
    type: Number,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["product-quantity-changed"]);

const productQuantity = ref(0);

watch(productQuantity, (newValue) => {
  emit("product-quantity-changed", newValue);
});

onMounted(() => {
  productQuantity.value = props.previousQuantity ?? 0;
});
</script>

<template>
  <div :class="{ 'col-lg-6 menu-item all': true }">
    <img :src="photoUrl" class="menu-img" alt="" />
    <div class="menu-content">
      <a href="#">{{ name }}</a>
      <span>{{ price }}€</span>
      <input
        id="quantity"
        v-model="productQuantity"
        type="number"
        min="0"
        step="1"
        max="10"
      />
    </div>
    <div class="menu-ingredients">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
</style>
