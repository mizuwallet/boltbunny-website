<template>
  <div class="relative" ref="boxRef">
    <slot></slot>

    <Teleport to="body">
      <slot name="content"></slot>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
  const selectRef = ref();
  const boxRef = ref();
  const dropdownRef = ref();
  const { x, y, width, height } = useElementBounding(selectRef);

  const showDropdown = ref(false);
</script>

