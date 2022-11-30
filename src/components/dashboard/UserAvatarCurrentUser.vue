<script setup>
import { useUserStore } from "@/stores/user";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";

const userStore = useUserStore();
</script>

<template>
  <UserAvatar :username="userStore.user?.name ?? 'Anonymous'" :avatar="userStore.userPhotoUrl">
    <slot />
  </UserAvatar>
</template>
