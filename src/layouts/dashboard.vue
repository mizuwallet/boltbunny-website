<template>
  <div class="min-h-screen max-h-screen w-full flex gap-2">
    <SideBar
      v-model:collapsed="collapsed"
      @nav-click="navClickHandler"
      :class="{ '!fixed z-1': appStore.mobileSet }"
    />
    <div
      class="overflow-y-scroll max-h-screen min-h-screen w-full px-4 py-5"
      :class="{
        '!ml-15': appStore.mobileSet,
      }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ACCESS_TOKEN_LS } from '@/config';
  import useAppStore from '@/store/AppStore';

  const collapsed = ref(false);
  const appStore = useAppStore();
  const router = useRouter();

  const navClickHandler = () => {
    if (appStore.mobileSet) {
      collapsed.value = true;
    }
  };

  onMounted(() => {
    if (!window.localStorage.getItem(ACCESS_TOKEN_LS)) {
      router.replace('/');
      // sign message
    }
  });

  watch(
    () => appStore.mobileSet,
    () => {
      if (appStore.mobileSet && !collapsed.value) {
        collapsed.value = true;
      } else if (!appStore.mobileSet && collapsed.value) {
        collapsed.value = false;
      }
    },
    {
      immediate: true,
    },
  );
</script>

