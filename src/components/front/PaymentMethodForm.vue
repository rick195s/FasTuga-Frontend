<script setup>
const props = defineProps({
  method: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

<template>
  <div class="form-group" v-if="method == 'visa'">
    <label for="exampleInputEmail1">Visa Card ID</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="XXXX XXXX XXXX XXXX">
  </div>
  <div class="form-group" v-if="method == 'paypal'">
    <label for="exampleInputEmail1">Paypal email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex: youremail@mail.pt">
  </div>
  <div class="form-group" v-if="method == 'mbway'">
    <label for="exampleInputEmail1">Your Mbway Phone Nr</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex: 912345678">
  </div>
</template>