<template>
  <w-card>
    <q-card-section>
      <div class="row no-wrap">
        <div class="column">
          <q-avatar
            size="40px"
            font-size="30px"
            color="grey"
            text-color="white"
            icon="person"
          />
        </div>
        <div class="column q-ml-md">
          <div>
            <q-rating
              readonly
              :model-value="review.value"
              size="14px"
              :max="5"
              color="primary"
            />
          </div>
          <div>{{ review.comment }}</div>
        </div>
      </div>
    </q-card-section>
  </w-card>
</template>
<script setup>
defineProps({
  review: {
    type: Object,
    required: true,
  },
});
</script>
