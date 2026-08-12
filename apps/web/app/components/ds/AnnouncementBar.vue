<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/AnnouncementBar.
 *
 * Смуга в потоці над шапкою — вона скролиться геть. Заборона на «плаваючі
 * промо-смуги» стосується липких елементів; ця такою не є.
 */
import { NuxtLink } from "#components";

interface BarLink {
  label: string;
  to: string;
}

const props = defineProps<{
  items: string[];
  left?: BarLink;
  right?: BarLink;
}>();
</script>

<template>
  <div class="ds-announce">
    <NuxtLink v-if="props.left" :to="props.left.to" class="ds-announce__side">
      {{ props.left.label }}
    </NuxtLink>

    <p class="ds-announce__items">
      <span v-for="(item, i) in props.items" :key="item" class="ds-announce__item">
        <span v-if="i > 0" aria-hidden="true" class="ds-announce__dot">·</span>
        {{ item }}
      </span>
    </p>

    <NuxtLink v-if="props.right" :to="props.right.to" class="ds-announce__side">
      {{ props.right.label }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.ds-announce {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-6);
  min-height: 32px;
  padding-inline: var(--gutter);
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  font: var(--type-meta);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
}

.ds-announce__items {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  text-align: center;
}

.ds-announce__dot {
  margin-right: var(--space-2);
  opacity: 0.5;
}

.ds-announce__side {
  color: var(--color-foreground-inverse);
  text-decoration: none;
  opacity: 0.78;
  white-space: nowrap;
}

.ds-announce__side:last-child {
  grid-column: 3;
  justify-self: end;
}

.ds-announce__side:hover {
  opacity: 1;
  text-decoration: none;
}

/* На вузьких екранах лишаються самі обіцянки */
@media (max-width: 900px) {
  .ds-announce {
    grid-template-columns: 1fr;
  }

  .ds-announce__side {
    display: none;
  }

  .ds-announce__items {
    grid-column: 1;
  }
}
</style>
