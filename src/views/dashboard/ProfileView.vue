<script setup>
import { ref, inject, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import {
  mdiAccount,
  mdiCellphone,
  mdiMail,
  mdiFormatListCheckbox,
  mdiCreditCardOutline,
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import UserCard from "@/components/dashboard/UserCard.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";
import utils from "@/utils.js";

defineProps({
  customer: Boolean,
});

const userStore = useUserStore();
const axios = inject("axios");

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");
const waiting = ref(false);

const formErrors = ref({
  name: [],
  photo: [],
  nif: [],
  phone: [],
  default_payment_type: [],
  default_payment_reference: [],
});

const paymentTypes = [
  {
    value: "PAYPAL",
    label: "Paypal",
  },
  {
    value: "VISA",
    label: "Visa",
  },
  {
    value: "MBWAY",
    label: "Mbway",
  },
];

const profileForm = ref({});

const userPhoto = ref(null);

const cleanErrors = () => {
  formErrors.value = {
    name: [],
    photo: [],
    nif: [],
    phone: [],
    default_payment_type: [],
    default_payment_reference: [],
  };

  formHeaderTitle.value = "";
  formHeaderContent.value = "";
};

const setPhoto = (file) => {
  userPhoto.value = file;
};

const checkFieldsChanged = () => {
  return (
    JSON.stringify(profileForm.value) === JSON.stringify(userStore.user) &&
    !userPhoto.value
  );
};

const submitProfile = async () => {
  cleanErrors();
  if (checkFieldsChanged()) {
    formHeaderTitle.value = "No changes detected";
    formStatusCurrent.value = "info";
    return;
  }

  setWaiting();

  try {
    if (userPhoto.value) {
      const formData = new FormData();
      formData.append("photo", userPhoto.value);

      const response = await axios.post(
        `users/${userStore.userId}/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      userStore.user.photo_url = response.data.data.photo_url;
      profileForm.value.photo_url = response.data.data.photo_url;
    }

    await axios.put(
      `users/${userStore.userId}`,
      utils.getDiff(userStore.user, profileForm.value)
    );

    userStore.user = { ...userStore.user, ...profileForm.value };
    setSuccess();
  } catch (error) {
    setError(error);
  }

  waiting.value = false;
};

const setWaiting = () => {
  formHeaderTitle.value = "Waiting";
  formHeaderContent.value = "";
  waiting.value = true;
  formStatusCurrent.value = "info";
};

const setSuccess = () => {
  formHeaderTitle.value = "Success";
  formHeaderContent.value = "";
  formStatusCurrent.value = "success";
};

const setError = (error) => {
  formErrors.value = { ...error.response.data.errors };

  formHeaderTitle.value = "Error";
  formHeaderContent.value = error.response.data.message;
  formStatusCurrent.value = "danger";
};

onMounted(() => {
  profileForm.value = { ...userStore.user };
  profileForm.value.name = userStore.user?.name ?? "Anonymous";
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard
        :points="customer ? userStore.user?.points : null"
        :email="userStore.user?.email"
        class="mb-6"
      />

      <CardBox is-form @submit.prevent="submitProfile">
        <NotificationBarInCard
          v-if="formStatusCurrent"
          :color="formStatusCurrent"
          :waiting="waiting"
        >
          <span
            ><b class="capitalize">{{ formHeaderTitle }}</b>
            {{ formHeaderContent }}
          </span>
        </NotificationBarInCard>
        <div class="flex justify-between">
          <FormField :errors="formErrors.photo" label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" @update:modelValue="setPhoto" />
          </FormField>
          <BaseButton
            color="info"
            class="self-center h-fit"
            type="submit"
            label="Submit"
          />
        </div>

        <FormField
          label="Name"
          help="Required. Your name"
          :errors="formErrors.name"
        >
          <FormControl
            v-model="profileForm.name"
            :icon="mdiAccount"
            name="username"
            required
            autocomplete="username"
          />
        </FormField>
        <span v-if="customer">
          <FormField
            label="NIF"
            :errors="formErrors.nif"
            help="Required. Your NIF"
          >
            <FormControl
              v-model="profileForm.nif"
              :icon="mdiMail"
              type="text"
              name="nif"
              required
              autocomplete="nif"
            />
          </FormField>
          <FormField
            label="Phone"
            :errors="formErrors.phone"
            help="Required. Your Phone"
          >
            <FormControl
              v-model="profileForm.phone"
              :icon="mdiCellphone"
              type="text"
              name="phone"
              required
              autocomplete="phone"
            />
          </FormField>

          <FormField
            label="Payment Method"
            :errors="formErrors.default_payment_type"
          >
            <FormControl
              v-model="profileForm.default_payment_type"
              :icon="mdiFormatListCheckbox"
              name="default_payment_type"
              autocomplete="type"
              placeholder="Default Payment Type"
              type="select"
              :options="paymentTypes"
            />
          </FormField>
          <FormField
            label="Payment Reference"
            :errors="formErrors.default_payment_reference"
          >
            <FormControl
              v-model="profileForm.default_payment_reference"
              :icon="mdiCreditCardOutline"
              type="text"
              name="default_payment_reference"
              autocomplete="default_payment_reference"
            />
          </FormField>
        </span>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
