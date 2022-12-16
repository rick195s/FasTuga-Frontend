<style scoped>
@import '@/../src/assets/css/style.css';
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>

<script setup>
import BaseButton from '@/components/dashboard/BaseButton.vue'
import BaseButtons from '@/components/dashboard/BaseButtons.vue'
import { mdiChevronRight } from '@mdi/js'
import Product from '@/components/front/Product.vue'
import Filter from '@/components/front/FilterProducts.vue'
import { ref, inject, onMounted } from 'vue'

const axios = inject('axios')
const products = ref([])
const productsTypes = ref([])
const waiting = ref(false)
const selectedType = ref('all')

const loadProducts = async (url) => {
  waiting.value = true
  try {
    const response = await axios.get(
      url || 'products?filter=' + selectedType.value,
    )

    products.value = response.data
  } catch (error) {
    console.log(error)
  }
  waiting.value = false
}

const loadProductsTypes = async (url) => {
  waiting.value = true
  try {
    const response = await axios.get(url || 'products/type')

    productsTypes.value = response.data
  } catch (error) {
    console.log(error)
  }
  waiting.value = false
}

const changeType = (value) => {
  selectedType.value = value
  loadProducts()
}

onMounted(() => {
  loadProductsTypes()
  loadProducts()
})
</script>

<template>
  <!-- ======= Top Bar ======= -->
  <div id="topbar" class="d-flex align-items-center fixed-top">
    <div
      class="container d-flex justify-content-center justify-content-md-between"
    >
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-phone d-flex align-items-center">
          <span>+351 912 345 678</span>
        </i>
        <i class="bi bi-clock d-flex align-items-center ms-4">
          <span>Mon-Sat: 11:00h - 23:00h</span>
        </i>
      </div>

      <div class="languages d-none d-md-flex align-items-center">
        <ul>
          <BaseButtons>
            <BaseButton to="/login" outline label="Login" />
            <BaseButton to="/register" outline label="Register" />
          </BaseButtons>
          <!-- <li><a to="/login">Login</a></li>
          <li><a href="">Register</a></li> -->
        </ul>
      </div>
    </div>
  </div>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-cente">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-lg-between"
    >
      <h1 class="logo me-auto me-lg-0"><a href="index.html">FASTUGA</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li class="book-a-table-btn d-none d-lg-flex">
            Menu Choosing
          </li>
          <li m-0><BaseButton :icon="mdiChevronRight" color="white" /></li>
          <li class="d-none d-lg-flex">
            Finishing Order
          </li>
          <li m-0>
            <BaseButton :icon="mdiChevronRight" color="white" />
          </li>
          <li class="d-none d-lg-flex">
            Status
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
      <a></a>
    </div>
  </header>
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
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
            <div class="col-lg-12 d-flex justify-content-center">
              <ul id="menu-flters">
                <li
                  data-filter="*"
                  :class="{ active: selectedType == 'all' }"
                  @click="changeType('all')"
                >
                  All
                </li>
                <Filter
                  v-for="productType in productsTypes"
                  :p-type="productType.type"
                  @click="changeType(productType.type)"
                  :isActive="productType.type == selectedType"
                />
              </ul>
            </div>
          </div>
          <div
            class="row menu-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Product
              v-for="product in products.data"
              :key="product.id"
              :photo-url="product.photo_url"
              :name="product.name"
              :price="product.price"
              :description="product.description"
              :p-type="product.type"
            />
          </div>
        </div>
      </form>
    </div>
  </section>
  <!-- End Hero -->
</template>
