<template>
  <div class="index-page">
    <div class="landing-section">
      <div>
        <img src="@/assets/images/index/pattern_blue1.png" alt="" />
        <img src="@/assets/images/index/pattern_green1.png" alt="" />
        <img src="@/assets/images/index/pattern_pink_1.png" alt="" />
        <img src="@/assets/images/index/pattern_green3.png" alt="" />
      </div>
      <div>
        <img src="@/assets/images/index/boltbunny_logo.png" alt="" />
        <h1>{{ title }}</h1>
        <h2>{{ subTitle }}</h2>
        <a href="">
          <button>start building on Aptos</button>
        </a>
      </div>
      <div>
        <img src="@/assets/images/index/pattern_blue2.png" alt="" />
        <img src="@/assets/images/index/pattern_green2.png" alt="" />
        <img src="@/assets/images/index/pattern_pink_2.png" alt="" />
        <img src="@/assets/images/index/pattern_green4.png" alt="" />
      </div>
    </div>
    <div class="imfo-section">
      <div class="imfo-title">{{ imfoTitle }}</div>
      <ul class="imfo-list">
        <li v-for="item in imfoList">
          <div class="icon">
            <img :src="item.icon" :alt="item.title" />
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="sub-title">{{ item.subTitle }}</div>
          <div class="border-bottom"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import icon1 from '@/assets/images/index/icon_01.png';
import icon2 from '@/assets/images/index/icon_02.png';
import icon3 from '@/assets/images/index/icon_03.png';

  const title = 'Powerful Developer Infrastructure for Aptos Builders';
  const subTitle =
    'We offer Aptos development tools to reduce costs and lower entry barriers, boosting efficiency and supporting the Aptos ecosystem.';

  const imfoTitle = 'Start Building on Aptos with the sponsored transactions service';
  const imfoList = [
    {
      icon: icon1,
      title: 'Instant Setup',
      subTitle:
        'Integrate effortlessly with just one line of code, dramatically simplifying your development process and minimizing time to market.',
    },
    {
      icon: icon2,
      title: 'Precision Control',
      subTitle:
        'Employ our advanced permission management systemto secure and tailor your transaction processes,enhancing operational integrity.',
    },
    {
      icon: icon3,
      title: 'Rich Insights',
      subTitle:
        'Capitalize on detailed BI analytics for a comprehensive understanding of  transaction dynamics, supporting informed decision-making and strategy refinement.',
    },
    {
      icon: icon2,
      title: 'Optimized Security',
      subTitle:
        'Ensure the utmost security and efficiency with our service that guarantee fast and reliable transaction execution',
    },
  ];
</script>

<style lang="less" scoped>
  .index-page {
    @apply flex-col w-full;
    .landing-section {
      @apply bg-[#1E2224];
    }
    .imfo-section {
      @apply bg-[#F2F2F2] w-full;
      .imfo-title {
        @apply text-6 text-center font-900 text-[#1E2224];
        @apply py-10;
      }
      .imfo-list {
        @apply grid grid-rows-1	 md:!grid-rows-2 !md:grid-flow-col gap-4;
        @apply max-w-880px;
        margin: 80px auto 0;
        li {
          @apply bg-[#1e2224];
          @apply text-center relative;
          @apply w-100 p-10 mb-30 md:mb-40 mx-auto;
          border-radius: 30px;
          .icon {
            @apply absolute w-30 h-30 bg-[#6DFB93] flex-center top-[-60px] left-50% translate-x-[-50%] rd-[50%];
            img {
              @apply w-75px h-75px;
            }
          }
          .title {
            @apply text-5 text-[#6DFB93] font-800 mt-6;
          }
          .sub-title {
            @apply text-4 text-[#FFFFFF] font-500 leading-30px;
          }
          .border-bottom {
            @apply h-25px w-full absolute bottom-0 left-0 right-0;
            @apply bg-[#6DFB93];
            border-radius: 0 0 30px 30px;
          }
        }
      }
    }
  }
</style>

<route lang="yaml">
meta:
  layout: default
</route>

