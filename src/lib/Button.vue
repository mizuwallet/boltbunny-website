<template>
  <div
    class="v-btn"
    :disabled="loading || disabled"
    :class="{
      loading,
      frame,
      disabled,
    }"
    @click.stop="clickHandler"
  >
    <!-- <font-awesome-icon icon="fa-solid fa-c" class="animate-spin" v-if="loading"></font-awesome-icon> -->
    <div
      class="w-0 h-0 rounded-full border-10 border-solid border-red border-l-transparent border-r-transparent animate-spin"
      v-if="loading"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    disabled: Boolean,
    loading: Boolean,
    frame: Boolean,
    silence: Boolean,
  });
  const emits = defineEmits(['click']);

  const clickHandler = () => {
    if (props.disabled || props.loading) return;
    emits('click');
  };
</script>

<style lang="less" scoped>
  .v-btn {
    @apply flex flex-shrink-0 items-center justify-center gap-4;
    @apply w-fit text-black cursor-pointer;
    @apply text-base;
    @apply p-4 py-1 transition-all;
    @apply rounded-1 select-none bg-primary/90;

    &.frame {
      @apply border-1 border-accent bg-transparent text-primary;
      @apply hover:bg-primary/15;
    }

    &:hover {
      @apply lg:bg-primary lg:shadow-lg;
    }

    &:active {
      box-shadow: 0 0;
      transform: translate(2px, 2px);
    }

    &.loading,
    &.disabled {
      @apply cursor-not-allowed;
      box-shadow: 0 0;
      filter: contrast(0.5);
    }
  }
</style>

