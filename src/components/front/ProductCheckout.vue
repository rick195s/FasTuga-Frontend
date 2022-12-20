<script setup>
import { ref, watch } from "vue";

defineProps({
  photo: {
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
  quantity: {
    type: Number,
    required: true,
  },
});

const note = ref(null);

const emit = defineEmits(["product-note"]);

watch(note, (newValue) => {
  emit("product-note", newValue);
});

</script>

<template>
  <div class="col-lg-12 menu-item-checkout">
    <img :src="photo" class="menu-img" alt="" />
    <div class="menu-content">
      <a href="#">{{ name }}</a>
      <span
        >{{ price }}€ <span class="quantity">{{ quantity }}x</span></span
      >
    </div>
    <div class="menu-content">
      <input
        v-model="note"
        type="text"
        class="product-notes"
        placeholder="Any note? Tell us here..."
      />
    </div>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
</style>
