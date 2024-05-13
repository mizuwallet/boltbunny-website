<template>
  <div class="header">
    <div class="container mx-auto flex gap-12 items-center">
      <nav class="hidden md:flex gap-1 items-center uppercase">
        <router-link
          :to="item.link"
          v-for="(item, index) in navList"
          :class="{ active: index == activeNavIndex }"
          @click="clickNav(index)"
        >
          {{ item.title }}
        </router-link>
      </nav>
      <div class="flex-center md:hidden w-10 h-10" @click="openMenu = true">
        <font-awesome-icon icon="fa-solid fa-bars" class="cursor-default"></font-awesome-icon>
      </div>
      <div class="hidden ml-auto md:flex gap-4 items-center">
        <ConnectButton></ConnectButton>
      </div>
    </div>
    <a-drawer
      v-model:open="openMenu"
      width="60%"
      placement="left"
      style="background-color: rgba(30, 34, 36, 0.9)"
    >
      <nav class="flex flex-col gap-10 uppercase">
        <router-link
          :to="item.link"
          v-for="(item, index) in navList"
          :class="{ active: index == activeNavIndex }"
          @click="clickNav(index)"
        >
          {{ item.title }}
        </router-link>
        <ConnectButton class="md:hidden" placement="left"></ConnectButton>
      </nav>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  const activeNavIndex = ref<number>(0);
  const navList = [
    { title: 'How Does it Work?', link: '/' },
    { title: 'Why Bolt Buuny?', link: '/' },
    { title: 'Documentation', link: '/' },
  ];

  const openMenu = ref(false);

  function heightToTop(ele: HTMLElement) {
    let root = document.body;
    let height = 0;
    do {
      height += ele.offsetTop;
    } while (ele.offsetParent !== root);
    return height;
  }

  const clickNav = (index: number) => {
    activeNavIndex.value = index;

    if (index == 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (index == 1) {
      const targetDom = document.querySelector('.index-page .imfo-section') as HTMLElement;
      window.scrollTo({
        top: heightToTop(targetDom) - 100,
        behavior: 'smooth',
      });
    }
  };
</script>

<style lang="less" scoped>
  .header {
    @apply w-full flex flex-wrap items-center min-h-25 py-4 fixed top-0 left-0 right-0 z-50;
    background: rgba(30, 34, 36, 0.6);

    a {
      @apply flex-center w-60 h-8 rd-10 text-4 text-white;
      border: 1px solid transparent;

      &.active,
      &:hover {
        border: 1px solid #94f69e;
      }
    }
  }
</style>

