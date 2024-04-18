<template></template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  const { getTransactionHistory } = useGraphql();
</script>

<style leng="less" scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>

