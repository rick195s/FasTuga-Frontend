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
import NavbarComponent from "../../components/front/NavbarComponent.vue";

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
  <NavbarComponent />
  <section id="hero" class="d-flex align-items-center">
    <video
      id="bgVideo"
      preload="true"
      autoplay
      loop
      muted
      poster="src/assets/img/promoVideo.mp4"
    >
      <source src="src/assets/img/promoVideo.mp4" type="video/mp4" />
    </video>
    <div
      class="container position-relative text-center text-lg-start"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <form action="/action_page.php">
        <div class="row bgOrder">
          <div class="col-lg-6">
            <div class="section-title">
              <h2>Menu</h2>
              <p>Check Our Tasty Menu</p>
            </div>
          </div>
          <div class="col-lg-6 text-right">
            <a href="#menu" class="btn-menu animated fadeInUp scrollto">
              Next (5)
            </a>
          </div>
          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12 d-flex justify-content-center"></div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
