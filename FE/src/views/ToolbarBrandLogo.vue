<template>
  <q-toolbar-title
    class="flex align-end cursor-pointer non-selectable col-shrink q-mr-auto"
    @click="$router.push({ name: 'store' })"
  >
    <q-avatar size="md">
      <img :src="getAsset('svg/logo.svg')" alt="whosale brand logo" />
    </q-avatar>
    <span style="margin-left: 2px; margin-top: 2px"> hoSale! </span>
  </q-toolbar-title>
</template>

<script setup>
import { getAsset } from "src/helpers/staticAssetsHandler";
</script>
