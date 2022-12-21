<script setup>
import { ref } from "vue";

defineProps({
  method: {
    type: String,
    required: true,
  },
  errors: {
    type: Array,
    required: true,
  },
});

const paymentData = ref();

defineExpose({
  paymentData,
});
</script>

<template>
  <div v-if="method == 'visa'" class="form-group">
    <label for="exampleInputEmail1">Visa Card ID</label>
    <input
      v-model="paymentData"
      type="text"
      class="form-control"
      placeholder="XXXX XXXX XXXX XXXX"
      required
    />
  </div>
  <div v-if="method == 'paypal'" class="form-group">
    <label for="exampleInputEmail1">Paypal email</label>
    <input
      v-model="paymentData"
      type="email"
      class="form-control"
      placeholder="ex: youremail@mail.pt"
      required
    />
  </div>
  <div v-if="method == 'mbway'" class="form-group">
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
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
