<script setup lang="ts">
// PROTOTYPE — каталог: товарні категорії + сервісні розділи (за заявкою).
import {
  protoBudgets,
  protoCategoryLabels,
  protoGiftSubcategories,
  protoProducts,
  protoServices,
  type ProtoCategory,
} from "~/data/prototype";

definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Каталог — Marmúr" });

const route = useRoute();
const router = useRouter();
const { todayWord } = usePrototypeShop();

const categories: { key: ProtoCategory | "all"; label: string }[] = [
  { key: "all", label: "Усі" },
  { key: "mix", label: protoCategoryLabels.mix },
  { key: "mono", label: protoCategoryLabels.mono },
  { key: "baskets", label: protoCategoryLabels.baskets },
  { key: "bride", label: protoCategoryLabels.bride },
  { key: "gift", label: protoCategoryLabels.gift },
];

const validKeys = new Set<string>([
  ...categories.map((c) => c.key),
  ...protoServices.map((s) => s.id),
]);

const active = computed(() => {
  const c = String(route.query.category ?? "all");
  return validKeys.has(c) ? c : "all";
});

const activeService = computed(() => protoServices.find((s) => s.id === active.value));

const activeBudget = computed(() => {
  const b = String(route.query.budget ?? "all");
  return protoBudgets.some((x) => x.key === b) ? b : "all";
});

const activeQuery = computed(() => String(route.query.q ?? "").trim());

/**
 * Три осі фільтра складають query цілком, тому кожен сетер мусить
 * переписати дві інші — інакше зміна категорії стирала б пошук.
 * Значення «all» і порожній запит просто не потрапляють в URL.
 */
function buildQuery(next: Partial<{ category: string; budget: string; q: string }>) {
  const category = next.category ?? active.value;
  const budget = next.budget ?? activeBudget.value;
  const q = next.q ?? activeQuery.value;

  const query: Record<string, string> = {};
  if (category !== "all") query.category = category;
  if (budget !== "all") query.budget = budget;
  if (q !== "") query.q = q;
  return query;
}

function setCategory(key: string) {
  router.replace({ query: buildQuery({ category: key }) });
}

function setBudget(key: string) {
  router.replace({ query: buildQuery({ budget: key }) });
}

function clearQuery() {
  router.replace({ query: buildQuery({ q: "" }) });
}

const visible = computed(() => {
  const budget = protoBudgets.find((b) => b.key === activeBudget.value) ?? protoBudgets[0]!;
  const q = activeQuery.value.toLowerCase();
  return protoProducts
    .filter((p) => active.value === "all" || p.category === active.value)
    .filter((p) => budget.test(p.price))
    .filter(
      (p) =>
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        (p.composition ?? []).some((c) => c.toLowerCase().includes(q)),
    )
    .sort((a, b) => Number(b.available) - Number(a.available));
});
</script>

<template>
  <div class="ds-container ds-section catalog">
    <DsSectionHeading
      :title="active === 'gift' ? 'Подарунки' : 'Каталог'"
      eyebrow="Асортимент дня"
      :lede="
        active === 'gift'
          ? `${protoGiftSubcategories.join(' · ')} — усе, що доповнює квіти.`
          : `Позиції з міткою «на завтра» сьогодні вже розібрали — завтра вранці вони знову в майстерні. Решта — на ${todayWord}.`
      "
    />

    <DsFilterBar
      class="catalog__filters"
      :filters="categories.map((c) => ({ key: c.key, label: c.label }))"
      :model-value="activeService ? '' : active"
      :count="activeService ? undefined : `${visible.length} позицій`"
      @update:model-value="setCategory"
    />

    <DsFilterBar
      v-if="!activeService"
      class="catalog__budgets"
      :filters="protoBudgets.map((b) => ({ key: b.key, label: b.label }))"
      :model-value="activeBudget"
      @update:model-value="setBudget"
    />

    <p v-if="activeQuery" class="catalog__query ds-small">
      За запитом «{{ activeQuery }}» — {{ visible.length }}
      <button type="button" class="catalog__query-clear ds-meta" @click="clearQuery">
        скинути
      </button>
    </p>

    <nav class="catalog__services">
      <span class="ds-meta ds-subtle">За заявкою</span>
      <button
        v-for="s in protoServices"
        :key="s.id"
        type="button"
        class="ds-meta catalog__service"
        :class="{ 'catalog__service--active': active === s.id }"
        @click="setCategory(s.id)"
      >
        {{ s.label }}
      </button>
      <NuxtLink to="/prototype/school" class="ds-meta catalog__service"> Навчання </NuxtLink>
    </nav>

    <!-- Сервісний розділ: опис + заявка, без кошика -->
    <div v-if="activeService" class="catalog__service-panel">
      <h2 class="ds-h2">{{ activeService.label }}</h2>
      <p class="ds-body ds-muted catalog__service-text">{{ activeService.text }}</p>
      <p class="ds-small ds-subtle catalog__service-note">
        Тут немає кошика — залиште заявку, і флорист звʼяжеться з вами особисто.
      </p>
      <DsButton class="catalog__service-cta" variant="premium" to="/prototype/school">
        Залишити заявку
      </DsButton>
    </div>

    <!-- Товарна сітка -->
    <div v-else class="ds-grid ds-grid-row catalog__grid">
      <DsReveal v-for="(p, i) in visible" :key="p.id" :delay="(i % 4) * 70">
        <ProtoProductCard :product="p" />
      </DsReveal>
    </div>
  </div>
</template>

<style scoped>
.catalog__filters {
  margin-top: var(--space-16);
}

.catalog__budgets {
  margin-top: var(--space-4);
}

.catalog__query {
  margin-top: var(--space-8);
  color: var(--color-foreground-muted);
}

.catalog__query-clear {
  margin-left: var(--space-4);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-foreground);
  border-bottom: 1px solid var(--color-border-strong);
}

.catalog__services {
  margin-top: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-4) var(--space-8);
}

.catalog__service {
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0 0 4px;
  cursor: pointer;
  color: var(--color-foreground-muted);
  text-decoration: none;
  transition: var(--transition-color);
}

.catalog__service:hover {
  color: var(--color-foreground);
  opacity: 1;
  text-decoration: none;
}

.catalog__service--active {
  color: var(--color-foreground);
  border-bottom-color: var(--color-foreground);
}

.catalog__service-panel {
  margin-top: var(--space-16);
  max-width: 60ch;
}

.catalog__service-text {
  margin-top: var(--space-6);
}

.catalog__service-note {
  margin-top: var(--space-3);
}

.catalog__service-cta {
  margin-top: var(--space-8);
}

.catalog__grid {
  margin-top: var(--space-16);
}
</style>
