<script setup>
const props = defineProps({
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
});
</script>

<style scoped>
@import "@/../src/assets/css/style.css";
</style>

<template>
    <div class="col-lg-12 menu-item-checkout">
    <img :src="photoUrl" class="menu-img" alt="" />
    <div class="menu-content">
      <a href="#">{{ name }}</a>
      <span>{{ price }}€ <span class="quantity">x1</span></span>
    </div>
    <div class="menu-content">
      <input type="text" class="product-notes" placeholder="Any note? Tell us here...">
    </div>
</div>
</template>