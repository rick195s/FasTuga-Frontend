<script setup>
import { ref, watch, onMounted } from "vue";
import {
  mdiTrashCan,
  mdiCancel,
  mdiCircleEditOutline,
  mdiAccount,
} from "@mdi/js";
import PaginationButtons from "@/components/dashboard/PaginationButtons.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";
import FormField from "@/components/dashboard/FormField.vue";
import FormControl from "@/components/dashboard/FormControl.vue";
import FormFilePicker from "@/components/dashboard/FormFilePicker.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

const props = defineProps({
  users: {
    type: Object,
    default: () => {},
  },
  headers: {
    type: Array,
    default: () => [],
  },
  userUpdateFields: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["toggle-blocked", "delete", "update", "load-users"]);

const numPages = ref(0);
const currentPageHuman = ref(0);
const pagesList = ref([]);

const isModalDeleteUser = ref(false);
const userToDelete = ref(null);

const isModelUpdateUser = ref(false);
const userToUpdate = ref([null]);
userToUpdate.value = {
  name: "",
  type: "",
};

watch(
  () => props.users,
  (users) => {
    loadMeta(users.meta);
  }
);

const loadMeta = (meta) => {
  numPages.value = meta.last_page;
  currentPageHuman.value = meta.current_page;
  pagesList.value = meta.links;
};

const setFile = (file) => {
  userToUpdate.value.photo = file;
};

const showModelDeleteUser = (user) => {
  isModalDeleteUser.value = true;
  userToDelete.value = user;
};

const showModelUpdateUser = (user) => {
  isModelUpdateUser.value = true;
  userToUpdate.value = { ...user };
};

const loadUsers = (url) => {
  emit("load-users", url);
};

onMounted(() => {
  loadMeta(props.users.meta);
});
</script>

<template>
  <!-- #region ------------------------------- UPDATE USER ------------------------------- -->
  <CardBoxModal
    v-model="isModelUpdateUser"
    title="Update User"
    button="info"
    has-cancel
    @confirm="emit('update', userToUpdate)"
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
    @confirm="emit('delete', userToDelete)"
  >
    <p>
      Are you sure you want to delete user:
      <br />
      <b>{{ `${userToDelete?.name} - ${userToDelete?.typeToString}` }}</b>
      ?
    </p>
  </CardBoxModal>
  <!-- #endregion -->

  <table>
    <thead>
      <tr>
        <th />
        <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users.data" :key="user.id">
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
          :data-label="header.text"
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
              @click="emit('toggle-blocked', user)"
            />
            <BaseButton
              color="info"
              :icon="mdiCircleEditOutline"
              small
              @click="showModelUpdateUser(user)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="showModelDeleteUser(user)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <PaginationButtons
      :num-pages="numPages"
      :current-page-human="currentPageHuman"
      :pages-list="pagesList"
      @change-page="loadUsers"
    />
  </div>
</template>
