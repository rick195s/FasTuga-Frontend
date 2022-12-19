<script setup>
import ProductCheckout from "@/components/front/ProductCheckout.vue";
import PaymentMethod from "@/components/front/PaymentMethodForm.vue";
import { ref, inject, onMounted } from "vue";

const props = defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});

const checkedMethod = ref("visa");
const totalToPay = ref(0);

const emit = defineEmits(["to-menu-choosing"]);

const toMenuChoosing = (event) => {
  emit("to-menu-choosing", event);
};

const sum = () => {
  props.productsList.forEach((product) => {
    totalToPay.value += Number(product.price * product.quantity);
  });
};

onMounted(() => {
  sum();
});
</script>

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
        <div class="row menu-container" data-aos="fade-up" data-aos-delay="200">
          <div class="col-lg-6">
            <div class="row bgOrder">
              <div class="col-lg-12">
                <div class="section-payment">
                  <h2>Payment</h2>
                  <p>Choose your Payment method</p>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="visa"
                      checked
                    />
                    <img
                      src="src/assets/img/visa.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="paypal"
                    />
                    <img
                      src="src/assets/img/paypal.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="mbway"
                    />
                    <img
                      src="src/assets/img/mbway.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <PaymentMethod :method="checkedMethod" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row checkout-items">
              <ProductCheckout
                v-for="product in props.productsList"
                :key="product.id"
                :photo="product.photo_url"
                :name="product.name"
                :price="product.price"
                :quantity="product.quantity"
              />
              <hr />
              <div class="col-lg-6 checkout-points">
                <span>Use Points (10 points = 5€):</span>
              </div>
              <div class="col-lg-6 checkout-points text-right">
                <select class="form-select" aria-label="Default select example">
                  <option value="0">0</option>
                  <option value="5">10</option>
                </select>
                <span class="checkout-points-quantity"> (out of 13)</span>
              </div>
              <hr class="mt-0" />
              <div class="col-lg-6 checkout-total"><span>Total</span></div>
              <div class="col-lg-6 checkout-total text-right">
                <span>{{ totalToPay.toFixed(2) }}€</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <a href="#" class="btn-menu" @click="toMenuChoosing"> Previous </a>
            <a href="#menu" class="btn-menu float-right"> Buy & Finish </a>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- End Hero -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
