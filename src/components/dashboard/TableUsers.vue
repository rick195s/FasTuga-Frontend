<script setup>
import { ref, onMounted, inject } from "vue";
import { mdiEye, mdiTrashCan, mdiCancel } from "@mdi/js";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";
import TableCheckboxCell from "@/components/dashboard/TableCheckboxCell.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";

const props = defineProps({
  checkable: Boolean,
  endpoint: {
    type: String,
    default: null,
  },
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const axios = inject("axios");

const users = ref([]);
const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const checkedRows = ref([]);

const remove = (arr, cb) => {};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const loadUsers = async (url) => {
  try {
    const response = await axios.get(url || props.endpoint || "users");

    users.value = response.data;

    numPages.value = users.value.meta.last_page;
    currentPageHuman.value = users.value.meta.current_page;
    pagesList.value = users.value.meta.links;
  } catch (error) {
    console.log(error);
  }
};

const toggleBlocked = async (user) => {
  try {
    const response = await axios.patch(`users/${user.id}/toggleBlocked`);

    user.blocked = response.data.data.blocked;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  loadUsers();
});
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users.data" :key="user.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, user)" />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="user.name"
            :avatar="user.photo_url"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td
          v-for="header in headers"
          :key="header.value"
          data-label="{{header}}"
          :class="{ 'line-through': user.blocked }"
        >
          {{ user[header.value] }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="white"
              :icon="mdiCancel"
              small
              @click="toggleBlocked(user)"
            />
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page.active"
          :label="page.label"
          :color="page.active ? 'lightDark' : 'whiteDark'"
          small
          @click="loadUsers(page.url)"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
