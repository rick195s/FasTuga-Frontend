<script setup>
import NavbarComponent from "@/components/front/NavbarComponent.vue";
</script>

<template>
  <!-- ======= Top Bar ======= -->
  <NavbarComponent />
  <video
    id="bgVideo"
    preload="true"
    autoplay
    loop
    muted
    poster="/src/assets/img/promoVideo.mp4"
  >
    <source src="/src/assets/img/promoVideo.mp4" type="video/mp4" />
  </video>
  <slot />
  <!-- End Hero -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";

* {
  background-color: black;
}
</style>
