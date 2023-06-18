<template>
  <q-layout view="lHr lpr lfr">
    <DefaultHeader @open-drawer="openDrawer()" />

    <DefaultDrawer v-model="isDrawerOpened" />

    <q-page-container class="full-height page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DefaultHeader from "src/views/DefaultHeader.vue";
import DefaultDrawer from "src/views/DefaultDrawer.vue";

import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const isDrawerOpenedMobile = ref(false);

watch(
  () => {
    return $q.screen.gt.xs;
  },
  () => {
    isDrawerOpenedMobile.value = false;
  }
);

const isDrawerOpened = computed({
  get: () => {
    return isDrawerOpenedMobile.value || $q.screen.gt.xs;
  },
  set: (newValue) => {
    isDrawerOpenedMobile.value = newValue;
  },
});

function openDrawer() {
  isDrawerOpenedMobile.value = true;
}
</script>
<style lang="scss" scoped>
.page-container {
  :deep(.q-page) {
    padding: 12px;
  }
}
</style>
