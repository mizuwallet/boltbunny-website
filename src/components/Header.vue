<template>
  <div class="header">
    <div class="container mx-auto flex gap-12 items-center">
      <nav class="hidden md:flex items-center uppercase ">
        <router-link :to="item.link" v-for="item  in navList">{{ item.title }}</router-link>
      </nav>
      <div class="flex-center md:hidden w-10 h-10" @click="openMenu = true">
        <font-awesome-icon icon="fa-solid fa-bars" class="cursor-default"></font-awesome-icon>
      </div>
      <div class="ml-auto flex gap-4 items-center">
        <ConnectButton></ConnectButton>
      </div>
    </div>
    <a-drawer v-model:open="openMenu" width="60%" placement="left" style="background-color: rgba(30, 34, 36, .9);">
      <nav class="flex flex-col gap-20 uppercase ">
        <router-link :to="item.link" v-for="item  in navList">{{ item.title }}</router-link>
      </nav>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>

const navList = [{ title: 'How Does it Work?', link: '/' }, { title: 'Why Bolt Buuny?', link: '/' }, { title: 'Documentation', link: '/' }]

const openMenu = ref(false);

</script>

<style lang="less" scoped>
.header {
  @apply w-full flex flex-wrap items-center min-h-25 py-4 fixed top-0 left-0 right-0 z-50;
  background: rgba(30, 34, 36, .6);

  a {
    @apply flex-center w-60 h-8 rd-10 text-4 text-white;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid #94F69E;
    }
  }
}
</style>
