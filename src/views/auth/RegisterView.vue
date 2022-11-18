<script setup>
import { reactive, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/dashboard/SectionFullScreen.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import LayoutGuest from "@/layouts/dashboard/LayoutGuest.vue";
import { useMainStore } from "@/stores/dashboard/main";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";

const axios = inject("axios");
const router = useRouter();
const store = useMainStore();

const formStatusCurrent = ref("");
const formHeaderText = ref("");

const formErrors = reactive({
  name: [],
  email: [],
  password: [],
  phone_nif: [],
});

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  nif: "",
});

const submit = async () => {
  const body = {
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
    phone: form.phone,
    nif: form.nif,
  };

  try {
    const response = await axios.post("/register", body);
    formHeaderText.value = "Register successful";
    formStatusCurrent.value = "success";
    store.setAuthToken(response.data.token);
    axios.defaults.headers.common.Authorization = store.authToken;

    router.push({ name: "dashboard" });
  } catch (error) {
    formHeaderText.value = error.response.data.message;
    populateErrors(error.response.data.errors);
    formStatusCurrent.value = "danger";
  }
};

const populateErrors = (errors) => {
  formErrors.name = errors.name;
  formErrors.email = errors.email;
  formErrors.password = errors.password;

  formErrors.phone_nif = [];
  if (errors.phone) {
    errors.phone.forEach((element) => {
      formErrors.phone_nif.push(element);
    });
  }

  if (errors.nif) {
    errors.nif.forEach((element) => {
      formErrors.phone_nif.push(element);
    });
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <NotificationBarInCard
          v-if="formStatusCurrent"
          :color="formStatusCurrent"
        >
          <span><b class="capitalize">Error:</b> {{ formHeaderText }}</span>
        </NotificationBarInCard>

        <FormField
          label="Name"
          :errors="formErrors.name"
          help="Please enter your name"
        >
          <FormControl
            v-model="form.name"
            :icon="mdiAccount"
            name="name"
            placeholder="Name"
            autocomplete="name"
          />
        </FormField>

        <FormField
          label="Email"
          :errors="formErrors.email"
          help="Please enter your email"
        >
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            placeholder="Email"
            autocomplete="email"
          />
        </FormField>

        <FormField
          label="Phone & NIF"
          :errors="formErrors.phone_nif"
          help="Please enter your phone and NIF"
        >
          <FormControl
            v-model="form.phone"
            :icon="mdiAsterisk"
            type="text"
            name="phone"
            placeholder="Phone"
            autocomplete="current-phone"
          />
          <FormControl
            v-model="form.nif"
            :icon="mdiAsterisk"
            type="text"
            name="nif"
            placeholder="NIF"
            autocomplete="current-nif"
          />
        </FormField>

        <FormField
          label="Password"
          :errors="formErrors.password"
          help="Please enter your password"
        >
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="current-password"
          />
          <FormControl
            v-model="form.password_confirmation"
            :icon="mdiAsterisk"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            autocomplete="current-password-confirmation"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
