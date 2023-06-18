<template>
  <q-btn color="primary" v-bind="$attrs">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot v-if="slotProps" :name="slotName" v-bind="slotProps" />
      <slot v-else :name="slotName" />
    </template>
  </q-btn>
</template>
