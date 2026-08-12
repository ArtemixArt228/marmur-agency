<script setup lang="ts">
/**
 * Marmúr DS → components/core/Button.
 *
 * Прямокутна (2px), великі літери, 0.14em tracking. Наведення не змінює
 * розмір; натиск — 0.995 і 0.84 прозорості, без спалахів кольору.
 */
// Імпорт замість resolveComponent('NuxtLink') — інакше кнопка з `to`
// рендериться як мертвий тег <NuxtLink> і нікуди не веде.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "premium" | "secondary" | "quiet" | "inverse" | "ghost";
    size?: "sm" | "md" | "lg";
    to?: string;
    type?: "button" | "submit";
    fullWidth?: boolean;
    disabled?: boolean;
    /** Lucide-слаг стрілки/іконки праворуч від тексту */
    iconRight?: string;
  }>(),
  { variant: "primary", size: "md", type: "button" },
);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :to="props.to"
    :type="props.to ? undefined : props.type"
    :disabled="props.to ? undefined : props.disabled"
    :aria-disabled="props.to && props.disabled ? 'true' : undefined"
    class="ds-button"
    :class="[
      `ds-button--${props.variant}`,
      `ds-button--${props.size}`,
      { 'ds-button--block': props.fullWidth, 'ds-button--disabled': props.disabled },
    ]"
  >
    <slot />
    <DsIcon v-if="props.iconRight" :name="props.iconRight" :size="14" />
  </component>
</template>

<style scoped>
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  font-family: var(--font-sans);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-meta);
  text-transform: uppercase;
  text-decoration: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    var(--transition-color),
    opacity var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.ds-button:hover {
  text-decoration: none;
}

.ds-button:active {
  transform: scale(var(--press-scale));
  opacity: var(--press-opacity);
}

.ds-button--block {
  width: 100%;
}

.ds-button--disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.ds-button--disabled:active {
  transform: none;
}

/* Розміри */
.ds-button--sm {
  padding: 9px 18px;
  font-size: 11px;
  min-height: 36px;
}

.ds-button--md {
  padding: 13px 26px;
  font-size: 12px;
  min-height: 44px;
}

.ds-button--lg {
  padding: 18px 34px;
  font-size: 13px;
  min-height: 56px;
}

/* Варіанти */
.ds-button--primary {
  background: var(--color-black);
  color: var(--color-white);
  border: 1px solid var(--color-black);
}

.ds-button--premium {
  background: var(--color-brand);
  color: var(--color-foreground-inverse);
  border: 1px solid var(--color-brand);
}

.ds-button--primary:hover:not(.ds-button--disabled),
.ds-button--premium:hover:not(.ds-button--disabled) {
  background: var(--color-brand-dark);
  border-color: var(--color-brand-dark);
  opacity: 1;
}

.ds-button--secondary {
  background: transparent;
  color: var(--color-brand);
  border: 1px solid var(--color-brand);
}

.ds-button--secondary:hover:not(.ds-button--disabled) {
  background: var(--color-brand);
  color: var(--color-foreground-inverse);
  opacity: 1;
}

.ds-button--quiet {
  background: transparent;
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
}

.ds-button--quiet:hover:not(.ds-button--disabled) {
  border-color: var(--color-border-strong);
  opacity: 1;
}

.ds-button--inverse {
  background: var(--color-background);
  color: var(--color-foreground);
  border: 1px solid var(--color-background);
}

.ds-button--inverse:hover:not(.ds-button--disabled) {
  opacity: var(--hover-opacity);
}

.ds-button--ghost {
  padding: 0 0 6px;
  min-height: auto;
  background: transparent;
  color: var(--color-foreground);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-border-strong);
  border-radius: 0;
}

.ds-button--ghost:hover:not(.ds-button--disabled) {
  opacity: var(--hover-opacity);
}
</style>
