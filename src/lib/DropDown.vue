<template>
  <div class="relative" ref="boxRef">
    <slot></slot>

    <Teleport to="body">
      <slot name="content"></slot>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
  const boxRef = ref();
</script>

