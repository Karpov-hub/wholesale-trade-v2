<template>
  <q-layout view="hHr lpR fFr">
    <q-header elevated class="q-pa-sm bg-blue-grey-10 text-white">
      <div class="container row justify-between items-center">
        <div class="col-4 row items-center q-gutter-sm">
          <!-- <div class="col-4 row justify-end">
            <q-btn
              @click="showSidebarLeft"
              size="20px"
              flat
              icon="menu"
              label="Категории"
            />
          </div> -->
          <q-avatar :size="$q.screen.gt.sm ? '75px' : '50px'">
            <img src="../assets/img/logo.webp" />
          </q-avatar>
          <div v-if="$q.screen.gt.sm" class="text-h4 text-weight-thin">
            Share Mart
          </div>
        </div>
        <q-input
          v-if="$q.screen.gt.sm"
          v-model="search"
          class="col-4"
          clear-icon="close"
          label="Введите название товара"
          color="white"
          type="search"
          borderless
          dark
          outlined
          rounded
          clearable
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="col-4 row justify-end">
          <q-btn
            size="20px"
            flat
            label="Панель управления"
            icon-right="menu"
            @click="isShownSidebar = true"
          />
        </div>
        <q-input
          v-if="$q.screen.lt.md"
          v-model="search"
          class="col-grow"
          clear-icon="close"
          label="Введите название товара"
          color="white"
          type="search"
          borderless
          dark
          outlined
          rounded
          clearable
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-header>
    <q-drawer
      v-model="isShownSidebar"
      behavior="mobile"
      overlay
      side="right"
      elevated
    >
      <div class="full-height column">
        <div
          class="q-py-lg q-px-md row justify-between items-center"
          style="background-color: rgba(0, 0, 0, 0.5)"
        >
          <div class="text-white text-h5">Панель управления</div>
          <q-btn
            icon="close"
            color="white"
            round
            flat
            @click="isShownSidebar = false"
          ></q-btn>
        </div>
        <div
          v-if="isAuthorized"
          class="q-px-md q-py-md row justify-between items-center"
        >
          <q-avatar size="75px" color="white"
            ><img src="../assets/img/placeholder.png"
          /></q-avatar>
          <div class="text-h5 text-white">
            {{ state.user.middle_name }} {{ state.user.first_name }}
            {{ state.user.last_name }}
          </div>
        </div>
        <q-separator color="blue"></q-separator>
        <div class="col-grow column justify-between">
          <div class="column">
            <q-btn
              class="q-py-md"
              label="Группы"
              icon="group"
              flat
              unelevated
              color="blue"
              @click="router.push({ name: 'groups' })"
            />
            <q-btn
              class="q-py-md"
              icon="chat"
              label="Чаты"
              flat
              unelevated
              color="blue"
              @click="router.push({ name: 'chat' })"
            />
          </div>
          <div class="column">
            <q-btn
              class="q-py-md"
              label="Settings"
              flat
              icon="settings"
              unelevated
              color="blue"
            />
            <q-btn
              class="q-py-md"
              label="Support"
              flat
              icon="help"
              unelevated
              color="blue"
            />
            <q-btn
              v-if="!isAuthorized"
              class="q-py-md"
              icon="login"
              label="Войти"
              unelevated
              color="blue"
              @click="isShownModalAuth = true"
            />
            <q-btn
              v-if="isAuthorized"
              class="q-py-md"
              icon="logout"
              label="Выйти"
              unelevated
              color="blue"
              @click="doLogout"
            />
          </div>
        </div>
      </div>
    </q-drawer>
    <!-- <q-drawer
      v-model="isShownSidebarLeft"
      behavior="mobile"
      overlay
      side="left"
      elevated
    >
      <div class="full-height column">
        <div
          class="q-py-lg q-px-md row justify-between items-center"
          style="background-color: rgba(0, 0, 0, 0.5)"
        >
          <div class="text-white text-h4">Категории</div>
          <q-btn
            @click="isShownSidebarLeft = false"
            icon="close"
            color="white"
            round
            flat
          ></q-btn>
        </div>
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Футболка' } })
          "
          >Футболка</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Джинсы' } })
          "
          >Джинсы</q-btn
        >
        <q-btn
          @click="
            router.push({
              name: 'products',
              query: { category: 'Сумка-кроссбоди' },
            })
          "
          >Сумка-кроссбоди</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Браслет' } })
          "
          >Браслет</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Смартфон' } })
          "
          >Смартфон</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Наушники' } })
          "
          >Наушники</q-btn
        >
        <q-btn
          @click="
            router.push({
              name: 'products',
              query: { category: 'Настольная лампа' },
            })
          "
          >Настольная лампа</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Подушка' } })
          "
          >Подушка</q-btn
        >
        <q-btn
          @click="
            router.push({
              name: 'products',
              query: { category: 'Футбольный мяч' },
            })
          "
          >Футбольный мяч</q-btn
        >
        <q-btn
          @click="
            router.push({ name: 'products', query: { category: 'Гантели' } })
          "
          >Гантели</q-btn
        >
      </div>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="container">Это подвал сайта</div>
    </q-footer>

    <q-dialog
      v-model="isShownModalAuth"
      :maximized="$q.screen.lt.sm"
      :full-width="$q.screen.lt.sm"
    >
      <q-card style="width: 500px">
        <q-tabs
          v-model="tab"
          class="bg-grey-3 text-primary shadow-2"
          dense
          align="justify"
          :breakpoint="0"
        >
          <q-tab name="tabSignin" label="Авторизация" />
          <q-tab name="tabSignup" label="Регистрация" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-tab-panel name="tabSignin"
            ><div class="q-pa-lg column items-center justify-center">
              <div class="q-pb-lg full-width flex justify-center items-center">
                <div class="text-h5">Авторизация</div>
              </div>
              <div class="q-gutter-md full-width column justify-center">
                <q-input
                  v-model="state.phone"
                  filled
                  clearable
                  outlined
                  mask="# (###) ### ## ##"
                  unmasked-value
                  label="Телефон"
                ></q-input>
                <q-input
                  v-model="state.password"
                  filled
                  clearable
                  label="Пароль"
                  :type="isPwdVisible ? 'password' : 'text'"
                >
                  <template #append>
                    <q-icon
                      :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdVisible = !isPwdVisible"
                    />
                  </template>
                </q-input>
              </div>
              <div class="q-pt-xl row full-width justify-between">
                <q-btn
                  class="col-5 q-ml-md"
                  color
                  rounded
                  outline
                  @click="isShownModalAuth = false"
                  >Отменить</q-btn
                ><q-btn class="col-5" color="green" rounded @click="doSignin"
                  >Подтвердить</q-btn
                >
              </div>
            </div></q-tab-panel
          >
          <q-tab-panel name="tabSignup">
            <div class="q-pa-lg column items-center justify-center">
              <div class="q-pb-lg full-width flex justify-center items-center">
                <div class="text-h5">Регистрация</div>
              </div>
              <div class="q-gutter-md full-width column justify-center">
                <q-input
                  v-model="state.surename"
                  filled
                  clearable
                  outlined
                  label="Фамилия"
                ></q-input>
                <q-input
                  v-model="state.name"
                  filled
                  clearable
                  outlined
                  label="Имя"
                ></q-input>
                <q-input
                  v-model="state.lastname"
                  filled
                  clearable
                  outlined
                  label="Отчество"
                ></q-input>
                <q-input
                  v-model="state.phone"
                  filled
                  clearable
                  outlined
                  mask="# (###) ### ## ##"
                  unmasked-value
                  label="Телефон"
                ></q-input>
                <q-input
                  v-model="state.password"
                  filled
                  clearable
                  label="Пароль"
                  :type="isPwdVisible ? 'password' : 'text'"
                >
                  <template #append>
                    <q-icon
                      :name="isPwdVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdVisible = !isPwdVisible"
                    />
                  </template>
                </q-input>
              </div>
              <div class="q-pt-xl row full-width justify-between">
                <q-btn
                  class="col-5 q-ml-md"
                  color
                  rounded
                  outline
                  @click="isShownModalAuth = false"
                  >Отменить</q-btn
                ><q-btn class="col-5" color="green" rounded @click="doSignup"
                  >Подтвердить</q-btn
                >
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { reactive, ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Loading, Notify, useQuasar } from "quasar";
import { signin, signup, logout } from "src/services/service-auth";
import { getData } from "src/services/service-profile";
import { useStoreCart } from "src/stores/storeCart";
import {
  addProductShoppingCartList,
  // deleteProductShoppingCartList,
  // getProductShoppingCartList,
} from "src/services/service-choppingCart";
// import { getCategories } from "src/services/service-category";

