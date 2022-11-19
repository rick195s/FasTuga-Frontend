<script setup>
import { reactive, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/dashboard/SectionFullScreen.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import FormCheckRadio from "@/components/dashboard/FormCheckRadio.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import LayoutGuest from "@/layouts/dashboard/LayoutGuest.vue";
import { useMainStore } from "@/stores/dashboard/main";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";

const axios = inject("axios");
const router = useRouter();

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");
const waiting = ref(false);
const store = useMainStore();

const form = reactive({
  email: "",
  password: "",
  remember: true,
});

const submit = async () => {
  const body = {
    email: form.email,
    password: form.password,
  };

  try {
    setWaiting();
    const response = await axios.post("/login", body);
    store.setAuthToken(response.data.token);
    axios.defaults.headers.common.Authorization = store.authToken;

    router.push({ name: "dashboard" });
  } catch (error) {
    formHeaderTitle.value = "Error: ";
    if (!error.response.data) {
      formHeaderContent.value = "Login failed";
    } else {
      formHeaderTitle.value = error.response.data.message;
    }
    formStatusCurrent.value = "danger";
  }

  waiting.value = false;
};

const setWaiting = () => {
  formHeaderTitle.value = "Waiting";
  formHeaderContent.value = "";
  waiting.value = true;
  formStatusCurrent.value = "info";
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <NotificationBarInCard
          v-if="formStatusCurrent"
          :color="formStatusCurrent"
          :waiting="waiting"
        >
          <span
            ><b class="capitalize">{{ formHeaderTitle }}</b>
            {{ formHeaderContent }}</span
          >
        </NotificationBarInCard>
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            placeholder="Email"
            autocomplete="email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
