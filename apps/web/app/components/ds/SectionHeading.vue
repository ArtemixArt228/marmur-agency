<script setup lang="ts">
/**
 * Marmúr DS → components/editorial/SectionHeading.
 * Нумерація секцій «01 —» — редакційний прийом головної сторінки.
 */
const props = withDefaults(
  defineProps<{
    index?: string;
    eyebrow?: string;
    title: string;
    lede?: string;
    align?: "left" | "center";
    tone?: "default" | "inverse";
  }>(),
  { align: "left", tone: "default" },
);
</script>

<template>
  <header
    class="ds-heading"
    :class="[`ds-heading--${props.align}`, { 'ds-heading--inverse': props.tone === 'inverse' }]"
  >
    <div class="ds-heading__body">
      <p v-if="props.index || props.eyebrow" class="ds-heading__eyebrow">
        <span v-if="props.index">{{ props.index }}</span>
        <span v-if="props.eyebrow">{{ props.eyebrow }}</span>
      </p>
      <h2 class="ds-heading__title">{{ props.title }}</h2>
      <p v-if="props.lede" class="ds-heading__lede">{{ props.lede }}</p>
    </div>
    <slot name="action" />
  </header>
</template>

<style scoped>
.ds-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.ds-heading--left {
  text-align: left;
}

.ds-heading--center {
  text-align: center;
  justify-content: center;
}

.ds-heading__body {
  max-width: var(--container-narrow);
}

.ds-heading__eyebrow {
  display: flex;
  gap: var(--space-4);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
  margin-bottom: var(--space-6);
}

.ds-heading--center .ds-heading__eyebrow {
  justify-content: center;
}

.ds-heading__title {
  font: var(--type-h2);
  letter-spacing: var(--tracking-heading);
  color: var(--color-foreground);
}

.ds-heading__lede {
  margin-top: var(--space-6);
  font: var(--type-body);
  color: var(--color-foreground-muted);
  max-width: 52ch;
}

.ds-heading--center .ds-heading__lede {
  margin-inline: auto;
}

.ds-heading--inverse .ds-heading__eyebrow,
.ds-heading--inverse .ds-heading__lede {
  color: var(--color-foreground-subtle);
}

.ds-heading--inverse .ds-heading__title {
  color: var(--color-foreground-inverse);
}
</style>