const $q = useQuasar();
const router = useRouter();
// const route = useRoute();

const storeCart = useStoreCart();
provide("storeCart", storeCart);

const tab = ref("tabSignin");

const isShownSidebar = ref(false);
// const isShownSidebarLeft = ref(false);
const isShownModalAuth = ref(false);
// const isShownModalProfile = ref(false);
// const isShownModalCart = ref(false);
const isAuthorized = ref(false);
const isPwdVisible = ref(true);

const state = reactive({
  name: "",
  surename: "",
  lastname: "",
  phone: "",
  password: "",
  filters: {
    search: "",
  },
  cart: {},
  user: {
    delivery_address: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
  },
});

onMounted(async () => {
  if (!localStorage.getItem("token")) {
    localStorage.setItem("token", "");
    return;
  }
  if (localStorage.getItem("token") == "") return;
  Loading.show();
  const res = await getData({ session_token: localStorage.getItem("token") });
  if (!res.success) {
    localStorage.setItem("token", "");
    router.push({ name: "main" });
    return;
  }
  state.user = res.data;
  isAuthorized.value = res.success;
  Loading.hide();

  setInterval(async () => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "");
      return;
    }
    if (localStorage.getItem("token") == "") return;
    Loading.show();
    const res = await getData({ session_token: localStorage.getItem("token") });
    if (!res.success) {
      localStorage.setItem("token", "");
      router.push({ name: "main" });
      return;
    }
    state.user = res.data;
    isAuthorized.value = res.success;
    Loading.hide();
  }, 10000);
});

