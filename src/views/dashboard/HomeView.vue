<script setup>
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiAccount,
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import CardBoxWidget from "@/components/dashboard/CardBoxWidget.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import TableUsers from "@/components/dashboard/TableUsers.vue";
import NotificationBar from "@/components/dashboard/NotificationBar.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import { ref, inject } from "vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

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
    options: [
      {
        value: "EM",
        label: "Employee Manager",
      },
      {
        value: "ED",
        label: "Employee Delivery",
      },
      {
        value: "C",
        label: "Customer",
      },
      {
        value: "EC",
        label: "Employee Chef",
      },
    ],
  },
  {
    name: "photo",
    label: "Avatar",
    type: "file",
  },
];

const usersEndpoint = "users";
const isModalDeleteUser = ref(false);
const userToDelete = ref(null);

const isModelUpdateUser = ref(false);
const userToUpdate = ref([null]);
userToUpdate.value = {
  name: "",
  type: "",
};

const tableUsers = ref(null);

const toggleBlocked = async (user) => {
  try {
    const response = await axios.patch(`users/${user.id}/toggleBlocked`);

    user.blocked = response.data.data.blocked;
  } catch (error) {
    console.log(error);
  }
};

const confirmDelete = async () => {
  try {
    await axios.delete(`users/${userToDelete.value.id}`);
    tableUsers.value.loadUsers();
  } catch (error) {
    console.log(error);
  }
};

const showModelDeleteUser = (user) => {
  isModalDeleteUser.value = true;
  userToDelete.value = user;
};

const showModelUpdateUser = (user) => {
  isModelUpdateUser.value = true;
  userToUpdate.value = { ...user };
};

const updateUser = async () => {
  try {
    if (userToUpdate.value.photo) {
      const formData = new FormData();
      formData.append("photo", userToUpdate.value.photo);

      await axios.post(`users/${userToUpdate.value.id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.put(`users/${userToUpdate.value.id}`, userToUpdate.value);
    }

    tableUsers.value.loadUsers();
  } catch (error) {
    console.log(error);
  }
};

const setFile = (file) => {
  userToUpdate.value.photo = file;
};
</script>

<template>
  <LayoutAuthenticated>
    <!-- #region ------------------------------- UPDATE USER ------------------------------- -->
    <CardBoxModal
      v-model="isModelUpdateUser"
      title="Update User"
      button="info"
      has-cancel
      @confirm="updateUser"
    >
      <FormField
        v-for="userField in userUpdateFields"
        :key="userField.name"
        :label="userField.label"
      >
        <FormFilePicker
          v-if="userField.type == 'file'"
          label="Upload"
          @update:modelValue="setFile"
        />
        <FormControl
          v-else-if="userField.type == 'select'"
          v-model="userToUpdate[userField.name]"
          :icon="mdiAccount"
          :name="userField.name"
          :autocomplete="userField.name"
          :placeholder="userField.label"
          :type="userField.type"
          :options="userField.options"
        />
        <FormControl
          v-else
          v-model="userToUpdate[userField.name]"
          :icon="mdiAccount"
          :name="userField.name"
          :autocomplete="userField.name"
          :placeholder="userField.label"
          :type="userField.type"
        />
      </FormField>
    </CardBoxModal>
    <!-- #endregion -->
    <!-- #region ------------------------------- DELETE USER ------------------------------- -->
    <CardBoxModal
      v-model="isModalDeleteUser"
      title="Please confirm"
      button="danger"
      has-cancel
      @confirm="confirmDelete"
    >
      <p>
        Are you sure you want to delete user:
        <br />
        <b>{{ `${userToDelete?.name} - ${userToDelete?.typeToString}` }}</b>
        ?
      </p>
    </CardBoxModal>
    <!-- #endregion -->
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

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Users" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox has-table>
        <TableUsers
          ref="tableUsers"
          :headers="usersHeaders"
          :endpoint="usersEndpoint"
          @delete="showModelDeleteUser"
          @toggle_blocked="toggleBlocked"
          @update="showModelUpdateUser"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
