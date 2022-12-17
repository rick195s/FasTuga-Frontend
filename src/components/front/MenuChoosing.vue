<script setup>
import Product from "@/components/front/Product.vue";
import Filter from "@/components/front/FilterProducts.vue";
import { ref, inject, onMounted } from "vue";

const axios = inject("axios");
const products = ref([]);
const waiting = ref(false);

//filtering products
const productsTypes = ref(['all', 'hot dish', 'cold dish', 'drink', 'dessert']);
const selectedType = ref("all");

//Adding products to cart
const productsSelected = ref([]);
const addToCart = (product) => {
  productsSelected.value.push(product);
};

//loading products
const loadProducts = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(
      url || "products?filter=" + selectedType.value
    );

    products.value = response.data;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

onMounted(() => {
  loadProducts();
});

const changeType = (value) => {
  selectedType.value = value;
  loadProducts();
};

const emit = defineEmits(["to-checkout"]);

const toCheckout = (event) => {
  emit("to-checkout", event);
};
</script>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

<template>
<div
      class="container position-relative text-center text-lg-start"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <form action="/action_page.php">
        <div class="row bgOrder">
          <div class="col-lg-6">
            <div class="section-title">
              <h2>Menu</h2>
              <p>Check Our Tasty Menu</p>
            </div>
          </div>
          <div class="col-lg-6 text-right">
            <a href="#" @click="toCheckout" class="btn-menu">
              Next ({{productsSelected.length}})
            </a>
          </div>
          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12 d-flex justify-content-center">
              <ul id="menu-flters">
                <Filter
                  v-for="productType in productsTypes"
                  :p-type="productType"
                  :is-active="productType == selectedType"
                  @click="changeType(productType)"
                />
              </ul>
            </div>
          </div>
          <div
            class="row menu-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Product
              v-for="product in products.data"
              :key="product.id"
              :photo-url="product.photo_url"
              :name="product.name"
              :price="product.price"
              :description="product.description"
              :p-type="product.type"
            />
          </div>
        </div>
      </form>
    </div>
</template>