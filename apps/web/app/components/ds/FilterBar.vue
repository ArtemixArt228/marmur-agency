<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/FilterBar.
 * Тихі текстові кнопки, активну позначає риска. Без чипів і без рамок.
 */
export interface DsFilter {
  key: string;
  label: string;
}

const props = defineProps<{
  filters: DsFilter[];
  modelValue: string;
  /** Правий бік рейки: кількість позицій або будь-яка мета-примітка */
  count?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <div class="ds-filters">
    <div class="ds-filters__list">
      <button
        v-for="f in props.filters"
        :key="f.key"
        type="button"
        class="ds-filters__item"
        :class="{ 'ds-filters__item--active': f.key === props.modelValue }"
        :aria-pressed="f.key === props.modelValue"
        @click="emit('update:modelValue', f.key)"
      >
        {{ f.label }}
      </button>
    </div>
    <span v-if="props.count" class="ds-filters__count">{{ props.count }}</span>
  </div>
</template>

<style scoped>
.ds-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
}

/*
 * Таб-рейка Peak: горизонтальний скрол замість переносу, активна вкладка —
 * заливка. Кути лишаються прямими: кругла таблетка поруч із кадром, у якого
 * радіус 0, виглядала б позиченою (§9 spec 2026-08-12).
 */
.ds-filters__list {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
}

.ds-filters__list::-webkit-scrollbar {
  display: none;
}

.ds-filters__item {
  flex: none;
  scroll-snap-align: start;
  min-height: 40px;
  padding: 0 20px;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font: var(--type-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label-sm);
  color: var(--color-foreground-muted);
  white-space: nowrap;
  transition: var(--transition-color);
}

.ds-filters__item:hover {
  border-color: var(--color-border-strong);
  color: var(--color-foreground);
}

.ds-filters__item--active {
  background: var(--color-foreground);
  border-color: var(--color-foreground);
  color: var(--color-foreground-inverse);
}

.ds-filters__count {
  /* На вузьких екранах рейка переноситься — лічильник має лишитись праворуч */
  margin-left: auto;
  font: var(--type-mono);
  font-variant-numeric: tabular-nums;
  color: var(--color-foreground-subtle);
}
</style>
