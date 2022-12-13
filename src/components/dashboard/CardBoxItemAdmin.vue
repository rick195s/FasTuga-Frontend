<script setup>
import { computed, ref, inject } from "vue";
import {
  mdiTrashCan,
  mdiCancel,
  mdiCircleEditOutline,
  mdiAccount,
} from "@mdi/js";
import CardBox from "@/components/dashboard/CardBox.vue";
import BaseLevel from "@/components/dashboard/BaseLevel.vue";
import PillTag from "@/components/dashboard/PillTag.vue";
import UserAvatar from "@/components/dashboard/UserAvatar.vue";
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import CardBoxModal from "@/components/dashboard/CardBoxModal.vue";

const emit = defineEmits(["update"]);
const isModelUpdateUser = ref(false);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const edit = async () => {
  isModelUpdateUser.value = true;
};

const destroy = () => {
  alert("delete");
};
</script>

<template>
  <!-- #region ------------------------------- UPDATE PRODUCT ------------------------------- -->
  <CardBoxModal
    v-model="isModelUpdateUser"
    title="Update Product"
    button="info"
    has-cancel
    @confirm="emit('edit', userToUpdate)"
  >
  <h1>Edit</h1> 
  </CardBoxModal>
  <!-- #endregion -->
  <CardBox class="mb-6 last:mb-0 overflow-hidden" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar style="border-radius: 50%; width:90px; height:90px;" class="w-12 mr-6" :avatar="avatar" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">{{ price }}</p>
        </div>
      </BaseLevel>
      <BaseButtons>
          <BaseButton
              color="info"
              :icon="mdiCircleEditOutline"
              small
              @click="edit()"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="destroy()"
            />
      </BaseButtons>
    </BaseLevel>
  </CardBox>
</template>
