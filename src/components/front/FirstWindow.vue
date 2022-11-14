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
          <li data-toggle="modal" data-target="#exampleModalCenter">Login</li>
          <li data-toggle="modal" data-target="#exampleModalCenter">
            Register
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
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">About</a></li>
          <li><a class="nav-link scrollto" href="#menu">Menu</a></li>
          <li><a class="nav-link scrollto" href="#specials">Specials</a></li>
          <li><a class="nav-link scrollto" href="#gallery">Gallery</a></li>
          <li><a class="nav-link scrollto" href="#chefs">Chefs</a></li>

          <!-- <li class="dropdown">
              <a href="#">
                <span>Drop Down</span>
                <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li><a href="#">Drop Down 1</a></li>
                <li class="dropdown">
                  <a href="#">
                    <span>Deep Drop Down</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                  <ul>
                    <li><a href="#">Deep Drop Down 1</a></li>
                    <li><a href="#">Deep Drop Down 2</a></li>
                    <li><a href="#">Deep Drop Down 3</a></li>
                    <li><a href="#">Deep Drop Down 4</a></li>
                    <li><a href="#">Deep Drop Down 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Drop Down 2</a></li>
                <li><a href="#">Drop Down 3</a></li>
                <li><a href="#">Drop Down 4</a></li>
              </ul>
            </li> -->
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
      <a
        href="#book-a-table"
        class="book-a-table-btn scrollto d-none d-lg-flex"
      >
        Book a table
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
      poster="assets/img/hero-bg.jpg"
    >
      <source src="assets/img/promoVideo.mp4" type="video/mp4" />
    </video>
    <div
      class="container position-relative text-center text-lg-start"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <div class="row">
        <div class="col-lg-8 text-left">
          <h1>
            Welcome to
            <span>FASTUGA</span>
          </h1>
          <h2>Delivering great food in great time</h2>

          <div class="btns">
            <a href="#menu" class="btn-menu animated fadeInUp scrollto">
              Our Menu
            </a>
            <a href="#book-a-table" class="btn-book animated fadeInUp scrollto">
              Book a Table
            </a>
          </div>
        </div>
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

<style scoped>
  @import 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';
  @import '../../../assets/css/style.css';
</style>