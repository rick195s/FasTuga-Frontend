<script setup>
import ProductCheckout from "@/components/front/ProductCheckout.vue";
import PaymentMethod from "@/components/front/PaymentMethodForm.vue";
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();
const checkedMethod = ref("visa");
const PriceProducts = ref(0);
const pointsSelected = ref(0);
const totalPrice = ref(0);
const optionsPoints = ref([]);
const items = ref(props.productsList);
const paymentReference = ref(null);
const paymentMethod = ref(null);

const emit = defineEmits(["to-menu-choosing", "add-products-to-menu-choosing"]);

const toMenuChoosing = (event) => {
  emit("to-menu-choosing", event);
  emit("add-products-to-menu-choosing", props.productsList);
};

const sum = () => {
  props.productsList.forEach((product) => {
    PriceProducts.value += Number(product.price * product.quantity);
  });
};

const addToOptionsPoints = () => {
  if (!userStore.user) return;

    for (let i = 0; i <= userStore.user.points; i += 10) {
      if(i/2 < PriceProducts.value){
        optionsPoints.value.push({ text: i, value: i / 2 });
      }else{
        optionsPoints.value.push({ text: i, value: (PriceProducts.value).toFixed(2) });
        break;
      }
    }
};

watch(pointsSelected, (newValue) => {
  pointsSelected.value = newValue;
  getTotalPrice();
});

const getTotalPrice = () => {
  if(!userStore.user){
    totalPrice.value=PriceProducts.value.toFixed(2);
    return
  }
  if(PriceProducts.value<pointsSelected.value)
  totalPrice.value=0;
  else 
  totalPrice.value=(PriceProducts.value-pointsSelected.value).toFixed(2)
};

const productNoteChanged = (product, note) => {
  const index = items.value.findIndex(
    (p) => p.product_id === product.id
  );
    index == -1
      ? items.value.push({
          note: note,
          product_id: product.id,
          ...product,
        })
      : (items.value[index].note = note);
};

const finalList = ref([]);

const finalListCheckout = () => {
  paymentReference.value = paymentMethod.value.paymentData;

  items.value.map((item) => {
    delete item.name;
    delete item.price;
    delete item.description;
    delete item.photo_url;
    delete item.type;
    delete item.id;
  });

  finalList.value.push({
    payment_type: checkedMethod.value,
    payment_reference: paymentReference.value,
    points_used_to_pay: pointsSelected.value*2,
  },{
    items: items.value
  }
  );
}

const submit = async () => {
  try {
    const response = await store.makeOrder(finalList.value);
    if (response.status !== 201) {
      alert(response);
      throw response;
    }
    //router.push({ name: "home" });
  } catch (error) {
    //setError(error);
  }
};

onMounted(() => {
  sum();
  addToOptionsPoints();
  getTotalPrice();
});
</script>

<template>
  <div class="container position-relative text-center text-lg-start">
    <form>
      <div class="row bgOrder">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Checkout</h2>
            <p>Just one last step</p>
          </div>
        </div>
        <div class="row menu-container">
          <div class="col-lg-6">
            <div class="row bgOrder">
              <div class="col-lg-12">
                <div class="section-payment">
                  <h2>Payment</h2>
                  <p>Choose your Payment method</p>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="visa"
                      checked
                    />
                    <img
                      src="src/assets/img/visa.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="paypal"
                    />
                    <img
                      src="src/assets/img/paypal.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      v-model="checkedMethod"
                      class="form-check-input"
                      type="radio"
                      value="mbway"
                    />
                    <img
                      src="src/assets/img/mbway.png"
                      alt="visa"
                      class="payment-img"
                    />
                  </div>
                  <PaymentMethod 
                    :method="checkedMethod"
                    ref="paymentMethod"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row checkout-items">
              <ProductCheckout
                v-for="product in productsList"
                :key="product.id"
                :photo="product.photo_url"
                :name="product.name"
                :price="product.price"
                :quantity="product.quantity"
                @product-note="
              (note) => productNoteChanged(product, note)
            "
              />
              <hr />
              <div v-if="userStore.user" class="col-lg-6 checkout-points">
                <span>Use Points (10 points = 5€):</span>
              </div>
              <div v-if="userStore.user" class="col-lg-6 checkout-points text-right">
                <select class="form-select" v-model="pointsSelected">
                  <option v-for="option in optionsPoints" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <span class="checkout-points-quantity"> (out of {{ userStore.user.points }})</span>
              </div>
              <hr v-if="userStore.user" class="mt-0" />
              <div class="col-lg-6 checkout-total"><span>Total</span></div>
              <div class="col-lg-6 checkout-total text-right">
                <span v-if="pointsSelected!=0">
                  {{ PriceProducts.toFixed(2) }}€ - {{ pointsSelected }}€ (points) = {{ totalPrice }}€
                </span>
                <span v-else>{{ totalPrice }}€</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <a href="#" class="btn-menu" @click="toMenuChoosing"> Previous </a>
            <button @click="finalListCheckout(); submit();" class="btn-menu float-right"> Buy & Finish </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- End Hero -->
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
