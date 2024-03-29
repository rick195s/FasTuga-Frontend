<script setup>
import { reactive, ref } from "vue";
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

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");
const waiting = ref(false);
const store = useUserStore();

const form = reactive({
  email: "",
  password: "",
});

const resolveDirective = () => {
  switch (store.user?.type) {
    case "EM":
      router.push({ name: "dashboard" });
      break;

    case "EC":
      router.push({ name: "itemsToPrepare" });
      break;

    case "ED":
      router.push({ name: "ordersToDeliver" });
      break;

    default:
      router.push({ name: "home" });
      break;
  }
};

const submit = async () => {
  const credentials = {
    email: form.email,
    password: form.password,
  };

  setWaiting();

  try {
    const response = await store.login(credentials);

    if (response.status !== 200) {
      throw response;
    }

    resolveDirective();
  } catch (error) {
    setError(error);
  }
  waiting.value = false;
};

const setError = (error) => {
  formHeaderTitle.value = "Error: ";
  if (!error.response?.data) {
    formHeaderContent.value = "Login failed";
  } else {
    formHeaderContent.value = error.response.data.message;
  }
  formStatusCurrent.value = "danger";
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
            required
            type="email"
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
            required
          />
        </FormField>

        <div class="space-y-3">
          <p>
            Do you want to register?
            <a
              class="underline text-sky-400 cursor-pointer"
              @click.prevent="router.push({ name: 'register' })"
              >Click here</a
            >
          </p>
        </div>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/" color="info" outline label="Home" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
