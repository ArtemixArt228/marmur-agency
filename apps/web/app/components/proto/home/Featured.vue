<script setup lang="ts">
/**
 * PROTOTYPE — букет дня. Архетип Peak «City Line Exclusive»: кадр із життя
 * в одній половині, панель surface-sunken у другій. Усередині панелі —
 * предметка букета, під нею текст, притиснутий до низу.
 *
 * Половини стикаються без жолоба: у референсі кадр і панель читаються як
 * один обʼєкт, а не як дві картки поруч.
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
      <DsReveal class="featured__cell">
        <DsEditorialImage
          src="/prototype/marmur-1.jpg"
          alt="Букет у руках на польовій стежці"
          ratio="var(--ratio-editorial)"
          class="featured__photo"
        />
      </DsReveal>

      <DsReveal :delay="120" class="featured__cell">
        <div class="featured__panel">
          <figure class="featured__still">
            <img
              :src="product.photo"
              :alt="product.name"
              class="featured__still-img"
              loading="lazy"
            />
          </figure>

          <div class="featured__body">
            <p class="ds-meta featured__eyebrow">[ Букет дня ]</p>
            <h2 class="featured__title">{{ product.name }}</h2>
            <p class="featured__text ds-small ds-muted">{{ product.description }}</p>
            <div class="featured__actions">
              <p class="featured__price ds-mono-lg">{{ formatUah(product.price) }}</p>
              <DsButton :to="`/prototype/product/${product.id}`">Детальніше</DsButton>
            </div>
          </div>
        </div>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.featured__grid {
  display: grid;
  gap: 0;
}

.featured__cell {
  min-width: 0;
}

.featured__panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-sunken);
  padding: var(--space-8);
}

/*
 * Предметка висить у панелі: `contain`, а не `cover` — букет має бути
 * видно цілим, з повітрям навколо, як предметку в референсі.
 */
.featured__still {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  aspect-ratio: var(--ratio-square);
  margin: 0 0 var(--space-8);
}

.featured__still-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  margin-top: var(--space-4);
  max-width: 46ch;
}

.featured__actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-8);
}

@media (min-width: 768px) {
  .featured__panel {
    padding: var(--space-12);
  }
}

@media (min-width: 1024px) {
  .featured__grid {
    grid-template-columns: 1fr 1fr;
    /*
     * Саме `grid-template-rows`, а не `min-height`: ряду потрібна визначена
     * висота, інакше `height: 100%` усередині нема від чого рахувати і кадр
     * повертається до власної пропорції, розганяючи секцію.
     */
    grid-template-rows: clamp(600px, 50vw, 740px);
  }

  /*
   * На десктопі кадр бере висоту ряду замість власної пропорції. Ширину
   * теж треба задати явно: з визначеною висотою inline-`aspect-ratio`
   * інакше порахує ширину сам і кадр не дійде до краю колонки.
   */
  .featured__photo,
  .featured__photo :deep(.ds-image__frame) {
    width: 100%;
    height: 100%;
  }

  .featured__still {
    /* Висоту дає ряд: предметка забирає все, що лишив текст */
    aspect-ratio: auto;
    margin-bottom: var(--space-12);
  }
}

@media (min-width: 1280px) {
  .featured__panel {
    padding: var(--space-16);
  }
}
</style>
