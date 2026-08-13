<script setup lang="ts">
/**
 * Marmúr DS → components/core/Button.
 *
 * Прямокутна (2px), великі літери. Драбина висот 32 / 40 / 48 — рівний крок
 * 8px без вертикального padding, тому однорядкова кнопка дорівнює висоті
 * рівно, а не «принаймні».
 *
 * Стрілка стоїть за замовчуванням і на ховері їде на 3px, як у `DsTextLink`.
 * Наведення не змінює розмір; натиск — 0.995 і 0.84 прозорості.
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
    /** Lucide-слаг іконки праворуч від тексту. `false` прибирає стрілку. */
    iconRight?: string | false;
  }>(),
  { variant: "primary", size: "md", type: "button", iconRight: "arrow-right" },
);

// Окремий computed, а не `v-if` просто на пропі: інакше `:name` лишається
// `string | false` і vue-tsc сварить біндинг.
const arrow = computed(() => (props.iconRight === false ? undefined : props.iconRight));

const arrowSize = computed(() => ({ sm: 12, md: 14, lg: 16 })[props.size]);
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
    <DsIcon v-if="arrow" :name="arrow" :size="arrowSize" class="ds-button__arrow" />
  </component>
</template>

<style scoped>
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-label);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-label-sm);
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

/* 3px, а не 2px як у плитки: кнопка — «текст + стрілка» в рядку, як лінк. */
.ds-button__arrow {
  transition: transform var(--duration) var(--ease-standard);
}

.ds-button:hover:not(.ds-button--disabled) .ds-button__arrow {
  transform: translateX(3px);
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

/* Розміри — вертикального padding немає, висоту тримає min-height. */
.ds-button--sm {
  padding: 0 14px;
  font-size: var(--text-label-sm);
  min-height: 32px;
}

.ds-button--md {
  padding: 0 20px;
  font-size: var(--text-label-sm);
  min-height: 40px;
}

.ds-button--lg {
  gap: var(--space-3);
  padding: 0 28px;
  font-size: var(--text-label);
  letter-spacing: var(--tracking-label);
  min-height: 48px;
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
  background: var(--color-foreground);
  color: var(--color-background);
  border-color: var(--color-foreground);
  opacity: 1;
}

.ds-button--inverse {
  background: var(--color-background);
  color: var(--color-foreground);
  border: 1px solid var(--color-background);
}

/* Інверсія в дусі OverlayTile: плашка розчиняється в контур. */
.ds-button--inverse:hover:not(.ds-button--disabled) {
  background: transparent;
  color: var(--color-foreground-inverse);
  border-color: var(--color-foreground-inverse);
  opacity: 1;
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

/*
 * currentColor, а не --color-foreground: HeroSplit перефарбовує цю кнопку в
 * ivory для темного героя, і жорсткий обсидіан перебив би його специфічністю.
 */
.ds-button--ghost:hover:not(.ds-button--disabled) {
  border-bottom-color: currentColor;
  opacity: 1;
}
</style>
