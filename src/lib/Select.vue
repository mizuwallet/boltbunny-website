<template>
  <div class="relative" ref="boxRef">
    <div class="select-input" ref="selectRef" @click="showDropdown = !showDropdown">
      <div class="placeholder" v-if="!currentValue">{{ placeholder }}</div>
      {{ currentValue?.label || currentValue }}

      <font-awesome-icon
        class="w-3 h-3 transition-all ml-auto"
        :class="{
          '-rotate-180': showDropdown,
        }"
        icon="fa-solid fa-chevron-down"
        v-if="!currentValue"
      ></font-awesome-icon>
      <font-awesome-icon
        class="w-3 h-3 transition-all ml-auto"
        icon="fa-solid fa-xmark"
        v-if="currentValue"
        @click.stop="emits('update:modalValue', null)"
      ></font-awesome-icon>
    </div>

    <Teleport to="body">
      <div
        ref="dropdownRef"
        class="dropdown"
        :class="{
          'pointer-events-none': !showDropdown,
          '!opacity-100 !top-1': showDropdown,
        }"
        :style="{
          transform: `translate(${x}px, ${y + height}px)`,
          width: `${width}px`,
        }"
      >
        <div
          class="dropdown-item"
          :class="{
            active: modalValue === option.value || modalValue === option,
            disabled: option.disabled,
          }"
          @click="updateValueHandler(option)"
          v-for="option in options"
        >
          {{ option.label || option }}
        </div>

        <div class="text-center text-center text-gray" v-if="!options?.length">No Data...</div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
  const selectRef = ref();
  const boxRef = ref();
  const dropdownRef = ref();
  const { x, y, width, height } = useElementBounding(selectRef);

  const showDropdown = ref(false);
  const props = defineProps<{ modalValue: any; options: any[]; placeholder?: string }>();
  const emits = defineEmits(['update:modalValue']);

  onClickOutside(boxRef, () => {
    if (showDropdown.value) {
      showDropdown.value = false;
    }
  });

  const updateValueHandler = (option: any) => {
    if (option.disabled) return;
    emits('update:modalValue', option.value);
    showDropdown.value = false;
  };

  const currentValue = computed(() => {
    return props.options.filter(
      (option: any) => option.value == props.modalValue || option == props.modalValue,
    )[0];
  });
</script>

<style lang="less" scoped>
  .select-input {
    @apply p-2 px-4 h-10 relative;
    @apply cursor-pointer bg-accent/15;
    @apply border-1 border-solid border-primary/10 hover:border-primary rounded-1;
    @apply flex items-center justify-between;

    .placeholder {
      @apply absolute left-0 right-0 top-0 bottom-0 flex items-center px-4 pointer-events-none;
      @apply text-gray;
    }
  }

  .dropdown {
    @apply border-1 border-solid border-primary rounded-1 z-1001;
    @apply bg-background text-text;
    @apply fixed -top-1 left-0 opacity-0 -translate-y-2 transition-all duration-200;
    @apply overflow-y-scroll max-h-60;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      @apply hidden;
    }
  }

  .dropdown-item {
    @apply cursor-pointer select-none;
    @apply p-3 px-4;
    @apply bg-accent/5 hover:bg-accent/15;

    &.active {
      @apply bg-primary/10 text-primary;
    }

    &.disabled {
      @apply cursor-not-allowed;
      @apply bg-accent/5 hover:bg-accent/5 text-gray;
    }

    &:hover {
      @apply bg-accent/15;
    }
  }
</style>

