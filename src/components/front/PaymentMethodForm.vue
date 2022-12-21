<script setup>
import { ref } from "vue";

defineProps({
  errors: {
    type: Array,
    required: true,
  },
});

const paymentData = ref();
const selectedMethod = ref("visa");

defineExpose({
  paymentData,
  selectedMethod,
});
</script>

<template>
  <div class="col-lg-6">
    <div class="row bgOrder">
      <div class="col-lg-12">
        <div class="section-payment">
          <h2>Payment</h2>
          <p>Choose your Payment method</p>
          <div class="form-check">
            <input
              v-model="selectedMethod"
              class="form-check-input"
              type="radio"
              value="visa"
              checked
            />
            <img src="src/assets/img/visa.png" alt="visa" class="payment-img" />
          </div>
          <div class="form-check">
            <input
              v-model="selectedMethod"
              class="form-check-input"
              type="radio"
              value="paypal"
            />
            <img
              src="src/assets/img/paypal.png"
              alt="paypal"
              class="payment-img"
            />
          </div>
          <div class="form-check">
            <input
              v-model="selectedMethod"
              class="form-check-input"
              type="radio"
              value="mbway"
            />
            <img
              src="src/assets/img/mbway.png"
              alt="mbway"
              class="payment-img"
            />
          </div>
          <div v-if="selectedMethod == 'visa'" class="form-group">
            <label for="exampleInputEmail1">Visa Card ID</label>
            <input
              v-model="paymentData"
              type="text"
              class="form-control"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>
          <div v-if="selectedMethod == 'paypal'" class="form-group">
            <label for="exampleInputEmail1">Paypal email</label>
            <input
              v-model="paymentData"
              type="email"
              class="form-control"
              placeholder="ex: youremail@mail.pt"
              required
            />
          </div>
          <div v-if="selectedMethod == 'mbway'" class="form-group">
            <label for="exampleInputEmail1">Your Mbway Phone Nr</label>
            <input
              v-model="paymentData"
              type="tel"
              class="form-control"
              placeholder="ex: 912345678"
              required
            />
          </div>
          <div v-if="errors" role="alert" class="text-rose-500">
            <p v-for="error in errors" :key="error">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
