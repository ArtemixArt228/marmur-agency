<script setup lang="ts">
/**
 * PROTOTYPE — букет дня. Архетип Peak «City Line Exclusive»:
 * кадр в одній половині, панель surface-sunken у другій.
 */
import { protoProducts } from "~/data/prototype";

const { formatUah } = usePrototypeShop();

const product = computed(
  () => protoProducts.find((p) => p.category === "mix" && p.available) ?? protoProducts[0]!,
);
</script>

<template>
  <section class="featured ds-container ds-section">
    <div class="featured__grid">
      <DsReveal>
        <DsEditorialImage :src="product.photo" :alt="product.name" ratio="var(--ratio-editorial)" />
      </DsReveal>

      <DsReveal :delay="120">
        <div class="featured__panel">
          <p class="ds-meta featured__eyebrow">[ Букет дня ]</p>
          <h2 class="featured__title">{{ product.name }}</h2>
          <p class="featured__text ds-body">{{ product.description }}</p>
          <p v-if="product.composition" class="featured__composition ds-small ds-muted">
            {{ product.composition.join(" · ") }}
          </p>
          <p class="featured__price ds-mono-lg">{{ formatUah(product.price) }}</p>
          <div class="featured__actions">
            <DsButton :to="`/prototype/product/${product.id}`">Детальніше</DsButton>
          </div>
        </div>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.featured__grid {
  display: grid;
  gap: var(--gutter);
  align-items: stretch;
}

@media (min-width: 1024px) {
  .featured__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.featured__panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-surface-sunken);
  padding: var(--space-16);
}

.featured__eyebrow {
  color: var(--color-foreground-muted);
  margin-bottom: var(--space-6);
}

.featured__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
}

.featured__text {
  margin-top: var(--space-6);
  color: var(--color-foreground-muted);
  max-width: 44ch;
}

.featured__composition {
  margin-top: var(--space-4);
}

.featured__price {
  margin-top: var(--space-8);
}

.featured__actions {
  margin-top: var(--space-8);
}
</style>
