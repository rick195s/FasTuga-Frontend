<template>
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
