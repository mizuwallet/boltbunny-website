<template>
  <div class="index-page">
    <div class="landing-section"></div>
    <div class="imfo-section"></div>
  </div>
</template>

<script lang="ts" setup>
  const title = 'Powerful Developer Infrastructure for Aptos Builders';
  const subTitle =
    'We offer Aptos development tools to reduce costs and lower entry barriers, boosting efficiency and supporting the Aptos ecosystem.';

  const imfoTitle = 'Start Building on Aptos with the sponsored transactions service';
  const imfoList = [
    {
      title: 'Instant Setup',
      subTitle:
        'Integrate effortlessly with just one line of code, dramatically simplifying your development process and minimizing time to market.',
    },
    {
      title: 'Precision Control',
      subTitle:
        'Employ our advanced permission management systemto secure and tailor your transaction processes,enhancing operational integrity.',
    },
    {
      title: 'Rich Insights',
      subTitle:
        'Capitalize on detailed BI analytics for a comprehensive understanding of  transaction dynamics, supporting informed decision-making and strategy refinement.',
    },
    {
      title: 'Optimized Security',
      subTitle:
        'Ensure the utmost security and efficiency with our service that guarantee fast and reliable transaction execution',
    },
  ];
</script>

<style lang="less" scoped>
  .centre-title {
    @apply m-0;
    @apply text-4xl lg:text-6xl text-center font-bold !leading-30;
    @apply text-[#1E2224];
  }

  .index-page {
    @apply flex-col w-full;
  }
</style>

<route lang="yaml">
meta:
  layout: default
</route>

