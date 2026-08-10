<script setup lang="ts">
/** Marmúr DS → components/commerce/CartLine. Рядок кошика й міні-кошика. */
const props = withDefaults(
  defineProps<{
    name: string;
    /** Другий рядок: варіант, розмір, композиція */
    variant?: string;
    /** Уже відформатована сума за рядок */
    total: string;
    quantity?: number;
    image?: string;
    to?: string;
    removable?: boolean;
  }>(),
  { quantity: 1, removable: true },
);

const emit = defineEmits<{
  "update:quantity": [value: number];
  remove: [];
}>();
</script>

<template>
  <div class="ds-cart-line">
    <component
      :is="props.to ? resolveComponent('NuxtLink') : 'div'"
      :to="props.to"
      class="ds-cart-line__media"
    >
      <DsEditorialImage
        :src="props.image"
        :alt="props.name"
        ratio="var(--ratio-square)"
        fill="sunken"
        placeholder=""
        :hover-zoom="false"
      />
    </component>

    <div>
      <h4 class="ds-cart-line__name">{{ props.name }}</h4>
      <p v-if="props.variant" class="ds-cart-line__variant">{{ props.variant }}</p>
      <div class="ds-cart-line__controls">
        <DsQuantityStepper
          :model-value="props.quantity"
          @update:model-value="emit('update:quantity', $event)"
        />
        <button
          v-if="props.removable"
          type="button"
          class="ds-cart-line__remove"
          aria-label="Видалити"
          @click="emit('remove')"
        >
          <DsIcon name="x" :size="12" />
          Видалити
        </button>
      </div>
    </div>

    <span class="ds-cart-line__total ds-price">{{ props.total }}</span>
  </div>
</template>

<style scoped>
.ds-cart-line {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: var(--space-6);
  align-items: start;
  padding: var(--space-6) 0;
  border-bottom: var(--border-hairline);
}

.ds-cart-line__media {
  display: block;
  text-decoration: none;
}

.ds-cart-line__media:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-cart-line__name {
  font: var(--type-h3);
  font-size: 19px;
}

.ds-cart-line__variant {
  margin-top: var(--space-1);
  font: var(--type-small);
  font-size: var(--text-meta);
  color: var(--color-foreground-muted);
}

.ds-cart-line__controls {
  margin-top: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.ds-cart-line__remove {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-subtle);
  transition: var(--transition-color);
}

.ds-cart-line__remove:hover {
  color: var(--color-foreground);
}

.ds-cart-line__total {
  font: var(--type-small);
}
</style>
