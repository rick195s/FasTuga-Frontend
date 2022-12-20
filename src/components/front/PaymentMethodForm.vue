<script setup>
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    required: true,
  },
});


const paymentData = ref();

defineExpose({
  paymentData,
});



</script>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

<template>
  <div class="form-group" v-if="method == 'visa'">
    <label for="exampleInputEmail1">Visa Card ID</label>
    <input v-model="paymentData" type="text" class="form-control" placeholder="XXXX XXXX XXXX XXXX">
  </div>
  <div class="form-group" v-if="method == 'paypal'">
    <label for="exampleInputEmail1">Paypal email</label>
    <input v-model="paymentData" type="email" class="form-control" placeholder="ex: youremail@mail.pt">
  </div>
  <div class="form-group" v-if="method == 'mbway'">
    <label for="exampleInputEmail1">Your Mbway Phone Nr</label>
    <input v-model="paymentData" type="tel" class="form-control" placeholder="ex: 912345678">
  </div>
</template>