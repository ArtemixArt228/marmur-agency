<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/FilterBar.
 * Рейка вкладок у рамках, активну позначає заливка. Правий бік — слот `end`:
 * за замовчуванням лічильник, на головній туди стають стрілки каруселі.
 */
export interface DsFilter {
  key: string;
  label: string;
}

const props = defineProps<{
  filters: DsFilter[];
  modelValue: string;
  /** Правий бік рейки, якщо слот `end` порожній: кількість позицій чи мета */
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
    <div v-if="$slots.end || props.count" class="ds-filters__end">
      <slot name="end">
        <span class="ds-filters__count">{{ props.count }}</span>
      </slot>
    </div>
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
 * заливка. Кути прямі: кругла таблетка поруч із кадром, у якого радіус 0,
 * виглядала б позиченою (§9 spec 2026-08-12).
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
  border-radius: var(--radius-none);
  font: var(--type-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label-sm);
  color: var(--color-foreground-muted);
  white-space: nowrap;
  transition: var(--transition-color);
}

/*
 * Ховер неактивної вкладки не чіпає активну: раніше обидва правила мали ту саму
 * специфічність, тож `color: var(--color-foreground)` перекривав інверсний текст
 * і активна вкладка на ховері ставала чорним прямокутником без напису.
 */
.ds-filters__item:not(.ds-filters__item--active):hover {
  border-color: var(--color-border-strong);
  color: var(--color-foreground);
}

/*
 * Активна вкладка залита брендовим espresso, а не чорним: чорна заливка поруч
 * із ivory-тлом читається як помилка рендера, а коричнева лишається в палітрі.
 *
 * Ховер підводить її до тла — той самий espresso, тільки світліший, тож
 * коричневе стає видимішим, а не глибшим. `--color-brand-dark` тут не годиться:
 * chocolate темніший за espresso і на око повертає ту саму чорну плитку.
 * Проміжного токена між espresso й ivory немає, а дописати його не можна —
 * `colors.css` дзеркалить Claude Design, — тому міксуємо на місці.
 */
.ds-filters__item--active {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-foreground-inverse);
}

.ds-filters__item--active:hover {
  background: color-mix(in srgb, var(--color-brand) 84%, var(--color-background));
  border-color: color-mix(in srgb, var(--color-brand) 84%, var(--color-background));
}

.ds-filters__end {
  /* На вузьких екранах рейка переноситься — правий бік має лишитись праворуч */
  margin-left: auto;
}

.ds-filters__count {
  font: var(--type-mono);
  font-variant-numeric: tabular-nums;
  color: var(--color-foreground-subtle);
}
</style>
