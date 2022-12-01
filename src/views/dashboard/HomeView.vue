<script setup>
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
} from "@mdi/js";
import SectionMain from "@/components/dashboard/SectionMain.vue";
import CardBoxWidget from "@/components/dashboard/CardBoxWidget.vue";
import CardBox from "@/components/dashboard/CardBox.vue";
import TableUsers from "@/components/dashboard/TableUsers.vue";
import NotificationBar from "@/components/dashboard/NotificationBar.vue";
import LayoutAuthenticated from "@/layouts/dashboard/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/dashboard/SectionTitleLineWithButton.vue";
import { ref, inject } from "vue";

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

const tableUsers = ref(null);

const toggleBlocked = async (user) => {
  try {
    const response = await axios.patch(`users/${user.id}/toggleBlocked`);

    user.blocked = response.data.data.blocked;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (user) => {
  try {
    await axios.delete(`users/${user.id}`);
    tableUsers.value.loadUsers();
  } catch (error) {
    console.log(error);
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
    } else {
      await axios.put(`users/${user.id}`, user);
    }

    tableUsers.value.loadUsers();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <LayoutAuthenticated>
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
          :user-update-fields="userUpdateFields"
          @delete="deleteUser"
          @toggle-blocked="toggleBlocked"
          @update="updateUser"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
