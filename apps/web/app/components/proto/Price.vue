<script setup lang="ts">
// PROTOTYPE — ціна з урахуванням знижки лояльності.
// §10: табличні цифри, розділені тисячі, валюта після числа.
// Авторизованому базова ціна лишається видимою закресленою, поруч — відсоток.
import type { ProtoProduct } from "~/data/prototype";

const props = withDefaults(defineProps<{ product: ProtoProduct; size?: "sm" | "lg" }>(), {
  size: "sm",
});

const { discountPercent, finalPrice, formatUah } = usePrototypeShop();
const hasDiscount = computed(() => discountPercent.value > 0);
</script>

<template>
  <span class="proto-price" :class="`proto-price--${props.size}`">
    <span class="proto-price__value ds-price">
      {{ formatUah(finalPrice(props.product)) }}
    </span>
    <template v-if="hasDiscount">
      <s class="proto-price__base ds-price">{{ formatUah(props.product.price) }}</s>
      <span class="proto-price__badge">−{{ discountPercent }}%</span>
    </template>
  </span>
</template>

<style scoped>
.proto-price {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-3);
}

.proto-price__value {
  font: var(--type-small);
  /* Скорочення font скидає варіант цифр — вертаємо табличні після нього */
  font-variant-numeric: tabular-nums;
  color: var(--color-foreground);
}

.proto-price--lg .proto-price__value {
  font: var(--type-mono-lg);
  font-variant-numeric: tabular-nums;
  font-size: 26px;
}

.proto-price__base {
  font: var(--type-small);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-meta);
  color: var(--color-foreground-subtle);
  text-decoration-thickness: 1px;
}

.proto-price--lg .proto-price__base {
  font-size: var(--text-small);
}

.proto-price__badge {
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-brand);
}
</style>
