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
  padding-bottom: var(--space-6);
  border-bottom: var(--border-hairline);
}

.ds-filters__list {
  display: flex;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.ds-filters__item {
  background: none;
  border: none;
  padding: var(--space-2) 0;
  cursor: pointer;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
  border-bottom: 1px solid transparent;
  transition: var(--transition-color);
}

.ds-filters__item--active {
  color: var(--color-foreground);
  border-bottom-color: var(--color-foreground);
}

.ds-filters__count {
  /* На вузьких екранах рейка переноситься — лічильник має лишитись праворуч */
  margin-left: auto;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-subtle);
}
</style>
