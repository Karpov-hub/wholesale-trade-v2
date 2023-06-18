<template>
  <q-page class="flex flex-center">
    <w-card style="width: 400px">
      <q-card-section class="flex flex-center">
        <div class="text-h5">Вход</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-sm" @submit="onSubmit">
          <w-input
            type="phone"
            name="phone"
            placeholder="79063001629"
            label="Номер телефона"
          />
          <w-input type="password" name="password" label="Пароль" />
          <div class="flex justify-end items-center">
            <router-link class="q-mr-auto" :to="{ name: 'signup' }">
              Создать аккаунт
            </router-link>
            <w-btn
              label="Войти"
              :loading="isSubmitting"
              type="submit"
              icon="login"
            />
          </div>
        </q-form>
      </q-card-section>
    </w-card>
  </q-page>
</template>

<script setup>
import { useForm } from "vee-validate";
import { signin } from "src/services/userAuthService";
import { signin as signinAdmin } from "src/services/authService";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "src/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const validationSchema = {
  phone: "required",
  password: "required",
};

const { handleSubmit, isSubmitting } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  // send data to server

  if (route.name === "signinAdmin") {
    await signinAdmin(values);
    // FIXME: admin login no more required
  } else {
    const response = await signin(values);

    if (!response.success) {
      return;
    }

    localStorage.setItem("sessionToken", response.sessionToken);
    userStore.isAuthenticated = true;

    router.push({ name: "store" });
  }
});
</script>
