<script setup>
import TicketComponent from "@/components/front/TicketComponent.vue";
import { ref, inject, onMounted } from "vue";
import LayoutFrontGuest from "@/layouts/LayoutFrontGuest.vue";

const axios = inject("axios");
const socket = inject("socket");
const tickets = ref([]);

const loadTickets = async (url) => {
  try {
    const response = await axios.get(url || "tickets");
    tickets.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  socket.on("order-ready", (order_id) => {
    const ticket = tickets.value.find((t) => t.id == order_id);
    if (ticket) {
      ticket.status = "Ready";
    }
  });
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

            <div
              class="row menu-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <TicketComponent
                v-for="t in tickets"
                :key="t.id"
                :ticket-number="t.ticket_number"
                :status="t.status"
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
