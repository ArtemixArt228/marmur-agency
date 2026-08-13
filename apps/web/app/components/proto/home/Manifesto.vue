<script setup lang="ts">
 /**
 * PROTOTYPE — єдина суцільна темна смуга сторінки. Архетип Peak «Your next
 * essential just dropped»: текст ліворуч, кадр праворуч у межах контейнера,
 * з полями зверху й знизу — фото не розпирає смугу до країв.
 */
</script>

<template>
  <section class="manifesto ds-section-dark ds-section">
    <div class="manifesto__grid ds-container">
      <DsReveal class="manifesto__body">
        <p class="ds-meta manifesto__eyebrow">[ Про нас ]</p>
        <h2 class="manifesto__title">
          Кожен букет збирається вручну в день доставки.<span
            class="manifesto__terminator"
            aria-hidden="true"
          >
            ——</span
          >
        </h2>
        <p class="manifesto__text">
          Готових наборів у нас немає. Флорист збирає букет під привід і під людину.
        </p>
        <div class="manifesto__action">
          <DsButton variant="inverse" size="lg" to="/prototype/about">Як ми працюємо</DsButton>
        </div>
      </DsReveal>

      <DsReveal :delay="120" class="manifesto__figure">
        <DsEditorialImage
          src="/prototype/hero-dark-rose.jpg"
          alt="Троянда у вечірньому саду"
          ratio="var(--ratio-square)"
        />
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.manifesto__grid {
  display: grid;
  gap: var(--space-12);
  align-items: center;
}

.manifesto__eyebrow {
  color: var(--color-foreground-subtle);
  margin-bottom: var(--space-6);
}

.manifesto__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
  color: var(--color-foreground-inverse);
}

.manifesto__terminator {
  color: var(--color-foreground-subtle);
}

.manifesto__text {
  margin-top: var(--space-6);
  font: var(--type-body);
  color: var(--color-foreground-inverse);
  opacity: 0.8;
  max-width: 44ch;
}

.manifesto__action {
  margin-top: var(--space-8);
}

@media (min-width: 1024px) {
  .manifesto__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--gutter-lg);
  }
}
</style>
