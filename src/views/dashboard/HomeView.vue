<script setup>
import {
  mdiAccountMultiple,
  mdiChartTimelineVariant,
  mdiAccountPlusOutline,
  mdiFormTextboxPassword,
  mdiMail,
  mdiAccount,
} from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";

import MainStatistics from "@/components/dashboard/MainStatistics.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import TableUsers from "@/components/dashboard/TableUsers.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";

const axios = inject("axios");

const usersHeaders = [
  {
    text: "Name",
    value: "name",
  },
  {
    text: "Email",
    value: "email",
  },
  {
    text: "Role",
    value: "typeToString",
  },
];

const userTypes = [
  {
    value: "EM",
    label: "Employee Manager",
  },
  {
    value: "ED",
    label: "Employee Delivery",
  },
  {
    value: "EC",
    label: "Employee Chef",
  },
];

const userUpdateFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "type",
    label: "Role",
    type: "select",
    value: "",
    options: userTypes,
  },
  {
    name: "photo",
    label: "Avatar",
    type: "file",
  },
];

const isModelCreateUser = ref(false);
const toastType = ref("");
const toastMessage = ref("");
const users = ref([]);
const currentURL = ref("");

const userToCreate = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  type: "",
  photo: null,
});

const toggleBlocked = async (user) => {
  try {
    const response = await axios.patch(`users/${user.id}/toggleBlocked`);

    user.blocked = response.data.data.blocked;
  } catch (error) {
    console.log(error);
  }
};

const loadUsers = async (url) => {
  if (url) {
    currentURL.value = url;
  }
  try {
    const response = await axios.get(currentURL.value || "users");
    users.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const setPhoto = (file) => {
  userToCreate.value.photo = file;
};

const createUser = async () => {
  try {
    const formData = new FormData();

    for (var key in userToCreate.value) {
      if (userToCreate.value[key]) {
        formData.append(key, userToCreate.value[key]);
      }
    }

    await axios.post("users", formData);
    toastMessage.value = "User created successfully";
    toastType.value = "success";
  } catch (error) {
    toastMessage.value = error.response.data.message;
    toastType.value = "danger";
  }
};

const deleteUser = async (user) => {
  try {
    await axios.delete(`users/${user.id}`);
    loadUsers();
    toastMessage.value = "User deleted successfully";
    toastType.value = "success";
  } catch (error) {
    toastMessage.value = error.response.data.message;
    toastType.value = "danger";
  }
};

const updateUser = async (user) => {
  try {
    if (user.photo) {
      const formData = new FormData();
      formData.append("photo", user.photo);

      await axios.post(`users/${user.id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      delete user.photo;
    }

    await axios.put(`users/${user.id}`, user);
    toastMessage.value = "User updated successfully";
    toastType.value = "success";
    loadUsers();
  } catch (error) {
    toastMessage.value = error.response.data.message;
    toastType.value = "danger";
  }
};

onMounted(async () => {
  loadUsers();
});
</script>

<template>
  <LayoutAuthenticated>
    <NotificationToast
      v-if="toastType"
      :type="toastType"
      :message="toastMessage"
      @close="toastType = ''"
    ></NotificationToast>

    <CardBoxModal
      v-model="isModelCreateUser"
      title="Create User"
      button="info"
      has-cancel
      @confirm="createUser"
    >
      <FormField label="Role">
        <FormControl
          v-model="userToCreate.type"
          :icon="mdiAccount"
          name="type"
          autocomplete="type"
          placeholder="Type"
          type="select"
          :options="userTypes"
        />
      </FormField>
      <FormField label="Name">
        <FormControl
          v-model="userToCreate.name"
          :icon="mdiAccount"
          name="name"
          autocomplete="name"
          placeholder="Name"
          type="text"
        />
      </FormField>
      <FormField label="Email">
        <FormControl
          v-model="userToCreate.email"
          :icon="mdiMail"
          name="email"
          autocomplete="email"
          placeholder="Email"
          type="email"
      /></FormField>
      <FormField label="Password">
        <FormControl
          v-model="userToCreate.password"
          :icon="mdiFormTextboxPassword"
          name="password"
          autocomplete="password"
          placeholder="Password"
          type="password"
      /></FormField>
      <FormField label="Confirm Password">
        <FormControl
          v-model="userToCreate.password_confirmation"
          :icon="mdiFormTextboxPassword"
          name="confirm_password"
          autocomplete="password"
          placeholder="Password"
          type="password"
      /></FormField>
      <FormField label="Photo">
        <FormFilePicker label="Upload" @update:modelValue="setPhoto" />
      </FormField>
    </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview"
        main
      >
      </SectionTitleLineWithButton>

      <MainStatistics />
      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Users">
        <BaseButton
          label="Create User"
          :icon="mdiAccountPlusOutline"
          color="whiteDark"
          @click="isModelCreateUser = true"
        />
      </SectionTitleLineWithButton>

      <CardBox has-table>
        <TableUsers
          v-if="users.data"
          :headers="usersHeaders"
          :user-update-fields="userUpdateFields"
          :users="users"
          @delete="deleteUser"
          @toggle-blocked="toggleBlocked"
          @update="updateUser"
          @load-users="loadUsers"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
