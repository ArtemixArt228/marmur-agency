<script setup lang="ts">
// PROTOTYPE — «Букети на сьогодні»: сітка доступних букетів + фільтр бюджету.
import { protoProducts } from "~/data/prototype";

const { todayWord } = usePrototypeShop();

const budgets = [
  { key: "all", label: "Усі", test: () => true },
  { key: "lt1000", label: "до 1 000 ₴", test: (p: number) => p < 1000 },
  {
    key: "1000-1500",
    label: "1 000–1 500 ₴",
    test: (p: number) => p >= 1000 && p <= 1500,
  },
  { key: "gt1500", label: "понад 1 500 ₴", test: (p: number) => p > 1500 },
] as const;

const activeBudget = ref<string>("all");

const bouquets = computed(() => {
  const budget = budgets.find((b) => b.key === activeBudget.value) ?? budgets[0]!;
  // Весільні букети й подарунки — не «на сьогодні»: вони за заявкою/доповненням
  return protoProducts
    .filter((p) => ["mix", "mono", "baskets"].includes(p.category) && budget.test(p.price))
    .sort((a, b) => Number(b.available) - Number(a.available));
});
</script>

<template>
  <section id="today" class="ds-container ds-section proto-today">
    <DsReveal>
      <DsSectionHeading
        index="01 —"
        eyebrow="Вітрина дня"
        :title="`Букети на ${todayWord}`"
        lede="Асортимент збирається щоранку, тому щодня він інший. Позиції з міткою «на завтра» сьогодні вже розібрали."
      />
    </DsReveal>

    <DsFilterBar
      v-model="activeBudget"
      class="proto-today__filters"
      :filters="budgets.map((b) => ({ key: b.key, label: b.label }))"
      :count="`${bouquets.length} позицій`"
    />

    <div class="ds-grid ds-grid-row proto-today__grid">
      <DsReveal v-for="(p, i) in bouquets" :key="p.id" :delay="(i % 4) * 70">
        <ProtoProductCard :product="p" />
      </DsReveal>
    </div>

    <p v-if="bouquets.length === 0" class="proto-today__empty ds-body ds-muted">
      У цьому бюджеті сьогодні нічого не лишилось — гляньте сусідній.
    </p>
  </section>
</template>

<style scoped>
.proto-today {
  scroll-margin-top: var(--header-height);
}

.proto-today__filters {
  margin-top: var(--space-12);
}

.proto-today__grid {
  margin-top: var(--space-12);
}

.proto-today__empty {
  margin-top: var(--space-12);
}
</style>
