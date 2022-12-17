<script setup>
import ProductCheckout from "@/components/front/ProductCheckout.vue";
import PaymentMethod from "@/components/front/PaymentMethodForm.vue";
import { ref, inject, onMounted } from "vue";

const axios = inject("axios");
const products = ref([]);
const waiting = ref(false);
const checkedMethod = ref("visa");


//loading products
const loadProducts = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(
      url || "products?filter=dessert"
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

const emit = defineEmits(["to-menu-choosing"]);

const toMenuChoosing = (event) => {
  emit("to-menu-choosing", event);
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
          <div class="col-lg-12">
            <div class="section-title">
              <h2>Checkout</h2>
              <p>Just one last step</p>
            </div>
          </div>
          <div
            class="row menu-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="col-lg-6">
                <div class="row bgOrder">
                    <div class="col-lg-12">
                        <div class="section-payment">
                            <h2 @click="alerta(checkedMethod)">Payment</h2>
                            <p>Choose your Payment method</p>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="visa" checked v-model="checkedMethod">
                                <img src="src/assets/img/visa.png" alt="visa" class="payment-img">
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="paypal" v-model="checkedMethod">
                                <img src="src/assets/img/paypal.png" alt="visa" class="payment-img">
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="mbway" v-model="checkedMethod">
                                <img src="src/assets/img/mbway.png" alt="visa" class="payment-img">
                            </div>
                            <PaymentMethod :method="checkedMethod"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row checkout-items">
                    <ProductCheckout
                    v-for="product in products.data"
                    :key="product.id"
                    :photo-url="product.photo_url"
                    :name="product.name"
                    :price="product.price"
                    />
                    <hr />
                    <div class="col-lg-6 checkout-points"><span >Use Points (10 points = 5€):</span></div>
                    <div class="col-lg-6 checkout-points text-right">
                        <select class="form-select" aria-label="Default select example">
                            <option value="0">0</option>
                            <option value="5">10</option>
                        </select>
                        <span class="checkout-points-quantity"> (out of 13)</span>
                    </div>
                    <hr class="mt-0" />
                    <div class="col-lg-6 checkout-total"><span >Total</span></div>
                    <div class="col-lg-6 checkout-total text-right"><span>23€</span></div>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
            <a href="#" @click="toMenuChoosing" class="btn-menu">
              Previous
            </a>
            <a href="#menu" class="btn-menu float-right">
              Buy & Finish
            </a>
          </div>
          </div>
        </div>
      </form>
    </div>
  <!-- End Hero -->
</template>
