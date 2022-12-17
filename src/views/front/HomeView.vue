<script setup>
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import MenuChoosing from "@/components/front/MenuChoosing.vue";
import Checkout from "@/components/front/Checkout.vue";
import { mdiChevronRight } from "@mdi/js";
import { ref } from "vue";

const menuChoosing = ref(true);
const checkout = ref(false);
const status = ref(false);

const changeState = () => {
  menuChoosing.value = false;
  checkout.value = false;
  status.value = false;
};
</script>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

<template>
  <!-- ======= Top Bar ======= -->
  <div id="topbar" class="d-flex align-items-center fixed-top">
    <div
      class="container d-flex justify-content-center justify-content-md-between"
    >
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-phone d-flex align-items-center">
          <span>+351 912 345 678</span>
        </i>
        <i class="bi bi-clock d-flex align-items-center ms-4">
          <span>Mon-Sat: 11:00h - 23:00h</span>
        </i>
      </div>

      <div class="languages d-none d-md-flex align-items-center">
        <ul>
          <BaseButtons>
            <BaseButton to="/login" outline label="Login" />
            <BaseButton to="/register" outline label="Register" />
          </BaseButtons>
          <!-- <li><a to="/login">Login</a></li>
          <li><a href="">Register</a></li> -->
        </ul>
      </div>
    </div>
  </div>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-cente">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-lg-between"
    >
      <h1 class="logo me-auto me-lg-0"><a href="index.html">FASTUGA</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li :class="{activeState : menuChoosing , 'd-none d-lg-flex' : true}" @click="changeState(); menuChoosing=true">Menu Choosing</li>
          <li m-0><BaseButton :icon="mdiChevronRight" color="white" /></li>
          <li :class="{activeState : checkout , 'd-none d-lg-flex': true}" @click="changeState(); checkout=true">Checkout</li>
          <li m-0>
            <BaseButton :icon="mdiChevronRight" color="white" />
          </li>
          <li :class="{activeState : status , 'd-none d-lg-flex': true}" @click="changeState(); status=true">Status</li>
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
    <MenuChoosing v-if="menuChoosing" @to-checkout="changeState(); checkout=true"/>
    <Checkout v-if="checkout" @to-menu-choosing="changeState(); menuChoosing=true" />
    />
  </section>
  <!-- End Hero -->
</template>
