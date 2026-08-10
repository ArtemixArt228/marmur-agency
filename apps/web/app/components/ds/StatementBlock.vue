<script setup lang="ts">
/**
 * Marmúr DS → components/editorial/StatementBlock.
 * Великий серифний вислів — голос бренду в hero й на переходах між секціями.
 * До десяти слів, переноси ставляться руками там, де ламається зміст.
 */
const props = withDefaults(
  defineProps<{
    size?: "display" | "h1" | "h2";
    tone?: "default" | "inverse";
    attribution?: string;
    align?: "left" | "center";
  }>(),
  { size: "display", tone: "default", align: "left" },
);
</script>

<template>
  <blockquote
    class="ds-statement"
    :class="[`ds-statement--${props.align}`, { 'ds-statement--inverse': props.tone === 'inverse' }]"
  >
    <p class="ds-statement__text" :class="`ds-statement__text--${props.size}`">
      <slot />
    </p>
    <footer v-if="props.attribution" class="ds-statement__attribution">
      {{ props.attribution }}
    </footer>
  </blockquote>
</template>

<style scoped>
.ds-statement {
  margin: 0;
  color: var(--color-foreground);
}

.ds-statement--left {
  text-align: left;
}

.ds-statement--center {
  text-align: center;
}

.ds-statement--inverse {
  color: var(--color-foreground-inverse);
}

.ds-statement__text {
  letter-spacing: var(--tracking-display);
  text-wrap: balance;
}

.ds-statement__text--display {
  font: var(--type-display);
}

.ds-statement__text--h1 {
  font: var(--type-h1);
}

.ds-statement__text--h2 {
  font: var(--type-h2);
}

.ds-statement__attribution {
  margin-top: var(--space-8);
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
}

.ds-statement--inverse .ds-statement__attribution {
  color: var(--color-foreground-subtle);
}
</style>
