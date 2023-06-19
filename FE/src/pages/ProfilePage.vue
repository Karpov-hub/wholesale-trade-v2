<template>
  <q-page class="row q-col-gutter-md">
    <div class="col-xs-12 col-sm-6">
      <w-card>
        <q-card-section class="flex flex-center">
          <div class="text-h5">Профиль</div>
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
            <div class="flex justify-end">
              <w-btn label="Обновить" :loading="isSubmitting" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </w-card>
    </div>
    <div class="col-xs-12 col-sm-6">
      <ChangePassword />
    </div>
  </q-page>
</template>
<script setup>
import { useUserStore } from "src/stores/userStore";
import ChangePassword from "src/views/ChangePassword.vue";
import { useForm } from "vee-validate";
import { updateUser } from "src/services/userProfileService";

const userStore = useUserStore();

const validationSchema = {
  phone: "required|numeric",
  firstName: "required",
  lastName: "required",
  middleName: "",
};

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    phone: userStore.profile.phone,
    firstName: userStore.profile.firstName,
    lastName: userStore.profile.lastName,
    middleName: userStore.profile.middleName,
  },
});

const onSubmit = handleSubmit((values) => {
  updateUser({ ...values, deliveryAddress: userStore.profile.deliveryAddress });
});
</script>