// function orderProducts() {
//   router.push({ name: "order" });
// }
// async function searchProducts() {
//   router.replace({ name: "products", query: { name: state.filters.search } });
//   state.filters.search = "";
// }
// async function showModalProfile() {
//   Loading.show();
//   const res = await getData({ session_token: localStorage.getItem("token") });
//   if (res.success) {
//     state.user = res.data;
//     state.userEdited = res.data;
//     isShownModalProfile.value = true;
//   } else {
//     Notify.create({
//       message: "Произошла ошибка",
//       icon: "error",
//       color: "negative",
//       position: "bottom",
//     });
//   }
//   Loading.hide();
// }
// function closeModalCart() {
//   isShownModalCart.value = false;
//   state.cart = [];
// }
// async function showModalCart() {
//   Loading.show;
//   const resp = await getData({ session_token: localStorage.getItem("token") });
//   if (!resp.success) {
//     state.cart = storeCart.getProducts();
//     Loading.show;
//     isShownModalCart.value = true;
//     return;
//   }
//   const res = await getProductShoppingCartList({
//     session_token: localStorage.getItem("token"),
//     start: 0,
//   });
//   if (!res.success) {
//     Notify.create({
//       message: "Произошла ошибка",
//       icon: "error",
//       color: "negative",
//       position: "bottom",
//     });
//   }
//   state.cart = res;
//   isShownModalCart.value = true;
// }
// async function removeProductFromCart(product) {
//   Loading.show();

//   storeCart.removeProduct(product);

//   if (localStorage.getItem("token") == "") {
//     Loading.hide();
//     return;
//   }

//   await deleteProductShoppingCartList({
//     session_token: localStorage.getItem("token"),
//     id_prod: product.id,
//   });

//   const res2 = await getProductShoppingCartList({
//     session_token: localStorage.getItem("token"),
//     start: 0,
//   });
//   state.cart.rows = res2.rows;
//   Loading.hide();
// }
async function doSignin() {
  const data = {
    phone: state.phone,
    password: state.password,
  };
  Loading.show();
  const res = await signin(data);
  if (res.success) {
    Notify.create({
      message: "Добро пожаловать!",
      icon: "check",
      color: "positive",
      position: "bottom",
    });
    const res2 = await getData({ session_token: res.session_token });
    state.user = res2.data;
    localStorage.setItem("token", res.session_token);
    const cartProducts = storeCart.getProducts();
    if (cartProducts.rows.length > 0) {
      for (const product of cartProducts.rows) {
        await addProductShoppingCartList({
          session_token: localStorage.getItem("token"),
          id_prod: product.id,
          quantity: product.product_quantity,
        });
      }
    }
    isAuthorized.value = true;
    isShownModalAuth.value = false;
    state.name = "";
    state.lastname = "";
    state.surename = "";
    state.password = "";
    state.phone = "";
  } else {
    Notify.create({
      message: "Произошла ошибка! Проверьте правильность введённых данных",
      icon: "error",
      color: "negative",
      position: "bottom",
    });
  }
  Loading.hide();
}
async function doSignup() {
  const data = {
    first_name: state.name,
    last_name: state.surename,
    middle_name: state.lastname,
    phone: state.phone,
    password: state.password,
  };
  Loading.show();
  const res = await signup(data);
  if (res.success) {
    Notify.create({
      message: "Аккаунт создан",
      icon: "check",
      color: "positive",
      position: "bottom",
    });
    state.name = "";
    state.lastname = "";
    state.surename = "";
    state.password = "";
    state.phone = "";
    tab.value = "tabSignin";
  } else {
    Notify.create({
      message: "Произошла ошибка!",
      icon: "error",
      color: "negative",
      position: "bottom",
    });
  }
  Loading.hide();
}
async function doLogout() {
  Loading.show();
  const res = await logout({
    session_token: localStorage.getItem("token"),
  });
  if (res.success) {
    localStorage.setItem("token", "");
    storeCart.clearCart();
    isAuthorized.value = false;
    state.user = {};
  } else {
    Notify.create({
      message: "Произошла ошибка!",
      icon: "error",
      color: "negative",
      position: "bottom",
    });
  }
  router.push({ name: "products" });
  Loading.hide();
}
// async function showSidebarLeft() {
//   isShownSidebarLeft.value = true;

//   const res = await getCategories();
// }
// function showModalAuth() {
//   isShownModalAuth.value = true;
// }
</script>

<style>
.q-header {
  background-color: #21d4fd !important;
  background-image: linear-gradient(
    225deg,
    rgb(0, 5, 142) 0%,
    rgba(56, 0, 88, 1) 100%
  ) !important;
}
.q-drawer {
  background: transparent;
  background: linear-gradient(
    45deg,
    rgba(0, 5, 142, 0.5) 0%,
    rgba(56, 0, 88, 0.5) 100%
  ) !important;
  backdrop-filter: blur(10px);
}
.q-drawer__backdrop {
  backdrop-filter: blur(1px);
}
.fixed-full {
  backdrop-filter: blur(3px);
}
</style>
