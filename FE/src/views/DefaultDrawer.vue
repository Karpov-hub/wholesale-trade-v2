<template>
  <q-drawer
    class="nav-drawer"
    :model-value="props.modelValue"
    side="right"
    :behavior="$q.screen.gt.xs ? 'desktop' : 'mobile'"
    bordered
    :mini="miniState"
    mini-to-overlay
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            v-if="menuItem.isShown && !menuItem.isExpansionItem"
            v-ripple
            :active="menuItem.props.to?.name === $route.name"
            clickable
            dense
            v-bind="menuItem.props"
            v-on="menuItem.events"
          >
            <q-item-section avatar style="min-width: 24px">
              <q-icon :name="menuItem.props.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.props.label }}
            </q-item-section>
          </q-item>
          <!-- expand-separator -->
          <q-expansion-item
            v-else-if="menuItem.isShown"
            v-bind="menuItem.props"
            dense
            :class="{ 'q-expansion-item--active': $route.query.category }"
          >
            <template
              v-for="(nestedItem, nestedIndex) in menuItem.nestedItems"
              :key="nestedIndex"
            >
              <q-item
                v-ripple
                style="padding-left: 23px"
                dense
                clickable
                :active="
                  nestedItem.props.to.query.category === $route.query.category
                "
                v-bind="nestedItem.props"
                v-on="nestedItem.events"
              >
                <q-item-section v-if="nestedItem.props.icon" avatar>
                  <q-icon :name="nestedItem.props.icon" />
                </q-item-section>
                <q-item-section>
                  {{ nestedItem.props.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
          <q-separator v-if="menuItem.separator" :key="'sep' + index" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "src/stores/userStore";
import { useCategoriesStore } from "src/stores/categoriesStore";
import { useQuasar } from "quasar";

const $q = useQuasar();

const userStore = useUserStore();
const categoriesStore = useCategoriesStore();

const miniState = ref(true);

onMounted(async () => {
  categoriesStore.fetchCategories();
});

const menuList = computed(() => {
  return [
    {
      props: {
        label: "Войти",
        icon: "signin",
        to: { name: "signin" },
        separator: false,
      },
      events: {},
      isShown: !userStore.isAuthenticated && $q.screen.lt.sm,
    },
    {
      props: {
        label: "Профиль",
        icon: "account_circle",
        to: { name: "profile" },
        separator: true,
      },
      events: {},
      isShown: userStore.isAuthenticated,
      isExpansionItem: false,
    },
    {
      props: {
        label: "Категории",
        icon: "category",
        to: null,
        separator: false,
      },
      events: {},
      isShown: true,
      isExpansionItem: true,
      nestedItems: categoriesStore.categories.map((category) => {
        return {
          description: category.description,
          props: {
            label: category.name,
            icon: null,
            to: { name: "store", query: { category: category.name } },
          },
          events: {},
        };
      }),
    },
    {
      props: {
        label: "Избранное",
        icon: "favorite",
        to: { name: "favorites" },
        separator: true,
      },
      events: {},
      isShown: userStore.isAuthenticated,
    },
    {
      props: {
        label: "Группы",
        icon: "group",
        separator: true,
        to: null,
      },
      events: {},
      isShown: userStore.isAuthenticated,
    },
    {
      props: {
        label: "Помощь",
        icon: "help",
        href: "https://docs.google.com/document/d/1ntaklPB_0pCkKaYZS24sxbrOuqLqcrZhQAQr-UPFCSI/edit#heading=h.5g4m9c10gar6",
        separator: false,
        target: "_blank",
      },
      events: {},
      isShown: true,
    },
    {
      props: {
        label: "Выйти",
        icon: "logout",
        separator: false,
      },
      events: {
        click: async () => {
          userStore.logout();
        },
      },
      isShown: userStore.isAuthenticated,
    },
  ];
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
<style lang="scss" scoped>
:deep(.nav-drawer) {
  .q-list {
    padding: 4px;
  }
  .q-expansion-item--active {
    > .q-expansion-item__container > .q-item {
      color: $primary;
    }
  }
  .q-item {
    letter-spacing: 0.7px;
    border-radius: 10px;
    margin-top: 2px;
    min-height: 30px;
    padding: 0 4px 0 6px;
    transition: none;
  }
  .q-item__section--avatar {
    min-width: 24px;
  }
  .q-expansion-item__content {
    margin-left: 18px;
    padding-left: 4px;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
