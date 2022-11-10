<script setup>
import { useMainStore } from "@/stores/dashboard/main";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";

const mainStore = useMainStore();
</script>

<template>
  <UserAvatar :username="mainStore.userName" :avatar="mainStore.userAvatar">
    <slot />
  </UserAvatar>
</template>
