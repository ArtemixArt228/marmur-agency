<script setup lang="ts">
/**
 * Marmúr DS → components/core/Icon.
 *
 * Оригінал тягне Lucide з CDN маскою; тут той самий набір, але з локального
 * бандла (`icon.serverBundle.collections: ["lucide"]` у nuxt.config) — це і є
 * «self-host the SVGs for production» із readme дизайн-системи.
 *
 * Іконки лише функціональні: шапка, степери, шеврон селекта, стрілка лінка,
 * стрілки каруселі. Робочий набір: search, heart, shopping-bag, menu, x,
 * arrow-right, arrow-left, plus, minus, chevron-down.
 */
const props = withDefaults(defineProps<{ name: string; size?: number }>(), {
  size: 18,
});
</script>

<template>
  <UIcon
    :name="`i-lucide-${props.name}`"
    class="ds-icon"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.ds-icon {
  display: inline-block;
  flex: none;
  color: inherit;
}
</style>
