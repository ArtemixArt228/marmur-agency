<script setup lang="ts">
/**
 * Marmúr DS → components/core/TextLink.
 * Малий сансовий лінк із рискою: риска темніє з sand до obsidian,
 * стрілка зсувається на 3px. Це весь «hover-ефект» у системі.
 */
// Імпорт замість resolveComponent('NuxtLink') — інакше лінк із `to`
// рендериться як мертвий тег <NuxtLink> і нікуди не веде.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    arrow?: boolean;
    tone?: "default" | "inverse";
  }>(),
  { tone: "default" },
);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'a'"
    :to="props.to"
    :href="props.to ? undefined : props.href"
    class="ds-text-link"
    :class="{ 'ds-text-link--inverse': props.tone === 'inverse' }"
  >
    <slot />
    <DsIcon v-if="props.arrow" name="arrow-right" :size="13" class="ds-text-link__arrow" />
  </component>
</template>

<style scoped>
.ds-text-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground);
  text-decoration: none;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-border-strong);
  transition: var(--transition-color);
}

.ds-text-link:hover {
  border-bottom-color: var(--color-foreground);
  opacity: 1;
  text-decoration: none;
}

.ds-text-link--inverse {
  color: var(--color-foreground-inverse);
  border-bottom-color: var(--color-border-inverse);
}

.ds-text-link--inverse:hover {
  border-bottom-color: var(--color-foreground-inverse);
}

.ds-text-link__arrow {
  transition: transform var(--duration) var(--ease-standard);
}

.ds-text-link:hover .ds-text-link__arrow {
  transform: translateX(3px);
}
</style>
