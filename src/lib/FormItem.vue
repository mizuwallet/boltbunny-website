<template>
  <div class="flex-col gap-2">
    <span class="font-bold text-lg" v-if="label">
      {{ label }}:
      <Popover v-if="info" placement="right">
        <template #content>
          {{ info }}
        </template>
        <font-awesome-icon
          icon="fa-regular fa-question-circle"
          class="cursor-default text-xs"
        ></font-awesome-icon>
      </Popover>
    </span>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { Popover } from 'ant-design-vue';
  defineProps(['label', 'info']);
</script>

