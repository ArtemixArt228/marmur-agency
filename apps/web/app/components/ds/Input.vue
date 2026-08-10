<script setup lang="ts">
/**
 * Marmúr DS → components/forms/Input.
 * Біле поле, 1px sand, 2px радіус. Підпис — малий сансовий шар.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    hint?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    invalid?: boolean;
    autocomplete?: string;
    /** > 1 рендерить textarea замість input */
    rows?: number;
  }>(),
  { type: "text", modelValue: "" },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

// Решта атрибутів (inputmode, keydown, name…) їде на сам контрол, а не на
// обгортку — інакше вони мовчки нікуди не діють.
defineOptions({ inheritAttrs: false });

const uid = useId();
const inputId = computed(() => props.id ?? `ds-input-${uid}`);
const hintId = computed(() => `${inputId.value}-hint`);
</script>

<template>
  <div class="ds-field">
    <label v-if="props.label" class="ds-field__label" :for="inputId">
      {{ props.label }}
    </label>
    <textarea
      v-if="props.rows && props.rows > 1"
      :id="inputId"
      class="ds-field__control ds-field__control--area"
      :class="{ 'ds-field__control--invalid': props.invalid }"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :required="props.required"
      :aria-describedby="props.hint ? hintId : undefined"
      :aria-invalid="props.invalid || undefined"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :id="inputId"
      class="ds-field__control"
      :class="{ 'ds-field__control--invalid': props.invalid }"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :autocomplete="props.autocomplete"
      :aria-describedby="props.hint ? hintId : undefined"
      :aria-invalid="props.invalid || undefined"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span
      v-if="props.hint"
      :id="hintId"
      class="ds-field__hint"
      :class="{ 'ds-field__hint--invalid': props.invalid }"
    >
      {{ props.hint }}
    </span>
  </div>
</template>

<style scoped>
.ds-field {
  display: block;
}

.ds-field__label {
  display: block;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
  margin-bottom: var(--space-3);
}

.ds-field__control {
  width: 100%;
  height: var(--touch-target);
  padding: 0 var(--space-4);
  background: var(--color-background-alt);
  color: var(--color-foreground);
  font: var(--type-body);
  font-size: var(--text-small);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  transition: var(--transition-color);
}

.ds-field__control--area {
  height: auto;
  padding: var(--space-3) var(--space-4);
  line-height: var(--leading-body);
  resize: vertical;
}

.ds-field__control:focus {
  border-color: var(--color-border-strong);
}

.ds-field__control--invalid {
  border-color: var(--color-brand);
}

.ds-field__control::placeholder {
  color: var(--color-foreground-subtle);
}

.ds-field__hint {
  display: block;
  font: var(--type-small);
  font-size: var(--text-meta);
  color: var(--color-foreground-subtle);
  margin-top: var(--space-2);
}

.ds-field__hint--invalid {
  color: var(--color-brand);
}
</style>
