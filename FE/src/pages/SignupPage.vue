<template>
  <q-page class="flex flex-center">
    <w-card style="width: 400px">
      <q-card-section class="flex flex-center">
        <div class="text-h5">Регистрация</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-sm" @submit="onSubmit">
          <w-input
            type="text"
            name="firstName"
            placeholder="Иван"
            label="Имя"
          />
          <w-input
            type="text"
            name="lastName"
            placeholder="Иванович"
            label="Фамилия"
          />
          <w-input
            type="text"
            name="middleName"
            placeholder="Иванов (при наличии)"
            label="Отчество"
          />
          <w-input
            type="phone"
            name="phone"
            placeholder="79063001629"
            label="Номер телефона"
          />
          <w-input
            type="password"
            name="password"
            label="Пароль"
            hint="Минимальная длина - 8 символов"
          />
          <div class="flex justify-end">
            <w-btn label="Создать" :loading="isSubmitting" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </w-card>
  </q-page>
</template>

<script setup>
import { useForm } from "vee-validate";
import { signup } from "src/services/userAuthService";

const validationSchema = {
  phone: "required|numeric",
  password: "required|min:8",
  firstName: "required",
  lastName: "required",
  middleName: "",
};

const { handleSubmit, isSubmitting } = useForm({ validationSchema });

const onSubmit = handleSubmit((values) => {
  signup(values);
});
</script>
