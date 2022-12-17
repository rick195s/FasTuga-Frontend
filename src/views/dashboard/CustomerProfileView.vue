<script setup>
import { ref, inject } from "vue";
import { useUserStore } from "@/stores/user";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import BaseDivider from "@/components/dashboard/BaseDivider.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import UserCard from "@/components/dashboard/UserCard.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/dashboard/NotificationBarInCard.vue";

const userStore = useUserStore();
const axios = inject("axios");

const formStatusCurrent = ref("");
const formHeaderTitle = ref("");
const formHeaderContent = ref("");
const waiting = ref(false);

const formErrors = ref({
  name: [],
  photo: [],
  old_password: [],
  password: [],
});

const profileForm = ref({
  name: userStore.user?.name ?? "Anonymous",
});

const userPhoto = ref(null);

const passwordForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const cleanErrors = () => {
  formErrors.value = {
    name: [],
    photo: [],
    old_password: [],
    password: [],
  };
};

const setPhoto = (file) => {
  userPhoto.value = file;
};

const submitProfile = async () => {
  cleanErrors();
  if (profileForm.value.name === userStore.user.name) {
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
    }

    await axios.put(`users/${userStore.userId}`, profileForm.value);
    userStore.user = { ...userStore.user, ...profileForm.value };
    setSuccess();
  } catch (error) {
    setError();

    formErrors.value.name = error.response.data.errors?.name;
    formErrors.value.photo = error.response.data.errors?.photo;
  }

  waiting.value = false;
};

const submitPass = async () => {
  cleanErrors();
  setWaiting();
  try {
    await axios.put(`users/${userStore.userId}`, passwordForm.value);
    setSuccess();
  } catch (error) {
    setError();
    formErrors.value.password = error.response.data.errors?.password;
    formErrors.value.old_password = error.response.data.errors?.old_password;
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

const setError = () => {
  formHeaderTitle.value = "Error";
  formHeaderContent.value = "";
  formStatusCurrent.value = "danger";
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField :errors="formErrors.photo" label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" @update:modelValue="setPhoto" />
          </FormField>

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
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="userStore.user.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <NotificationBarInCard
            v-if="formStatusCurrent"
            :color="formStatusCurrent"
            :waiting="waiting"
          >
            <span
              ><b class="capitalize">{{ formHeaderTitle }}</b>
            </span>
          </NotificationBarInCard>
          <FormField
            label="Current password"
            help="Required. Your current password"
            :errors="formErrors.old_password"
          >
            <FormControl
              v-model="passwordForm.old_password"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField
            label="New password"
            help="Required. New password"
            :errors="formErrors.password"
          >
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
