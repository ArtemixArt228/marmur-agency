<script setup lang="ts">
/**
 * PROTOTYPE — мозаїка розділів. Архетип Peak «Explore our products»:
 * сітка 3×3, підпис поверх кадру, кругла стрілка в куті.
 *
 * Дев'ята плитка — суцільна темна панель без фото: вона навмисно розриває
 * фоторитм і веде в нефільтрований каталог.
 */
import { protoProducts } from "~/data/prototype";

const countIn = (c: string) => protoProducts.filter((p) => p.category === c && p.available).length;

const tiles = [
  {
    label: "Мікс-букети",
    image: "/prototype/bouquet-lush-mix.jpg",
    to: "/prototype/catalog?category=mix",
    meta: `${countIn("mix")} сьогодні`,
  },
  {
    label: "Моно-букети",
    image: "/prototype/bouquet-tulip.jpg",
    to: "/prototype/catalog?category=mono",
    meta: `${countIn("mono")} сьогодні`,
  },
  {
    label: "Корзини та коробки",
    image: "/prototype/composition-heart.jpg",
    to: "/prototype/catalog?category=baskets",
    meta: `${countIn("baskets")} сьогодні`,
  },
  {
    label: "Букет нареченої",
    image: "/prototype/bouquet-cream-roses.jpg",
    to: "/prototype/catalog?category=bride",
    meta: `${countIn("bride")} сьогодні`,
  },
  {
    label: "Подарунки",
    image: "/prototype/gift-vase.jpg",
    to: "/prototype/catalog?category=gift",
    meta: "свічки · вази · планери",
  },
  {
    label: "Весільна підписка",
    image: "/prototype/bouquet-calla.jpg",
    to: "/prototype/catalog?category=wedding-sub",
    meta: "за заявкою",
  },
  {
    label: "Декор свята",
    image: "/prototype/field-tulips.jpg",
    to: "/prototype/catalog?category=decor",
    meta: "за заявкою",
  },
  {
    label: "Квіткова підписка",
    image: "/prototype/bouquet-peach.jpg",
    to: "/prototype/catalog?category=flower-sub",
    meta: "за заявкою",
  },
];
</script>

<template>
  <section class="mosaic ds-container ds-section">
    <DsReveal>
      <DsSectionHeading
        eyebrow="Каталог"
        title="Оберіть напрям"
        lede="Від пишних міксів до дрібниць, які роблять подарунок подарунком."
      />
    </DsReveal>

    <div class="mosaic__grid">
      <DsOverlayTile
        v-for="t in tiles"
        :key="t.label"
        :to="t.to"
        :label="t.label"
        :meta="t.meta"
        :image="t.image"
      />
      <DsOverlayTile to="/prototype/catalog" label="Увесь каталог" meta="усі позиції" solid />
    </div>
  </section>
</template>

<style scoped>
.mosaic__grid {
  margin-top: var(--space-16);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2px;
}

@media (max-width: 767px) {
  .mosaic__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
