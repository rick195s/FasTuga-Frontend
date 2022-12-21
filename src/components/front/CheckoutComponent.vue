<script setup>
import ProductCheckout from "@/components/front/ProductCheckout.vue";
import PaymentMethod from "@/components/front/PaymentMethodForm.vue";
import { ref, watch, onMounted, inject } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const axios = inject("axios");

const router = useRouter();

const props = defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();
const priceProducts = ref(0);
const pointsSelected = ref({ points: 0, priceDiscount: 0 });
const totalPrice = ref(0);
const optionsPoints = ref([]);
const items = ref(props.productsList);

const paymentMethod = ref(null);
const paymentErrors = ref([]);
const errors = ref([]);

const emit = defineEmits(["to-menu-choosing", "add-products-to-menu-choosing"]);

const toMenuChoosing = (event) => {
  emit("to-menu-choosing", event);
  emit("add-products-to-menu-choosing", props.productsList);
};

const sum = () => {
  props.productsList.forEach((product) => {
    priceProducts.value += Number(product.price * product.quantity);
  });
};

const addToOptionsPoints = () => {
  if (!userStore.user) return;

  for (let i = 0; i <= userStore.user.points; i += 10) {
    if (i / 2 < priceProducts.value) {
      optionsPoints.value.push({ text: i, value: i / 2 });
    } else {
      optionsPoints.value.push({
        text: i,
        value: priceProducts.value.toFixed(2),
      });
      break;
    }
  }
};

watch(pointsSelected, () => {
  getTotalPrice();
});

const getTotalPrice = () => {
  if (!userStore.user) {
    totalPrice.value = priceProducts.value.toFixed(2);
    return;
  }
  totalPrice.value =
    priceProducts.value < pointsSelected.value.priceDiscount
      ? 0
      : (priceProducts.value - pointsSelected.value.priceDiscount).toFixed(2);
};

const productNoteChanged = (product, note) => {
  const index = items.value.findIndex((p) => p.product_id === product.id);
  items.value[index].notes = note;
};

const getFinalListCheckout = () => {
  const finalItems = items.value.map((item) => {
    return {
      product_id: item.product_id,
      quantity: item.quantity,
      notes: item.notes,
    };
  });

  return {
    payment_type: paymentMethod.value.selectedMethod,
    payment_reference: paymentMethod.value.paymentData,
    points_used_to_pay: pointsSelected.value.points,
    items: finalItems,
  };
};

const submit = async () => {
  cleanErrors();
  try {
    const response = await axios.post("orders", getFinalListCheckout());
    router.push({ name: "order", params: { id: response.data.data.id } });
  } catch (error) {
    setErrors(error);
  }
};

const cleanErrors = () => {
  paymentErrors.value = [];
  errors.value = [];
};

const setErrors = (error) => {
  errors.value.push(error.response.data.message);

  error.response.data.errors?.points_used_to_pay?.forEach((element) => {
    errors.value.push(element);
  });

  error.response.data.errors?.payment_type?.forEach((element) => {
    paymentErrors.value.push(element);
  });

  error.response.data.errors?.payment_reference?.forEach((element) => {
    paymentErrors.value.push(element);
  });
};

onMounted(async () => {
  sum();
  getTotalPrice();

  if (userStore.user?.type == "C") {
    await userStore.loadUser();
    addToOptionsPoints();
  }
});
</script>

<template>
  <div class="container position-relative text-center text-lg-start">
    <form @submit.prevent="submit">
      <div class="row bgOrder">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Checkout</h2>
            <p>Just one last step</p>
          </div>
        </div>
        <div class="row menu-container">
          <PaymentMethod ref="paymentMethod" :errors="paymentErrors" />
          <div class="col-lg-6">
            <div v-if="errors" role="alert" class="text-rose-500">
              <p v-for="error in errors" :key="error">
                {{ error }}
              </p>
            </div>
            <div class="row checkout-items">
              <ProductCheckout
                v-for="product in productsList"
                :key="product.id"
                :photo="product.photo_url"
                :name="product.name"
                :price="product.price"
                :quantity="product.quantity"
                @product-note="(note) => productNoteChanged(product, note)"
              />
              <hr />

              <div v-if="userStore.user?.type == 'C'" style="display: flex">
                <div class="col-lg-6 checkout-points">
                  <span>Use Points (10 points = 5€):</span>
                </div>
                <div class="col-lg-6 checkout-points text-right">
                  <select v-model="pointsSelected" class="form-select">
                    <option
                      v-for="option in optionsPoints"
                      :key="option"
                      :value="{
                        priceDiscount: option.value,
                        points: option.text,
                      }"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                  <span class="checkout-points-quantity">
                    (out of {{ userStore.user.points }})</span
                  >
                </div>

                <hr class="mt-0" />
              </div>
              <div class="col-lg-6 checkout-total"><span>Total</span></div>
              <div class="col-lg-6 checkout-total text-right">
                <span v-if="pointsSelected.priceDiscount != 0">
                  {{ priceProducts.toFixed(2) }}€ -
                  {{ pointsSelected.priceDiscount }}€ (points) =
                  {{ totalPrice }}€
                </span>
                <span v-else>{{ totalPrice }}€</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <a href="#" class="btn-menu" @click="toMenuChoosing"> Previous </a>
            <button class="btn-menu float-right" type="submit">
              Buy & Finish
            </button>
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
