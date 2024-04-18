<template>
  <span
    v-if="network"
    class="text-xs font-semibold px-2 py-2px rounded-2px w-fit"
    :class="{
      'bg-primary/30': network === Network.TESTNET,
      'bg-primary/70 text-black': network === Network.MAINNET,
    }"
  >
    {{ network?.toUpperCase() }}
  </span>
</template>

<script lang="ts" setup>
  import { Network } from '@aptos-labs/ts-sdk';

  defineProps<{
    network: Network;
  }>();
</script>

<style leng="less" scoped></style>

