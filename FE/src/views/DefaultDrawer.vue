<template>
  <q-drawer
    v-if="$q.screen.lt.sm"
    :model-value="props.modelValue"
    side="left"
    behavior="mobile"
    bordered
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="flex flex-center">drawer content</div>
  </q-drawer>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
