<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Wordmark.
 *
 * Логотипу як файлу немає — знак набраний шрифтом. Локап із двох рядків:
 * MARMÚR сериф-дисплеєм і FLOWERS капсом під ним. Трекінг заданий
 * власницею (0.18em / 0.52em) і не збігається з `--tracking-wordmark`
 * старого однорядкового знака. Коли прийде справжній мак, замінюємо вміст,
 * але кегль, трекінг і регістр лишаємо.
 */
// Імпорт замість resolveComponent('NuxtLink') — інакше знак у шапці
// рендериться як мертвий тег <NuxtLink> і не веде на головну.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    /** Кегль першого рядка; підпис лишається 8px */
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
  >
    <span class="ds-wordmark__name" :style="{ fontSize: `${props.size}px` }">MARMÚR</span>
    <span class="ds-wordmark__suffix">FLOWERS</span>
  </component>
</template>

<style scoped>
.ds-wordmark {
  display: inline-block;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  color: var(--color-foreground);
}

.ds-wordmark:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-wordmark__name {
  display: block;
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: var(--transition-color);
}

.ds-wordmark__suffix {
  display: block;
  margin-top: var(--space-1);
  font-family: var(--font-label);
  font-size: 8px;
  font-weight: var(--weight-semibold);
  letter-spacing: 0.52em;
  text-transform: uppercase;
  color: var(--color-foreground-muted);
  transition: var(--transition-color);
}

.ds-wordmark--inverse {
  color: var(--color-foreground-inverse);
}

.ds-wordmark--inverse .ds-wordmark__suffix {
  color: var(--color-foreground-inverse);
  opacity: 0.72;
}
</style>
