<script setup lang="ts">
/**
 * Marmúr DS → components/forms/Select.
 * Нативний select із власним шевроном — без кастомного дропдауна.
 */
export interface DsSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = defineProps<{
  modelValue: string;
  options: (string | DsSelectOption)[];
  label?: string;
  id?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const uid = useId();
const selectId = computed(() => props.id ?? `ds-select-${uid}`);
const normalized = computed<DsSelectOption[]>(() =>
  props.options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)),
);
</script>

<template>
  <div class="ds-select">
    <label v-if="props.label" class="ds-select__label" :for="selectId">
      {{ props.label }}
    </label>
    <span class="ds-select__wrap">
      <select
        :id="selectId"
        class="ds-select__control"
        :value="props.modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="o in normalized" :key="o.value" :value="o.value" :disabled="o.disabled">
          {{ o.label }}
        </option>
      </select>
      <DsIcon name="chevron-down" :size="15" class="ds-select__chevron" />
    </span>
  </div>
</template>

<style scoped>
.ds-select {
  display: block;
}

.ds-select__label {
  display: block;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
  margin-bottom: var(--space-3);
}

.ds-select__wrap {
  position: relative;
  display: block;
}

.ds-select__control {
  appearance: none;
  width: 100%;
  height: var(--touch-target);
  padding: 0 var(--space-8) 0 var(--space-4);
  background: var(--color-background-alt);
  color: var(--color-foreground);
  font: var(--type-body);
  font-size: var(--text-small);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  cursor: pointer;
  transition: var(--transition-color);
}

.ds-select__control:focus {
  border-color: var(--color-border-strong);
}

.ds-select__chevron {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-foreground-muted);
  pointer-events: none;
}
</style>
