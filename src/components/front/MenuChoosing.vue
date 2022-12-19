<script setup>
import ProductComponent from "@/components/front/ProductComponent.vue";
import Filter from "@/components/front/FilterProducts.vue";
import { ref, inject, onMounted } from "vue";

const axios = inject("axios");
const products = ref([]);
const waiting = ref(false);

//filtering products
const productsTypes = ref(["all", "hot dish", "cold dish", "drink", "dessert"]);
const selectedType = ref("all");

//Adding products to cart
//const productSelected = ref({});
const listOfProductsSelected = ref([]);

const productQuantityChanged = (productId, quantity) => {
  const index = listOfProductsSelected.value.findIndex(
    (p) => p.product_id === productId
  );

  if (quantity > 0) {
    index == -1
      ? listOfProductsSelected.value.push({
          quantity: quantity,
          product_id: productId,
        })
      : (listOfProductsSelected.value[index].quantity = quantity);
  } else {
    listOfProductsSelected.value.splice(index, 1);
  }
};

//loading products
const loadProducts = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(url || "products");

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
};

const emit = defineEmits(["to-checkout", "add-products-to-checkout"]);

const toCheckout = (event) => {
  emit("to-checkout", event);
  emit("add-products-to-checkout", listOfProductsSelected.value);
};
</script>

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
            <h2 @click="alerta">Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
        </div>
        <div class="col-lg-6 text-right">
          <a href="#" class="btn-menu" @click="toCheckout()">
            Next ({{ listOfProductsSelected.length }})
          </a>
        </div>
        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="menu-flters">
              <Filter
                v-for="productType in productsTypes"
                :key="productType"
                :p-type="productType"
                :is-active="productType == selectedType"
                @click="changeType(productType)"
              />
            </ul>
          </div>
        </div>
        <div class="row menu-container" data-aos="fade-up" data-aos-delay="200">
          <ProductComponent
            v-for="product in products.data"
            :key="product.id"
            :product-id="product.id"
            :photo-url="product.photo_url"
            :name="product.name"
            :price="product.price"
            :description="product.description"
            @product-quantity-changed="productQuantityChanged"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
