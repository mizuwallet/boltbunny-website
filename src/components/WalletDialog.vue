<template>
  <Modal :footer="false" centered v-bind="$attrs">
    <div class="flex justify-center items-center py-4 border-b-1 border-b-solid border-white/20">
      <span class="text-5 font-bold">Connect Wallet</span>
    </div>
    <div class="flex-col gap-2 max-h-40vh overflow-y-scroll p-4">
      <div
        v-for="(wallet, index) in appStore.walletCore.wallets"
        :key="index"
        class="wallet-item"
        @click="connectWallet(wallet)"
      >
        <div class="flex items-center gap-2 sm:gap-4">
          <img :src="wallet.icon" :alt="wallet.name" class="w-5 sm:w-10 aspect-1 rounded-full" />
          <span>{{ wallet.name }}</span>
        </div>
        <span
          class="border-1 border-solid border-primary px-3 py-1 rounded-2 text-sm"
          :class="{
            'text-green font-semibold': wallet.readyState === WalletReadyState.Installed,
          }"
        >
          {{ wallet.readyState }}
        </span>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import useWallets from '@/hooks/useWallets';
  import useAppStore from '@/store/AppStore';
  import { WalletReadyState } from '@aptos-labs/wallet-adapter-core';
  import { Modal } from 'ant-design-vue';

  const { connect } = useWallets();
  const appStore = useAppStore();
  const emits = defineEmits(['connected']);

  const connectWallet = async (wallet: any) => {
    if (
      wallet.readyState === WalletReadyState.Installed ||
      wallet.readyState === WalletReadyState.Loadable
    ) {
      await connect(wallet.name);
      emits('connected');
    } else {
      window.open(wallet.url, '_blank');
    }
  };
</script>

<style lang="less" scoped>
  .wallet-item {
    @apply bg-white/5 cursor-pointer;
    @apply flex-col sm:flex-row gap-3 justify-between items-center transition-all duration-100 rounded-4 p-2 font-medium text-base;
    @apply hover:bg-background/15 hover:text-primary;
  }
</style>

