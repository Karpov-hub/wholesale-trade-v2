<template>
  <w-card>
    <q-card-section>
      <q-form class="q-gutter-sm" @submit="onSubmit">
        <w-input
          type="password"
          name="password"
          label="Пароль"
          hint="Минимальная длина - 8 символов"
        />
        <div class="flex justify-end">
          <w-btn label="Сменить пароль" :loading="isSubmitting" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </w-card>
</template>
<script setup>
import { useForm } from "vee-validate";
import { updateUserPassword } from "src/services/userProfileService";

const validationSchema = {
  password: "required|min:8",
};

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit((values) => {
  updateUserPassword(values.password);
});
</script>
