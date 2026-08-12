<script setup lang="ts">
// PROTOTYPE — сторінка товару: галерея ліворуч, липка колонка покупки
// праворуч (§21). Друга й остання липка річ на сайті після шапки.
import { protoCategoryLabels, protoProducts } from "~/data/prototype";

definePageMeta({ layout: "prototype" });

const route = useRoute();
const { addToCart, todayWord } = usePrototypeShop();

const product = computed(() => protoProducts.find((p) => p.id === route.params.id));

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: "Букет не знайдено" });
}

useSeoMeta({ title: () => `${product.value?.name ?? "Товар"} — Marmúr` });

const qty = ref(1);

const addons = computed(() =>
  protoProducts.filter((p) => p.category === "gift" && p.id !== product.value?.id).slice(0, 3),
);
</script>

<template>
  <div v-if="product" class="ds-container ds-section product">
    <nav class="ds-meta ds-subtle product__crumbs">
      <NuxtLink to="/prototype/catalog" class="product__crumb">Каталог</NuxtLink>
      <span>·</span>
      <NuxtLink :to="`/prototype/catalog?category=${product.category}`" class="product__crumb">
        {{ protoCategoryLabels[product.category] }}
      </NuxtLink>
      <span>·</span>
      <span>{{ product.name }}</span>
    </nav>

    <div class="ds-split product__body">
      <DsEditorialImage
        :src="product.photo"
        :alt="product.name"
        ratio="var(--ratio-editorial)"
        :hover-zoom="false"
        loading="eager"
      />

      <div class="product__buy">
        <h1 class="ds-h1 product__name">{{ product.name }}</h1>
        <ProtoPrice :product="product" size="lg" class="product__price" />

        <p class="ds-body ds-muted product__description">{{ product.description }}</p>

        <div v-if="product.composition" class="product__composition">
          <p class="ds-meta ds-subtle">Склад</p>
          <ul class="product__tags">
            <li v-for="flower in product.composition" :key="flower">
              <DsTag>{{ flower }}</DsTag>
            </li>
          </ul>
        </div>

        <p v-if="!product.available" class="ds-small product__notice">
          Сьогодні вже розібрали. Замовте зараз, і завтра вранці зберемо свіжий та привеземо першим
          вікном.
        </p>

        <div class="product__actions">
          <DsQuantityStepper v-model="qty" />
          <DsButton
            variant="premium"
            size="lg"
            class="product__add"
            @click="addToCart(product.id, qty)"
          >
            {{ product.available ? `Замовити на ${todayWord}` : "Замовити на завтра" }}
          </DsButton>
        </div>

        <p class="ds-small ds-subtle product__reassurance">
          Якщо букета раптом не стане, флорист запропонує заміну рівної або більшої вартості чи
          миттєво поверне оплату.
        </p>
      </div>
    </div>

    <!-- Доповнення: 2–3 подарунки в тему, у той самий кошик -->
    <section v-if="product.category !== 'gift'" class="product__addons">
      <DsSectionHeading eyebrow="Доповнити букет" title="До цього букета" />
      <div class="product__addons-grid">
        <div v-for="a in addons" :key="a.id" class="product__addon">
          <ProtoProductCard :product="a" />
          <DsButton variant="quiet" size="sm" class="product__addon-add" @click="addToCart(a.id)">
            Додати
          </DsButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product__crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  color: var(--color-foreground-subtle);
}

.product__crumb {
  color: inherit;
  text-decoration: none;
}

.product__crumb:hover {
  color: var(--color-foreground);
  opacity: 1;
}

.product__body {
  margin-top: var(--space-12);
}

@media (min-width: 1024px) {
  .product__buy {
    position: sticky;
    top: calc(var(--header-height) + var(--space-8));
  }
}

.product__price {
  margin-top: var(--space-6);
}

.product__description {
  margin-top: var(--space-8);
  max-width: 46ch;
}

.product__composition {
  margin-top: var(--space-8);
  display: grid;
  gap: var(--space-3);
}

.product__tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.product__notice {
  margin-top: var(--space-8);
  padding: var(--space-4) var(--space-6);
  border: var(--border-hairline);
  border-radius: var(--radius-sm);
  background: var(--color-surface-sunken);
  color: var(--color-foreground-muted);
  max-width: 46ch;
}

.product__actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.product__add {
  flex: 1 1 auto;
}

.product__reassurance {
  margin-top: var(--space-4);
  max-width: 46ch;
}

.product__addons {
  margin-top: var(--space-section);
  padding-top: var(--space-12);
  border-top: var(--border-hairline);
}

.product__addons-grid {
  margin-top: var(--space-12);
  display: grid;
  gap: var(--gutter);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .product__addons-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.product__addon-add {
  margin-top: var(--space-4);
}
</style>
