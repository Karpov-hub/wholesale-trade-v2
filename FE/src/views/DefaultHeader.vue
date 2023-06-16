<template>
  <q-header reveal bordered class="bg-primary text-dark" height-hint="98">
    <q-toolbar>
      <q-btn
        v-if="$q.screen.lt.sm"
        dense
        flat
        round
        icon="menu"
        @click="toggleLeftDrawer"
      />

      <ToolbarBrandLogo />

      <q-btn
        outline
        rounded
        icon="login"
        label="Signin"
        :to="{ name: 'signin' }"
      />
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/page1" label="Page One" />
      <q-route-tab to="/page2" label="Page Two" />
      <q-route-tab to="/page3" label="Page Three" />
    </q-tabs>
  </q-header>
</template>

<script setup>
import ToolbarBrandLogo from "src/views/ToolbarBrandLogo.vue";

const emit = defineEmits(["openDrawer"]);

function toggleLeftDrawer() {
  emit("openDrawer");
}
</script>
