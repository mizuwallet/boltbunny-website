<template>
  <div
    ref="sidebar"
    class="sidebar"
    :class="{
      collapsed: collapsed,
    }"
  >
    <div class="flex-col gap-4">
      <span
        class="text-lg font-bold flex justify-between items-center w-full h-7"
        :class="{
          '!justify-center': collapsed,
        }"
      >
        <span v-if="!collapsed">Dashboard</span>

        <font-awesome-icon
          icon="fa-solid fa-bars"
          class="cursor-pointer"
          @click="emits('update:collapsed', !collapsed)"
        />
      </span>
      <nav
        class="flex flex-col gap-2"
        :class="{
          collapsed: collapsed,
        }"
      >
        <component
          :is="navItem.path.startsWith('http') ? 'a' : 'router-link'"
          :to="navItem.path"
          :href="navItem.path"
          :target="navItem.path.startsWith('http') ? '_blank' : '_self'"
          v-for="(navItem, index) in DASHBOARD_NAV"
          :key="index"
          :class="{
            active:
              (route.meta.parent === navItem.key && navItem.key) || route.path === navItem.path,
          }"
          @click="emits('nav-click', navItem)"
        >
          <font-awesome-icon :icon="navItem.icon" class="max-w-4 w-4"></font-awesome-icon>
          <span>{{ navItem.label }}</span>
        </component>
      </nav>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 p-4 border-t-1 border-t-text/10 border-t-solid cursor-pointer hover:bg-text/5 tranistion-all"
      @click="emits('update:collapsed', !collapsed)"
    >
      <div class="flex w-full gap-2 items-center overflow-hidden" v-if="!collapsed">
        <font-awesome-icon icon="fa-solid fa-angles-left"></font-awesome-icon>
        Collapse Sidebar
      </div>
      <div class="flex w-full gap-2 items-center" v-else>
        <font-awesome-icon icon="fa-solid fa-angles-right"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DASHBOARD_NAV } from '@/config';

  defineProps<{
    collapsed: boolean;
  }>();
  const route = useRoute();
  const emits = defineEmits(['update:collapsed', 'nav-click']);
  const sidebar = ref();
</script>

<style lang="less" scoped>
  .sidebar {
    @apply max-w-240px w-full shadow-2xl p-4 min-h-screen max-h-screen transition-all;
    @apply bg-[#12141E] relative border-r-1 border-r-solid border-r-primary/15;

    &.collapsed {
      @apply w-15 px-2;
    }
  }

  nav {
    a {
      @apply p-2 rounded-2 cursor-pointer text-md flex items-center;
      @apply gap-2 font-medium;

      &:hover,
      &.active,
      &.active {
        @apply bg-primary/20 text-primary;
      }
    }

    &.collapsed {
      a {
        @apply justify-center;

        & > span {
          @apply hidden;
        }
      }
    }
  }
</style>

