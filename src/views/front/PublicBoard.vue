<script setup>
import BaseButton from "@/components/dashboard/BaseButton.vue";
import { mdiChevronRight } from "@mdi/js";
import Ticket from "@/components/front/Ticket.vue";
import { ref, inject, onMounted } from "vue";
import NavbarComponent from "../../components/front/NavbarComponent.vue";

const axios = inject("axios");
const tickets = ref([]);
const waiting = ref(false);
const selectedType = ref("all");

const loadTickets = async (url) => {
  waiting.value = true;
  try {
    const response = await axios.get(
      url || "orders"
    );

    tickets.value = response.data;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};


onMounted(() => {
  loadTickets();
});
</script>

<template>
  <!-- ======= Top Bar ======= -->
  <NavbarComponent />

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-cente">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-lg-between"
    >
      <h1 class="logo me-auto me-lg-0"><a href="/">FASTUGA</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li class="book-a-table-btn d-none d-lg-flex">Public Board</li>
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
    <div
      class="container position-relative text-center text-lg-start"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <form action="/action_page.php">
        <div class="row bgOrder">
          <div class="col-lg-6">
            <div class="section-title">
              <h2>Public Board</h2>
              <p>Track your dish</p>
            </div>
          </div>
          <div class="col-lg-6 text-right">
            <a href="#menu" class="btn-menu animated fadeInUp scrollto">
              Next (5)
            </a>
          </div>
          <div
            class="row menu-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Ticket
              v-for=" t in tickets.data"
              :ticketNumber="t.ticket_number"
              :status="t.status"
              :date="t.date"
              />
          </div>
        </div>
      </form>
    </div>
  </section>
  <!-- End Hero -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>