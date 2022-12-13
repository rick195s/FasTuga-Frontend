<script setup>
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/dashboard/UserAvatarCurrentUser.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import PillTag from "@/components/dashboard/PillTag.vue";

const userStore = useUserStore();

const userName = computed(() => userStore.user?.name ?? "Anonymous");

const userType = ref("");

onMounted(() => {
  switch (userStore.user?.type) {
    case "EC":
      userType.value = "Employee Chef";
      break;

    case "EM":
      userType.value = "Employee Manager";
      break;

    case "ED":
      userType.value = "Employee Deliver";
      break;

    default:
      break;
  }
});
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="w-48" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          Howdy, <b>{{ userName }}</b
          >!
        </h1>

        <p>{{ userType }}</p>

        <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
