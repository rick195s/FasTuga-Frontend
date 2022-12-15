<style scoped>
@import '@/../src/assets/css/style.css';
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>

<script setup>
  import { ref, inject, onMounted } from "vue";


const axios = inject("axios");
const productsTypes = ref([]);
const waiting = ref(false);

const loadProductsTypes = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(url || "products/type");

    productsTypes.value = response.data;

  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

onMounted(() => {
    loadProductsTypes();
});
</script>

<template>
    <div class="row" data-aos="fade-up" data-aos-delay="100">
        <div class="col-lg-12 d-flex justify-content-center">
        <ul id="menu-flters">
            <li data-filter="*" class="filter-active">All</li>
            <li v-for="types in productsTypes" :data-filter="'.' + types.type">{{ types.type }}</li>
        </ul>
        </div>
    </div>
</template>