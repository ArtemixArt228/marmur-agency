<script setup lang="ts">
/**
 * Marmúr DS → components/core/Tag.
 * Використовується для складу букета й метаданих. Не бейдж-кластер на картці.
 */
const props = withDefaults(defineProps<{ tone?: "default" | "solid" | "bare" }>(), {
  tone: "default",
});
</script>

<template>
  <span class="ds-tag" :class="`ds-tag--${props.tone}`">
    <slot />
  </span>
</template>

<style scoped>
.ds-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  white-space: nowrap;
}

.ds-tag--default {
  color: var(--color-foreground-muted);
  border: 1px solid var(--color-border);
  background: transparent;
}

.ds-tag--solid {
  color: var(--color-foreground-inverse);
  border: 1px solid var(--color-brand);
  background: var(--color-brand);
}

.ds-tag--bare {
  color: var(--color-foreground-subtle);
  border: 1px solid transparent;
  background: transparent;
  padding: 0;
}
</style>
