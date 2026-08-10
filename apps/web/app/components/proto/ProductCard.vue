<script setup lang="ts">
// PROTOTYPE — картка товару на DsProductCard.
// Плитка безрамкова й без плаваючої кнопки «додати» (§30): додаємо в кошик
// на сторінці товару, тут — тільки фото, назва, склад і ціна.
import type { ProtoProduct } from "~/data/prototype";

const props = defineProps<{ product: ProtoProduct }>();

/** Дескриптор — перелік складу, а не рекламний текст (§9) */
const descriptor = computed(() => props.product.composition?.join(", "));
</script>

<template>
  <DsProductCard
    :name="props.product.name"
    :descriptor="descriptor"
    :image="props.product.photo"
    :to="`/prototype/product/${props.product.id}`"
    :note="props.product.available ? undefined : 'на завтра'"
  >
    <template #price>
      <ProtoPrice :product="props.product" />
    </template>
  </DsProductCard>
</template>
