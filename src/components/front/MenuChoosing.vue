<script setup>
import ProductComponent from "@/components/front/ProductComponent.vue";
import Filter from "@/components/front/FilterProducts.vue";
import { ref, inject, onMounted } from "vue";
import PaginationButtons from "../dashboard/PaginationButtons.vue";

const props = defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});

const axios = inject("axios");
const products = ref([]);
const waiting = ref(false);

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

//filtering products
const productsTypes = ref(["hot dish", "cold dish", "drink", "dessert"]);
const selectedType = ref("hot dish");

//Adding products to cart
const listOfProductsSelected = ref(props.productsList);
const totalQuantity = ref(0);

const productQuantityChanged = (product, quantity) => {
  const index = listOfProductsSelected.value.findIndex(
    (p) => p.product_id === product.id
  );

  if (quantity > 0) {
    index == -1
      ? listOfProductsSelected.value.push({
          quantity: quantity,
          product_id: product.id,
          ...product,
        })
      : (listOfProductsSelected.value[index].quantity = quantity);
  } else {
    listOfProductsSelected.value.splice(index, 1);
  }
  totalQuantity.value = listOfProductsSelected.value.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
};

// used when a user goes to checkout page and then gets back to menu choosing
const restoreOldQuantities = () => {
  products.value.data.forEach((product) => {
    props.productsList.forEach((element) => {
      if (product.id == element.product_id) {
        product.quantity = element.quantity;
      }
    });
  });
};

//loading products
const loadProducts = async (url) => {
  waiting.value = true;

  try {
    const response = await axios.get(
      url || "products?type=" + selectedType.value
    );

    products.value = response.data;
    console.log(response.data);
    restoreOldQuantities();
    loadMeta(response.data.meta);
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const loadMeta = (meta) => {
  numPages.value = meta.last_page;
  currentPageHuman.value = meta.current_page;
  pagesList.value = meta.links;
};

/*const clearLists = () => {
  listOfProductsSelected.value = [];
  proudctsListCheckout.value = [];
  totalQuantity.value = 0;
};
*/

onMounted(() => {
  loadProducts();
});

const changeType = (value) => {
  selectedType.value = value;
  loadProducts();
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
          <a
            v-if="totalQuantity != 0"
            href="#"
            class="btn-menu"
            @click="toCheckout()"
          >
            Next ({{ totalQuantity }})
          </a>
          <a v-else href="#" class="btn-menu">
            Choose something from the menu
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
            :previous-quantity="product.quantity"
            @product-quantity-changed="
              (quantity) => productQuantityChanged(product, quantity)
            "
          />
        </div>
        <br /><br /><br />
        <PaginationButtons
          :num-pages="numPages"
          :current-page-human="currentPageHuman"
          :pages-list="pagesList"
          @change-page="loadProducts"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
