<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/ProductCard.
 *
 * Плитка без рамки, тіні й плаваючої кнопки: фото, назва, дескриптор, ціна.
 * Це весь набір. Бейджі-кластери й «швидкий перегляд» системою заборонені.
 *
 * `price` приходить уже відформатованим (табличні цифри, розділені тисячі,
 * валюта після числа — §10); слот `price` дозволяє показати ціну зі знижкою.
 */
// NuxtLink береться імпортом, а не resolveComponent('NuxtLink') у виразі
// `:is`: Nuxt реєструє компоненти імпортами на збірці, тому в рантаймі
// resolve не знаходив «NuxtLink» і повертав рядок — у DOM осідав мертвий
// <NuxtLink> без href, і картка переставала клікатись.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    name: string;
    descriptor?: string;
    price?: string;
    image?: string;
    placeholder?: string;
    ratio?: string;
    /** Тиха мітка у верхньому куті кадру, напр. «на завтра» */
    note?: string;
    soldOut?: boolean;
    soldOutLabel?: string;
    to?: string;
  }>(),
  {
    placeholder: "Product photography",
    ratio: "var(--ratio-portrait)",
    soldOut: false,
    soldOutLabel: "Немає в наявності",
  },
);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'article'"
    :to="props.to"
    class="ds-product"
    :class="{ 'ds-product--sold-out': props.soldOut }"
  >
    <DsEditorialImage
      :src="props.image"
      :alt="props.name"
      :ratio="props.ratio"
      :placeholder="props.placeholder"
      fill="sunken"
      hover-zoom
      :scrim="Boolean(props.note || props.soldOut)"
    >
      <span v-if="props.note" class="ds-product__note">{{ props.note }}</span>
      <span v-if="props.soldOut" class="ds-product__sold-out">
        {{ props.soldOutLabel }}
      </span>
      <slot name="frame" />
    </DsEditorialImage>

    <div class="ds-product__row">
      <h3 class="ds-product__name">{{ props.name }}</h3>
      <span class="ds-product__price ds-price">
        <slot name="price">{{ props.price }}</slot>
      </span>
    </div>
    <p v-if="props.descriptor" class="ds-product__descriptor">
      {{ props.descriptor }}
    </p>
  </component>
</template>

<style scoped>
.ds-product {
  display: block;
  text-decoration: none;
  color: var(--color-foreground);
}

.ds-product:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-product--sold-out {
  opacity: 0.62;
}

.ds-product__note,
.ds-product__sold-out {
  position: absolute;
  left: var(--space-4);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
}

/*
 * Мітка лежить на фотографії, тож її захищає той самий scrim (§17), а текст
 * стає світлим: на темних кадрах обсидіанова мітка просто зникала.
 */
.ds-product__note {
  top: var(--space-4);
  color: var(--color-foreground-inverse);
}

.ds-product__sold-out {
  bottom: var(--space-4);
  color: var(--color-foreground-inverse);
  opacity: 0.86;
}

.ds-product__row {
  margin-top: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-6);
}

.ds-product__name {
  font: var(--type-h3);
  font-size: 20px;
  text-underline-offset: 0.26em;
}

.ds-product:hover .ds-product__name {
  text-decoration: underline;
  text-decoration-color: var(--color-border-strong);
}

.ds-product__price {
  font: var(--type-small);
}

.ds-product__descriptor {
  margin-top: var(--space-2);
  font: var(--type-small);
  color: var(--color-foreground-muted);
}
</style>
