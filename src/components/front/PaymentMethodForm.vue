<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

defineProps({
  errors: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();
const paymentData = ref();
const selectedMethod = ref("visa");

defineExpose({
  paymentData,
  selectedMethod,
});

onMounted(() => {
  if (userStore.user && userStore.user?.default_payment_type) {
    selectedMethod.value = userStore.user.default_payment_type;
    paymentData.value = userStore.user.default_payment_reference;
  }
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
              value="VISA"
              checked
            />
            <img src="src/assets/img/visa.png" alt="visa" class="payment-img" />
          </div>
          <div class="form-check">
            <input
              v-model="selectedMethod"
              class="form-check-input"
              type="radio"
              value="PAYPAL"
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
              value="MBWAY"
            />
            <img
              src="src/assets/img/mbway.png"
              alt="mbway"
              class="payment-img"
            />
          </div>
          <div v-if="selectedMethod == 'VISA'" class="form-group">
            <label for="exampleInputEmail1">Visa Card ID</label>
            <input
              v-model="paymentData"
              type="text"
              class="form-control"
              placeholder="XXXXXXXXXXXXXXXX (16 numbers)"
              required
              minlength="16"
              maxlength="16"
              pattern="^[1-9][0-9]{15}"
            />
          </div>

          <div v-if="selectedMethod == 'PAYPAL'" class="form-group">
            <label for="exampleInputEmail1">Paypal email</label>
            <input
              v-model="paymentData"
              type="email"
              class="form-control"
              placeholder="ex: youremail@mail.pt"
              required
            />
          </div>
          <div v-if="selectedMethod == 'MBWAY'" class="form-group">
            <label for="exampleInputEmail1">Your Mbway Phone Nr</label>
            <input
              v-model="paymentData"
              type="tel"
              class="form-control"
              placeholder="ex: 912345678"
              required
              minlength="9"
              maxlength="9"
              pattern="^[1-9][0-9]{8}"
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
