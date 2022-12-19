<script setup>
import BaseButton from "@/components/dashboard/BaseButton.vue";
import MenuChoosing from "@/components/front/MenuChoosing.vue";
import Checkout from "@/components/front/Checkout.vue";
import { mdiChevronRight } from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import LayoutFrontGuest from "@/layouts/LayoutFrontGuest.vue";


const menuChoosing = ref(true);
const checkout = ref(false);
const status = ref(false);

const changeState = () => {
  menuChoosing.value = false;
  checkout.value = false;
  status.value = false;
};

const productsListCheckout = ref([]);

const productsToCheckout = (productsList) => {
  productsListCheckout.value = productsList;
};

const alerta = () => {
  alert(productsListCheckout.value);
};
</script>

<template>
  <LayoutFrontGuest>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-cente">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-lg-between"
    >
      <h1 class="logo me-auto me-lg-0"><a href="#">FASTUGA</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li
            :class="{ activeState: menuChoosing, 'd-none d-lg-flex': true }"
          >
            Menu Choosing
          </li>
          <li m-0><BaseButton :icon="mdiChevronRight" color="white" /></li>
          <li
            :class="{ activeState: checkout, 'd-none d-lg-flex': true }"
          >
            Checkout
          </li>
          <li m-0>
            <BaseButton :icon="mdiChevronRight" color="white" />
          </li>
          <li
            :class="{ activeState: status, 'd-none d-lg-flex': true }"
          >
            Status
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
      <a></a>
    </div>
  </header>
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">
    <video
      id="bgVideo"
      preload="true"
      autoplay
      loop
      muted
      poster="src/assets/img/promoVideo.mp4"
    >
      <source src="src/assets/img/promoVideo.mp4" type="video/mp4" />
    </video>
    <MenuChoosing
      v-if="menuChoosing"
      :products-list="productsListCheckout"
      @to-checkout="
        changeState();
        checkout = true;
      "
      @add-products-to-checkout="productsToCheckout"
    />
    <Checkout
      v-if="checkout"
      :products-list="productsListCheckout"
      @to-menu-choosing="
        changeState();
        menuChoosing = true;
      "
      @add-products-to-menu-choosing="productsToCheckout"
    />
    />
  </section>
  <!-- End Hero -->
</LayoutFrontGuest>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
