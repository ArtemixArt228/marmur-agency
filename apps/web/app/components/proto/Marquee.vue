<script setup lang="ts">
// PROTOTYPE — рейка фактів між hero і вітриною.
// Була нескінченна стрічка, що їхала весь час; §25 забороняє елементи, які
// анімуються постійно, тож той самий зміст лежить статично, малим сансом,
// розділений середньою крапкою.
const props = defineProps<{ items: string[] }>();
</script>

<template>
  <div class="proto-rail">
    <ul class="proto-rail__list">
      <li v-for="item in props.items" :key="item" class="proto-rail__item ds-meta">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.proto-rail {
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  padding: var(--space-6) var(--gutter-lg);
}

.proto-rail__list {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-8);
}

.proto-rail__item {
  color: var(--color-foreground-subtle);
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.proto-rail__item:not(:last-child)::after {
  content: "·";
  color: var(--color-border-inverse);
}
</style>
