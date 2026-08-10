<script setup lang="ts">
// PROTOTYPE — поява блоку при скролі.
// Пружини motion-v прибрані: §25 дозволяє лише прозорість і мʼякий зсув.
const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 });
</script>

<template>
  <DsReveal :delay="props.delay">
    <slot />
  </DsReveal>
</template>
