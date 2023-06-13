<template>
  <q-layout view="hHh lpR lfr">
    <DefaultHeader @open-drawer="openDrawer()" />

    <DefaultDrawer v-model="isDrawerOpened" />

    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DefaultHeader from "src/views/DefaultHeader.vue";
import DefaultDrawer from "src/views/DefaultDrawer.vue";

import { ref } from "vue";

const isDrawerOpened = ref(false);

function openDrawer() {
  isDrawerOpened.value = true;
}
</script>
