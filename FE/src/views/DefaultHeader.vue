<template>
  <q-header reveal bordered class="bg-secondary text-dark" height-hint="98">
    <q-toolbar>
      <ToolbarBrandLogo />

      <WBtn
        v-if="$q.screen.gt.xs && !userStore.isAuthenticated"
        :to="{ name: 'signin' }"
      >
        <q-icon class="q-mr-sm" size="xs" name="login" />
        <span>Вход</span>
      </WBtn>

      <q-btn
        v-if="$q.screen.lt.sm"
        dense
        flat
        round
        icon="menu"
        @click="toggleRightDrawer"
      />
    </q-toolbar>

    <!-- <q-tabs align="left">
      <q-route-tab to="/page1" label="Page One" />
      <q-route-tab to="/page2" label="Page Two" />
      <q-route-tab to="/page3" label="Page Three" />
    </q-tabs> -->
  </q-header>
</template>

<script setup>
import ToolbarBrandLogo from "src/views/ToolbarBrandLogo.vue";
import { useUserStore } from "src/stores/userStore";

const emit = defineEmits(["openDrawer"]);

const userStore = useUserStore();

function toggleRightDrawer() {
  emit("openDrawer");
}
</script>
