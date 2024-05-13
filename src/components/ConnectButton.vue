<template>
  <Button
    class="!h-8"
    @click="appStore.connectModalOpen = true"
    v-if="!appStore.address"
    :loading="appStore.connecting"
  >
    Connect Wallet
  </Button>
  <span class="flex flex-col items-center gap-1 w-fit" v-else>
    <Button
      class="!h-8 frame"
      @click="connectedHandler"
      :loading="signing"
      v-if="!appStore.accessToken"
    >
      Sign In
    </Button>
    <router-link to="/dashboard" v-if="appStore.accessToken">
      <Button class="!h-8">Dashboard</Button>
    </router-link>
    <span class="flex-col items-end">
      <span class="font-semibold">{{ ShortAddress(appStore.address) }}</span>
      <span class="underline cursor-pointer text-xs" @click="logout">logout</span>
    </span>
  </span>
  <!-- <div ref="connectBtnContainer" v-else>
    <Popover placement="bottom" :get-popup-container="() => connectBtnContainer">
      <Button>
        <img :src="appStore.walletCore.wallet?.icon" class="w-5 h-5 rounded-full" />
        {{ ShortAddress(appStore.address) }}
      </Button>
      <template #content>
        <div class="flex-col text-4 w-35">
          <div class="drop-item" @click="$router.push({ path: '/assets/my' })">
            <font-awesome-icon icon="fa-solid fa-shopping-bag" />
            My Assets
          </div>
          <div class="drop-item" @click="copy(appStore.address!)" v-if="appStore.address">
            <font-awesome-icon icon="fa-regular fa-copy" />
            Copy Address
          </div>
          <div class="drop-item" @click="appStore.walletCore.disconnect">
            <font-awesome-icon icon="fa-solid fa-sign-out" />
            Disconnect
          </div>
        </div>
      </template>
    </Popover>
  </div> -->

  <WalletDialog
    v-model:open="appStore.connectModalOpen"
    @connected="connectedHandler"
  ></WalletDialog>
</template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import useAppStore from '@/store/AppStore';
  import { ShortAddress } from '@/utils';
  import { message } from 'ant-design-vue';

  const appStore = useAppStore();
  const { login, logout } = useGraphql();

  const signing = ref(false);
  const connectedHandler = async () => {
    if (signing.value) return;

    appStore.connectModalOpen = false;

    try {
      signing.value = true;

      const { fullMessage, address, signature }: any = await appStore.walletCore.signMessage({
        message: 'BoltBunny Login',
        nonce: Date.now().toString(),
      });

      await login({
        signature,
        address: address || appStore.address,
        signMessage: fullMessage,
        publicKey: appStore.walletCore.account?.publicKey as string,
      });
    } catch (e: any) {
      console.log(e);
      message.error(e.message || e);
    } finally {
      signing.value = false;
    }
  };
</script>

<style lang="less" scoped>
  .drop-item {
    @apply cursor-pointer py-1 px-2 rounded-2 flex items-center gap-2;
    @apply hover:bg-primary/30 text-center;
  }
</style>

