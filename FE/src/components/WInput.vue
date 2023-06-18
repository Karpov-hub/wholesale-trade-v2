<template>
  <q-input
    :model-value="value"
    outlined
    :error-message="errorMessage"
    :error="!!errorMessage"
    v-bind="$attrs"
    v-on="validationListeners"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
      <slot v-else :name="slotName" />
    </template>
  </q-input>
</template>
<script setup>
import { toRef, computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { handleChange, errorMessage, value } = useField(
  toRef(props, "name"),
  null,
  { validateOnValueUpdate: false }
);

const validationListeners = computed(() => {
  // If the field is valid or have not been validated yet
  // lazy
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      // disable `shouldValidate` to avoid validating on input
      "update:modelValue": (e) => {
        return handleChange(e, false);
      },
    };
  }
  // Aggressive
  return {
    blur: handleChange,
    change: handleChange,
    "update:modelValue": handleChange, // only switched this
  };
});
</script>
