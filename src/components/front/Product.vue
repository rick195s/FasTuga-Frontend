<script setup>
defineProps({
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
});
</script>

<template>
  <div class="col-lg-6 menu-item filter-starters">
    <img :src="photoUrl" class="menu-img" alt="" />
    <div class="menu-content">
      <a href="#">{{ name }}</a>
      <span>{{ price }}€</span>
      <input id="quantity" type="number" min="0" value="0" step="1" max="10" />
    </div>
    <div class="menu-ingredients">
      {{ description }}
    </div>
  </div>
  <!-- <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="500"></div>
  <p v-if="loading">Loading...</p> -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
