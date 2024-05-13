<template>
  <div class="index-page">
    <div class="landing-section">
      <div class="img-box left-0">
        <img class="absolute top-0" src="@/assets/images/index/pattern_blue1.png" alt="" />
        <img class="absolute top-0%" src="@/assets/images/index/pattern_green1.png" alt="" />
        <img class="absolute top-60%" src="@/assets/images/index/pattern_pink_1.png" alt="" />
        <img class="absolute bottom-0" src="@/assets/images/index/pattern_green3.png" alt="" />
      </div>
      <div class="landing-content">
        <img class="w-full max-w-890px" src="@/assets/images/index/boltbunny_logo.png" alt="" />
        <h1 class="title">{{ title }}</h1>
        <h2 class="sub-title">{{ subTitle }}</h2>
        <div class="flex-center mt-10">
          <a href="">
            <button>start building on Aptos</button>
          </a>
        </div>
      </div>
      <div class="img-box right-0">
        <img class="absolute top-0" src="@/assets/images/index/pattern_green2.png" alt="" />
        <img class="absolute top-25%" src="@/assets/images/index/pattern_pink_2.png" alt="" />
        <img class="absolute top-50%" src="@/assets/images/index/pattern_green4.png" alt="" />
        <img
          class="absolute bottom-0 right-10%"
          src="@/assets/images/index/pattern_blue2.png"
          alt=""
        />
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
    @apply flex-col w-full ;

    .landing-section {
      @apply bg-background pt-25 flex relative overflow-hidden;

      .img-box {
        @apply absolute bottom-0 top-0 w-full z-1;
        max-width: 22%;
      }

      .landing-content {
        @apply py-20 px-4 m-auto max-w-230 z-11;
        @apply md:pb-40;

        .title {
          @apply text-4 font-black text-white text-center leading-[8];
          @apply md:text-8 md:leading-50px md:mt-[-20px];
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .sub-title {
          @apply max-w-640px mx-auto text-4 font-400 text-white text-center leading-[40px] mt-5;
          @apply md:text-18px;
          letter-spacing: 2px;
        }

        a {
          @apply font-800 text-4 text-center px-6 py-2 rd-10 inline-block;
          @apply md:text-7 md:px-16 md:py-4;
          border: 5px solid #94f69e;

          button {
            text-transform: uppercase;
            letter-spacing: 2px;
          }
        }
      }
    }

    .imfo-section {
      @apply bg-[#F2F2F2] w-full px-4;

      .imfo-title {
        @apply text-6 text-center font-black text-background pt-6;
        @apply md:pt-14 md:pb-6;
      }

      .imfo-list {
        @apply flex flex-wrap;
        @apply md:max-w-880px xl:max-w-[1080px];
        margin: 80px auto 0;

        li {
          @apply bg-background text-center relative rd-30px;
          @apply w-100 p-12 mb-20 mx-auto;
          @apply md:mb-30;

          .icon {
            @apply absolute w-30 h-30 bg-[#6DFB93] flex-center top-[-60px] left-50% translate-x-[-50%] rd-[50%];

            img {
              @apply w-75px h-75px;
            }
          }

          .title {
            @apply text-5 text-[#6DFB93] font-800 mt-6 mb-2;
          }

          .sub-title {
            @apply text-4 text-white font-500 leading-30px;
          }

          .border-bottom {
            @apply h-25px w-full absolute bottom-0 left-0 right-0;
            @apply bg-[#6DFB93];
            @apply rounded-b-30px;
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

