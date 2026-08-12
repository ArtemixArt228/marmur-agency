<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Wordmark.
 *
 * Логотипу як файлу немає — знак набраний шрифтом: Cormorant Garamond,
 * великі літери, 0.22em tracking. Коли прийде справжній мак, замінюємо
 * вміст, але кегль, трекінг і регістр лишаємо.
 */
// Імпорт замість resolveComponent('NuxtLink') — інакше знак у шапці
// рендериться як мертвий тег <NuxtLink> і не веде на головну.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    size?: number;
    tone?: "default" | "inverse";
    to?: string;
  }>(),
  { size: 20, tone: "default" },
);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'span'"
    :to="props.to"
    class="ds-wordmark"
    :class="{ 'ds-wordmark--inverse': props.tone === 'inverse' }"
    :style="{ fontSize: `${props.size}px` }"
  >
    Marmúr
  </component>
</template>

<style scoped>
.ds-wordmark {
  display: inline-block;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wordmark);
  text-decoration: none;
  color: var(--color-foreground);
  transition: var(--transition-color);
}

.ds-wordmark:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-wordmark--inverse {
  color: var(--color-foreground-inverse);
}
</style>
