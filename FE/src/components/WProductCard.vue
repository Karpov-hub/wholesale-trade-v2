<template>
  <w-card class="my-card" flat bordered>
    <q-card-section>
      <router-link to="/">
        <q-img
          :ratio="3 / 4"
          :src="modelValue.image[0]"
          loading="lazy"
          class="cursor-pointer"
        >
          <template #loading>
            <div
              class="bg-white full-width full-height flex justify-center items-center"
            >
              <q-spinner-grid color="primary" />
            </div>
          </template>
        </q-img>
      </router-link>
      <div class="text-subtitle1 full-width">{{ `${modelValue.price} ₽` }}</div>
      <div class="text-medium q-mb-xs text-caption cutoff-text">
        {{ modelValue.name }}
      </div>
      <div class="row items-center q-gutter-xs justify-end">
        <q-rating
          readonly
          :model-value="modelValue.rating"
          size="14px"
          :max="5"
          color="primary"
        />
        <span class="text-caption text-grey">
          {{ `${modelValue.rating} (${modelValue.reviews.length})` }}
        </span>
      </div>
    </q-card-section>
  </w-card>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.cutoff-text {
  --max-lines: 2;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--max-lines);
}
</style>
