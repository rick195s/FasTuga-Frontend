<style scoped>
@import '@/../src/assets/css/style.css';
@import 'bootstrap/dist/css/bootstrap.min.css';
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
          <li><a href="">Login</a></li>
          <li><a href="">Register</a></li>
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
                <li data-filter="*" class="filter-active">All</li>
                <li data-filter=".filter-starters">Starters</li>
                <li data-filter=".filter-salads">Salads</li>
                <li data-filter=".filter-specialty">Specialty</li>
              </ul>
            </div>
          </div>

          <div
            class="row menu-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="col-lg-6 menu-item filter-starters">
              <img
                src="assets/img/menu/lobster-bisque.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Lobster Bisque</a>
                <span>$5.95</span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="5"
                />
              </div>
              <div class="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-specialty">
              <img
                src="assets/img/menu/bread-barrel.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Bread Barrel</a>
                <span>$6.95</span>
              </div>
              <div class="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-starters">
              <img src="assets/img/menu/cake.jpg" class="menu-img" alt="" />
              <div class="menu-content">
                <a href="#">Crab Cake</a>
                <span>$7.95</span>
              </div>
              <div class="menu-ingredients">
                A delicate crab cake served on a toasted roll with lettuce and
                tartar sauce
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-salads">
              <img src="assets/img/menu/caesar.jpg" class="menu-img" alt="" />
              <div class="menu-content">
                <a href="#">Caesar Selections</a>
                <span>$8.95</span>
              </div>
              <div class="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-specialty">
              <img
                src="assets/img/menu/tuscan-grilled.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Tuscan Grilled</a>
                <span>$9.95</span>
              </div>
              <div class="menu-ingredients">
                Grilled chicken with provolone, artichoke hearts, and roasted
                red pesto
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-starters">
              <img
                src="assets/img/menu/mozzarella.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Mozzarella Stick</a>
                <span>$4.95</span>
              </div>
              <div class="menu-ingredients">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-salads">
              <img
                src="assets/img/menu/greek-salad.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Greek Salad</a>
                <span>$9.95</span>
              </div>
              <div class="menu-ingredients">
                Fresh spinach, crisp romaine, tomatoes, and Greek olives
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-salads">
              <img
                src="assets/img/menu/spinach-salad.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Spinach Salad</a>
                <span>$9.95</span>
              </div>
              <div class="menu-ingredients">
                Fresh spinach with mushrooms, hard boiled egg, and warm bacon
                vinaigrette
              </div>
            </div>

            <div class="col-lg-6 menu-item filter-specialty">
              <img
                src="assets/img/menu/lobster-roll.jpg"
                class="menu-img"
                alt=""
              />
              <div class="menu-content">
                <a href="#">Lobster Roll</a>
                <span>$12.95</span>
              </div>
              <div class="menu-ingredients">
                Plump lobster meat, mayo and crisp lettuce on a toasted bulky
                roll
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <label for="vehicle1">I have a bike</label>
            <div class="menuInput">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="5"
              />
            </div>
            <br />
            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
            <label for="vehicle2">I have a car</label>
            <br />
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
            <label for="vehicle3">I have a boat</label>
            <br />
          </div>
          <div class="col-lg-6">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1">I have a bike</label>
            <br />
            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
            <label for="vehicle2">I have a car</label>
            <br />
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
            <label for="vehicle3">I have a boat</label>
            <br />
          </div>
        </div>
      </form>
    </div>
  </section>
  <!-- End Hero -->
</template>
