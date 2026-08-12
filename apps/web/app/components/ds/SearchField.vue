<script setup lang="ts">
/**
 * Marmúr DS → components/forms/SearchField.
 * Поле в шапці. Submit віддає нормалізований запит; маршрут вибирає власник.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    tone?: "default" | "inverse";
  }>(),
  { modelValue: "", placeholder: "Пошук", tone: "default" },
);

const emit = defineEmits<{
  "update:modelValue": [string];
  submit: [string];
}>();

function onSubmit() {
  const q = props.modelValue.trim();
  if (q.length === 0) return;
  emit("submit", q);
}
</script>

<template>
  <form
    class="ds-search"
    :class="{ 'ds-search--inverse': props.tone === 'inverse' }"
    role="search"
    @submit.prevent="onSubmit"
  >
    <DsIcon name="search" :size="16" class="ds-search__icon" />
    <input
      :value="props.modelValue"
      type="search"
      class="ds-search__input"
      :placeholder="props.placeholder"
      :aria-label="props.placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </form>
</template>

<style scoped>
.ds-search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  min-height: 40px;
  padding-inline: var(--space-3);
  background: var(--color-surface-sunken);
  border: var(--border-hairline);
  border-radius: var(--radius-md);
  color: var(--color-foreground-muted);
}

.ds-search__icon {
  flex: none;
}

.ds-search__input {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font: var(--type-small);
  color: var(--color-foreground);
}

.ds-search__input::placeholder {
  color: var(--color-foreground-muted);
}

.ds-search__input::-webkit-search-cancel-button {
  filter: grayscale(1);
}

/* Над hero шапка прозора — поле мусить читатись на фотографії */
.ds-search--inverse {
  background: rgb(245 241 234 / 0.12);
  border-color: var(--color-border-inverse);
  color: var(--color-foreground-inverse);
}

.ds-search--inverse .ds-search__input {
  color: var(--color-foreground-inverse);
}

.ds-search--inverse .ds-search__input::placeholder {
  color: var(--color-foreground-inverse);
  opacity: 0.7;
}
</style>
