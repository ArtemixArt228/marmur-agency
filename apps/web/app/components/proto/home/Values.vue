<script setup lang="ts">
/**
 * PROTOTYPE — «Майстерня, а не конвеєр». Архетип Peak «Radical company»:
 * заголовок і три плитки.
 *
 * Відгуків на головній Peak немає, але в нас вони справжні, тому три
 * цитати йдуть тихим рядком під плитками — без нової секції.
 */
import { protoReviews } from "~/data/prototype";

// Ігор випадає: швидкість уже названа у смузі-анонсі
const reviews = protoReviews.filter((r) => r.name !== "Ігор").slice(0, 3);

const tiles = [
  { label: "Наша історія", image: "/prototype/marmur-1.jpg", to: "/prototype/about" },
  { label: "Школа флористики", image: "/prototype/marmur-3.jpg", to: "/prototype/school" },
  { label: "Доставка й пакування", image: "/prototype/marmur-2.jpg", to: "/prototype/delivery" },
];
</script>

<template>
  <section class="values ds-container ds-section">
    <DsReveal>
      <DsSectionHeading
        eyebrow="Студія"
        title="Майстерня, а не конвеєр"
        lede="Ми відкрились як маленька студія флористики й досі збираємо кожен букет руками."
      />
    </DsReveal>

    <div class="values__grid">
      <DsOverlayTile
        v-for="t in tiles"
        :key="t.label"
        :to="t.to"
        :label="t.label"
        :image="t.image"
        ratio="var(--ratio-portrait)"
      />
    </div>

    <div class="values__reviews">
      <DsReveal v-for="(r, i) in reviews" :key="r.name" :delay="i * 80" class="values__review">
        <blockquote class="values__quote ds-body">{{ r.text }}</blockquote>
        <p class="ds-meta ds-subtle values__by">{{ r.name }} · {{ r.source }}</p>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.values__grid {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--gutter);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 767px) {
  .values__grid {
    grid-template-columns: 1fr;
  }
}

.values__reviews {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--space-12) var(--gutter);
}

@media (min-width: 768px) {
  .values__reviews {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.values__review {
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}

.values__quote {
  margin: 0;
  color: var(--color-foreground-muted);
}

.values__by {
  margin-top: var(--space-6);
}
</style>
