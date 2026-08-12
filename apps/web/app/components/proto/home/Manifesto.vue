<script setup lang="ts">
 /**
 * PROTOTYPE — єдине застосування спліт-архетипу Peak («At the expense of
 * nobody»): кадр ліворуч, суцільна темна панель праворуч.
 */
</script>

<template>
  <section class="manifesto">
    <div class="manifesto__grid">
      <DsEditorialImage
        src="/prototype/rose-macro.jpg"
        alt="Макрозйомка троянди"
        ratio="var(--ratio-square)"
        class="manifesto__image"
      />

      <div class="manifesto__panel">
        <DsReveal>
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
            <DsButton variant="inverse" to="/prototype/about">Як ми працюємо</DsButton>
          </div>
        </DsReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifesto__grid {
  display: grid;
}

@media (min-width: 1024px) {
  .manifesto__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.manifesto__image {
  height: 100%;
}

.manifesto__panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  padding: var(--space-24) var(--gutter-lg);
}

.manifesto__eyebrow {
  color: var(--color-foreground-subtle);
  margin-bottom: var(--space-6);
}

.manifesto__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
  color: var(--color-foreground-inverse);
  max-width: 20ch;
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
</style>
