<script setup>
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>
<template>
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
          <BaseButtons v-if="!userStore.user">
            <BaseButton to="/board" outline label="Public Board" />
            <BaseButton to="/login" outline label="Login" />
            <BaseButton to="/register" outline label="Register" />
          </BaseButtons>
          <BaseButtons v-else>
            <BaseButton to="/board" outline label="Public Board" />
            <BaseButton to="/customer/profile" outline label="Profile" />
            <BaseButton outline label="Logout" @click="logout" />
          </BaseButtons>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
