<script setup lang="ts">
/** Marmúr DS → components/forms/QuantityStepper. */
const props = withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    label?: string;
  }>(),
  { min: 1, max: 99, label: "Кількість" },
);

const emit = defineEmits<{ "update:modelValue": [value: number] }>();
</script>

<template>
  <div class="ds-stepper" role="group" :aria-label="props.label">
    <button
      type="button"
      class="ds-stepper__button"
      aria-label="Менше"
      :disabled="props.modelValue <= props.min"
      @click="emit('update:modelValue', Math.max(props.min, props.modelValue - 1))"
    >
      <DsIcon name="minus" :size="14" />
    </button>
    <span class="ds-stepper__value">{{ props.modelValue }}</span>
    <button
      type="button"
      class="ds-stepper__button"
      aria-label="Більше"
      :disabled="props.modelValue >= props.max"
      @click="emit('update:modelValue', Math.min(props.max, props.modelValue + 1))"
    >
      <DsIcon name="plus" :size="14" />
    </button>
  </div>
</template>

<style scoped>
.ds-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-background-alt);
}

.ds-stepper__button {
  width: var(--touch-target);
  height: var(--touch-target);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--color-foreground);
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-standard);
}

.ds-stepper__button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.ds-stepper__value {
  min-width: 36px;
  text-align: center;
  font: var(--type-small);
  font-variant-numeric: tabular-nums;
}
</style>
