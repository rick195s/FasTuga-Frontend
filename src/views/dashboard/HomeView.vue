<script setup>
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiAccountPlusOutline,
  mdiFormTextboxPassword,
  mdiMail,
  mdiAccount,
} from "@mdi/js";
import { ref, inject, onMounted } from "vue";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import CardBoxWidget from "@/components/dashboard/CardBoxWidget.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import TableUsers from "@/components/dashboard/TableUsers.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import NotificationToast from "@/components/dashboard/NotificationToast.vue";
import CardBoxComponentEmpty from "@/components/dashboard/CardBoxComponentEmpty.vue";

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

const usersEndpoint = "users";

const isModelCreateUser = ref(false);
const toastType = ref("");
const toastMessage = ref("");
const users = ref([]);

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
  try {
    const response = await axios.get(url || "users");
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

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="512"
          label="Clients"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </div>

      <SectionTitleLineWithButton
        :end-icon="mdiAccountPlusOutline"
        :icon="mdiAccountMultiple"
        title="Users"
        @end-icon-click="isModelCreateUser = true"
      />

      <CardBox has-table>
        <TableUsers
          v-if="users.data"
          :headers="usersHeaders"
          :endpoint="usersEndpoint"
          :user-update-fields="userUpdateFields"
          :users="users"
          @delete="deleteUser"
          @toggle-blocked="toggleBlocked"
          @update="updateUser"
          @load-users="loadUsers"
        />
        <CardBoxComponentEmpty v-else />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
