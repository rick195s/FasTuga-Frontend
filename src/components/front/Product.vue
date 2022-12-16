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
  description: {
    type: String,
    required: true,
  },
  pType: {
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
      <input id="quantity" type="number" value="0" min="0" step="1" max="10" />
    </div>
    <div class="menu-ingredients">
      {{ description }}
    </div>
  </div>
</template>
