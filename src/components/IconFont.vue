<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: 'github' | 'juejin'
    size?: string | number
    title?: string
  }>(),
  {
    size: '1em',
    title: '',
  },
)

const symbolId = computed(() => `#icon-${props.name}`)

const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
}))
</script>

<template>
  <svg
    class="icon-font"
    :style="iconStyle"
    :aria-hidden="title ? 'false' : 'true'"
    :role="title ? 'img' : 'presentation'"
  >
    <title v-if="title">{{ title }}</title>
    <use :href="symbolId" :xlink:href="symbolId" />
  </svg>
</template>

<style scoped lang="scss">
.icon-font {
  display: inline-block;
  flex-shrink: 0;
  fill: currentcolor;
  vertical-align: middle;
}
</style>
