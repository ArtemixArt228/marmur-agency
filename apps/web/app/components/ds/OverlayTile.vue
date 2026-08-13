<script setup lang="ts">
/**
 * Marmúr DS → components/editorial/OverlayTile.
 *
 * Плитка Peak: кадр, капсовий підпис унизу ліворуч, кругла кнопка-стрілка
 * унизу праворуч. Коло тут — єдине в системі, і воно функціональне: це
 * контрол, а не декор (§9 spec 2026-08-12).
 *
 * `solid` прибирає фото й лишає темну панель — нею навмисно розривається
 * фоторитм сітки.
 */
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    to: string;
    label: string;
    meta?: string;
    image?: string;
    ratio?: string;
    solid?: boolean;
  }>(),
  { ratio: "var(--ratio-square)", solid: false },
);
</script>

<template>
  <NuxtLink :to="props.to" class="ds-tile" :class="{ 'ds-tile--solid': props.solid }">
    <DsEditorialImage
      v-if="!props.solid"
      :src="props.image"
      :alt="props.label"
      :ratio="props.ratio"
      fill="sunken"
      hover-zoom
      scrim
      class="ds-tile__image"
    />
    <span v-else class="ds-tile__panel" :style="{ aspectRatio: props.ratio }" />

    <span class="ds-tile__caption">
      <span class="ds-tile__label">{{ props.label }}</span>
      <span v-if="props.meta" class="ds-tile__meta">{{ props.meta }}</span>
    </span>

    <span class="ds-tile__arrow" aria-hidden="true">
      <DsIcon name="arrow-right" :size="16" />
    </span>
  </NuxtLink>
</template>

<style scoped>
.ds-tile {
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--color-foreground-inverse);
}

.ds-tile:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-tile__panel {
  display: block;
  width: 100%;
  background: var(--color-background-dark);
}

.ds-tile__caption {
  position: absolute;
  left: var(--space-6);
  bottom: var(--space-6);
  right: calc(var(--space-6) + 48px);
  display: grid;
  gap: var(--space-1);
}

.ds-tile__label {
  font: var(--type-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label-sm);
}

.ds-tile__meta {
  font: var(--type-mono);
  font-variant-numeric: tabular-nums;
  opacity: 0.78;
}

/*
 * Єдине коло в системі. Це кнопка, тому 9999px тут не порушує правило
 * «радіуси 0–6px», яке стосується поверхонь.
 */
.ds-tile__arrow {
  position: absolute;
  right: var(--space-6);
  bottom: var(--space-6);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border-inverse);
  background: rgb(245 241 234 / 0.14);
  transition:
    var(--transition-color),
    transform var(--duration-fast) var(--ease-standard);
}

.ds-tile:hover .ds-tile__arrow {
  background: var(--color-foreground-inverse);
  color: var(--color-foreground);
  transform: translateX(2px);
}
</style>
