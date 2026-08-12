<script setup lang="ts">
/**
 * PROTOTYPE — вітрина дня. Архетип Peak «Best Sellers»: таб-рейка одразу
 * під заголовком, під нею рядок карток із точками.
 *
 * Таби фільтрують за бюджетом, а не за категорією: категорії отримують
 * цілу мозаїку нижче, і два входи в те саме дублювали б навігацію.
 */
import { protoBudgets, protoProducts } from "~/data/prototype";

const { todayWord } = usePrototypeShop();

const activeBudget = ref<string>("all");

const bouquets = computed(() => {
  const budget = protoBudgets.find((b) => b.key === activeBudget.value) ?? protoBudgets[0]!;
  return protoProducts
    .filter((p) => ["mix", "mono", "baskets"].includes(p.category) && budget.test(p.price))
    .sort((a, b) => Number(b.available) - Number(a.available));
});
</script>

<template>
  <section id="today" class="rail ds-container ds-section">
    <DsReveal>
      <DsSectionHeading
        eyebrow="Вітрина дня"
        :title="`Букети ${todayWord}`"
        lede="Асортимент збирається щоранку, тому щодня він інший."
      >
        <template #action>
          <DsTextLink to="/prototype/catalog" arrow>Увесь каталог</DsTextLink>
        </template>
      </DsSectionHeading>
    </DsReveal>

    <DsFilterBar
      v-model="activeBudget"
      class="rail__filters"
      :filters="protoBudgets.map((b) => ({ key: b.key, label: b.label }))"
      :count="`${bouquets.length} позицій`"
    />

    <DsCarousel :count="bouquets.length" class="rail__carousel">
      <ProtoProductCard v-for="p in bouquets" :key="p.id" :product="p" />
    </DsCarousel>

    <p v-if="bouquets.length === 0" class="rail__empty ds-body ds-muted">
      У цьому бюджеті сьогодні нічого не лишилось — гляньте сусідній.
    </p>
  </section>
</template>

<style scoped>
.rail {
  scroll-margin-top: var(--header-height);
}

.rail__filters {
  margin-top: var(--space-12);
}

.rail__carousel {
  margin-top: var(--space-12);
}

.rail__empty {
  margin-top: var(--space-12);
}
</style>
