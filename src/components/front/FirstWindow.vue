<style scoped>
  @import '@/../src/assets/css/style.css';
  @import "@/../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>

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
          <li data-toggle="modal" data-target="#exampleModalCenter"><a href="">Login</a></li>
          <li data-toggle="modal" data-target="#exampleModalCenter">
            <a href="">Register</a>
          </li>
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
          <li><fa icon="chevron-right" /></li>
          <li class="d-none d-lg-flex">
            Finishing Order
          </li>
          <li><fa icon="chevron-right" /></li>
          <li class="d-none d-lg-flex">
            Status
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
      <a
        
      >
        
      </a>
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
      <div class="row bgOrder">
          <div class="col-lg-6">
            <h2> MENU </h2>
          </div>
          <div class="col-lg-6 text-right">
            <a href="#menu" class="btn-menu animated fadeInUp scrollto">
              Next (5)
            </a>
          </div>
          <div class="col-lg-2"><h5>Filter:</h5></div>
          <div class="col-lg-10 text-left"><h5>Food</h5><h5>Drinks</h5><h5>Hot</h5><h5>Dessert</h5></div>
          
          
          
        <div
          class="col-lg-4 d-flex align-items-center justify-content-center position-relative"
          data-aos="zoom-in"
          data-aos-delay="200"
        ></div>
      </div>
    </div>
  </section>
  <!-- End Hero -->
</template>

