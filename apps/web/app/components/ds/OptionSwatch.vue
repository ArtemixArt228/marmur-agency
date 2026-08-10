<script setup lang="ts">
/**
 * Marmúr DS → components/forms/OptionSwatch.
 * Квадратна опція для розмірів і варіантів збірки на сторінці товару.
 */
const props = withDefaults(defineProps<{ selected?: boolean; disabled?: boolean }>(), {
  selected: false,
  disabled: false,
});
</script>

<template>
  <button
    type="button"
    class="ds-swatch"
    :class="{ 'ds-swatch--selected': props.selected }"
    :aria-pressed="props.selected"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-swatch {
  min-width: var(--touch-target);
  min-height: var(--touch-target);
  padding: 0 var(--space-4);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-color);
}

.ds-swatch:hover:not(:disabled):not(.ds-swatch--selected) {
  border-color: var(--color-border-strong);
}

.ds-swatch--selected {
  color: var(--color-foreground-inverse);
  background: var(--color-brand);
  border-color: var(--color-brand);
}

.ds-swatch:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
