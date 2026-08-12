<script setup lang="ts">
 /**
 * PROTOTYPE — «Нове цього тижня». Єдина суцільна темна смуга сторінки;
 * текстовий блок ліворуч, як у Peak.
 */
</script>

<template>
  <section class="whats-new ds-section-dark ds-section-lg">
    <div class="ds-container">
      <DsReveal>
        <div class="whats-new__body">
          <p class="ds-meta whats-new__eyebrow">[ Нове цього тижня ]</p>
          <h2 class="whats-new__title">Щотижня інші квіти.</h2>
          <p class="whats-new__text">
            Асортимент залежить від того, що привезли на ринок уранці. Те, що ви бачите сьогодні,
            завтра вже може зникнути з каталогу.
          </p>
          <div class="whats-new__action">
            <DsButton variant="inverse" size="lg" to="/prototype/catalog" icon-right="arrow-right">
              Дивитись нове
            </DsButton>
          </div>
        </div>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.whats-new__body {
  max-width: 52ch;
}

.whats-new__eyebrow {
  color: var(--color-foreground-subtle);
  margin-bottom: var(--space-6);
}

.whats-new__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
  color: var(--color-foreground-inverse);
}

.whats-new__text {
  margin-top: var(--space-6);
  font: var(--type-body);
  font-size: var(--text-body-lg);
  color: var(--color-foreground-inverse);
  opacity: 0.82;
}

.whats-new__action {
  margin-top: var(--space-8);
}
</style>
