<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/dashboard/SectionFullScreen.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import LayoutGuest from "@/layouts/dashboard/LayoutGuest.vue";
import { useUserStore } from "@/stores/user";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";

const router = useRouter();
const store = useUserStore();

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");
const waiting = ref(false);

const formErrors = ref({
  name: [],
  email: [],
  password: [],
  phone_nif: [],
});

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  nif: "",
});

const cleanErrors = () => {
  formErrors.value = {
    name: [],
    email: [],
    password: [],
    phone_nif: [],
  };
};

const submit = async () => {
  setWaiting();
  cleanErrors();

  const response = await store.register(form);
  if (response.status === 200) {
    router.push({ name: "dashboard" });
  } else {
    setError(response);
  }

  waiting.value = false;
};

const setError = (error) => {
  formHeaderTitle.value = "Error: ";
  if (!error.response.data) {
    formHeaderContent.value = "Register failed";
  } else {
    formHeaderContent.value = error.response.data.message;
    populateErrors(error.response.data.errors);
  }
  formStatusCurrent.value = "danger";
};

const populateErrors = (errors) => {
  formErrors.value.name = errors.name;
  formErrors.value.email = errors.email;
  formErrors.value.password = errors.password;

  formErrors.value.phone_nif = [];
  if (errors.phone) {
    errors.phone.forEach((element) => {
      formErrors.value.phone_nif.push(element);
    });
  }

  if (errors.nif) {
    errors.nif.forEach((element) => {
      formErrors.value.phone_nif.push(element);
    });
  }
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
