<script setup lang="ts">
/**
 * PROTOTYPE — «Завітайте». Архетип Peak «Find a retailer»: панель
 * surface-sunken, заголовок з одним курсивним словом, дві інлайн-рейки.
 */
import { protoDelivery, protoOccasions } from "~/data/prototype";
</script>

<template>
  <section class="visit ds-container ds-section">
    <DsReveal>
      <div class="visit__panel">
        <p class="ds-meta visit__eyebrow">[ Завітайте ]</p>
        <h2 class="visit__title">Побачити квіти <em>наживо</em>.</h2>

        <p class="visit__facts ds-mono">
          {{ protoDelivery.pickup.address }} · {{ protoDelivery.pickup.hours }} ·
          {{ protoDelivery.phone }}
        </p>

        <hr class="ds-rule visit__rule" />

        <p class="ds-meta ds-subtle visit__label">Або скажіть, для кого</p>
        <div class="visit__occasions">
          <NuxtLink v-for="o in protoOccasions" :key="o.label" :to="o.to" class="visit__occasion">
            {{ o.label }}
          </NuxtLink>
        </div>
      </div>
    </DsReveal>
  </section>
</template>

<style scoped>
.visit__panel {
  background: var(--color-surface-sunken);
  padding: var(--space-16) var(--gutter-lg);
}

.visit__eyebrow {
  color: var(--color-foreground-muted);
  margin-bottom: var(--space-6);
}

/* Курсив на одному слові — другий і останній дозволений випадок, §3 spec */
.visit__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
}

.visit__title em {
  font-style: italic;
}

.visit__facts {
  margin-top: var(--space-8);
  color: var(--color-foreground-muted);
}

.visit__rule {
  margin-block: var(--space-12);
}

.visit__label {
  margin-bottom: var(--space-6);
}

.visit__occasions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4) var(--space-8);
}

.visit__occasion {
  font: var(--type-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label-sm);
  color: var(--color-foreground-muted);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: var(--transition-color);
}

.visit__occasion:hover {
  color: var(--color-foreground);
  border-bottom-color: var(--color-foreground);
  opacity: 1;
  text-decoration: none;
}
</style>
