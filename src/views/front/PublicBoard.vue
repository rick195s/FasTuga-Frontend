<script setup>
import BaseButton from "@/components/dashboard/BaseButton.vue";
import Ticket from "@/components/front/Ticket.vue";
import { ref, inject, onMounted } from "vue";
import LayoutFrontGuest from "@/layouts/LayoutFrontGuest.vue";

const axios = inject("axios");
const tickets = ref([]);
const page = ref(0);
const waiting = ref(false);

const loadTickets = async (url) => {
  page.value = page.value + 1;
  waiting.value = true;
  try {
    const response = await axios.get(url || "tickets");

    tickets.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const pages = async () => {
  waiting.value = true;
  try {
    const response = await axios.get("tickets?page=" + page.value);

    tickets.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
  waiting.value = false;
};

const goesToPage = (signal) => {
  if (signal == "next") {
    page.value = page.value + 1;
    pages();
    return;
  }
  page.value = page.value - 1;
  pages();
};

onMounted(() => {
  loadTickets();
});
</script>

<template>
  <LayoutFrontGuest>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-cente">
      <div
        class="container-fluid container-xl d-flex align-items-center justify-content-lg-between"
      >
        <h1 class="logo me-auto me-lg-0">
          <router-link :to="{ name: 'home' }" replace>FASTUGA</router-link>
        </h1>
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
              <BaseButton
                v-if="page != 1"
                class="btn-menu animated fadeInUp scrollto"
                label="Previous (10)"
                @click="goesToPage('prev')"
              />
              <BaseButton
                v-if="tickets[9] != null"
                class="btn-menu animated fadeInUp scrollto"
                label="Next (10)"
                @click="goesToPage('next')"
              />
            </div>
            <div
              class="row menu-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Ticket
                v-for="t in tickets"
                :key="t.id"
                :ticket-number="t.ticket_number"
                :status="t.status"
                :date="t.date"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </LayoutFrontGuest>
  <!-- End Hero -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
