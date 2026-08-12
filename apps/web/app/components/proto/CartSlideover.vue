<script setup lang="ts">
// PROTOTYPE — кошик у слайдовері. Єдине місце, де система дозволяє тінь
// (--shadow-drawer), і єдиний «картковий» блок — підсумок.
const {
  cart,
  isCartOpen,
  productById,
  finalPrice,
  formatUah,
  setQty,
  cartTotal,
  cartBaseTotal,
  discountPercent,
} = usePrototypeShop();

const items = computed(() =>
  cart.value.map((i) => ({ ...i, product: productById(i.productId)! })).filter((i) => i.product),
);
</script>

<template>
  <USlideover v-model:open="isCartOpen" title="Кошик" :ui="{ content: 'proto-cart' }">
    <template #body>
      <div v-if="items.length === 0" class="proto-cart__empty">
        <p class="ds-body ds-muted">Кошик поки порожній.</p>
        <DsButton
          variant="secondary"
          to="/prototype/catalog"
          icon-right="arrow-right"
          @click="isCartOpen = false"
        >
          Переглянути каталог
        </DsButton>
      </div>

      <div v-else>
        <DsCartLine
          v-for="item in items"
          :key="item.productId"
          :name="item.product.name"
          :variant="item.product.composition?.join(', ')"
          :image="item.product.photo"
          :quantity="item.qty"
          :total="formatUah(finalPrice(item.product) * item.qty)"
          :to="`/prototype/product/${item.product.id}`"
          @update:quantity="setQty(item.productId, $event)"
          @remove="setQty(item.productId, 0)"
        />
      </div>
    </template>

    <template v-if="items.length > 0" #footer>
      <div class="proto-cart__footer">
        <div v-if="discountPercent > 0" class="proto-cart__row">
          <span class="ds-meta ds-muted">Без знижки</span>
          <s class="ds-small ds-subtle ds-price">{{ formatUah(cartBaseTotal) }}</s>
        </div>
        <div class="proto-cart__row proto-cart__row--total">
          <span class="ds-meta">Разом</span>
          <span class="ds-price proto-cart__total">{{ formatUah(cartTotal) }}</span>
        </div>
        <p class="ds-small ds-subtle">Доставка розрахується під час оформлення</p>
        <DsButton variant="premium" full-width to="/prototype/checkout" @click="isCartOpen = false">
          Оформити
        </DsButton>
      </div>
    </template>
  </USlideover>
</template>

<style scoped>
.proto-cart__empty {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
  padding: var(--space-12) 0;
}

.proto-cart__footer {
  width: 100%;
  display: grid;
  gap: var(--space-4);
}

.proto-cart__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.proto-cart__row--total {
  padding-top: var(--space-4);
  border-top: var(--border-hairline);
}

.proto-cart__total {
  font: var(--type-mono-lg);
  font-size: 24px;
}
</style>

<style>
.proto-cart {
  box-shadow: var(--shadow-drawer);
}
</style>
