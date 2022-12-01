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

const usersEndpoint = "users";
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
        <TableUsers :headers="usersHeaders" :endpoint="usersEndpoint" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
