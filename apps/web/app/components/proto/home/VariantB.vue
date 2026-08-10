<script setup lang="ts">
// PROTOTYPE — Варіант B «Вітрина»: товар з першого екрана, жива сітка
import { motion } from "motion-v";
import {
  protoCategoryLabels,
  protoDelivery,
  protoProducts,
  protoReviews,
  type ProtoCategory,
} from "~/data/prototype";

const { todayWord } = usePrototypeShop();

const activeCategory = ref<ProtoCategory | "all">("all");
const categories: { key: ProtoCategory | "all"; label: string }[] = [
  { key: "all", label: "Усі" },
  { key: "mix", label: protoCategoryLabels.mix },
  { key: "mono", label: protoCategoryLabels.mono },
  { key: "composition", label: protoCategoryLabels.composition },
  { key: "gift", label: protoCategoryLabels.gift },
];

const visible = computed(() =>
  protoProducts.filter(
    (p) => activeCategory.value === "all" || p.category === activeCategory.value,
  ),
);
</script>

<template>
  <div>
    <!-- Компактний вступ -->
    <section class="border-b border-default">
      <div class="mx-auto max-w-(--ui-container) px-4 py-12 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ type: 'spring', stiffness: 80, damping: 16 }"
          >
            <p class="mb-2 text-xs font-semibold tracking-[0.35em] text-clay-600 uppercase">
              Львів · оновлено сьогодні вранці
            </p>
            <h1 class="font-display text-5xl text-highlighted sm:text-6xl">
              Букети на <span class="italic">{{ todayWord }}</span>
            </h1>
            <p class="mt-3 text-muted">
              Замовлення до {{ protoDelivery.cutoffHour }}:00 — доставка по Львову того ж дня
            </p>
          </motion.div>
          <motion.div
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ type: 'spring', stiffness: 80, damping: 16, delay: 0.15 }"
            class="flex items-center gap-6 text-sm text-muted"
          >
            <span class="flex items-center gap-2">
              <UIcon name="i-lucide-truck" class="size-4 text-moss-700" />
              за 2 години
            </span>
            <span class="flex items-center gap-2">
              <UIcon name="i-lucide-gift" class="size-4 text-moss-700" />
              пакування включено
            </span>
            <span class="flex items-center gap-2">
              <UIcon name="i-lucide-leaf" class="size-4 text-moss-700" />
              зібрано вранці
            </span>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Категорії + сітка -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-8 sm:px-6">
      <div
        class="sticky top-16 z-30 -mx-4 mb-8 bg-default/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6"
      >
        <div class="flex flex-wrap gap-2">
          <motion.button
            v-for="c in categories"
            :key="c.key"
            :while-press="{ scale: 0.94 }"
            :while-hover="{ y: -2 }"
            class="cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            :class="
              activeCategory === c.key
                ? 'border-moss-800 bg-moss-800 text-white'
                : 'border-default bg-default text-toned hover:border-moss-400'
            "
            @click="activeCategory = c.key"
          >
            {{ c.label }}
          </motion.button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        <motion.div
          v-for="(p, i) in visible"
          :key="p.id"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, amount: 0.15 }"
          :transition="{
            type: 'spring',
            stiffness: 90,
            damping: 17,
            delay: (i % 4) * 0.07,
          }"
        >
          <ProtoProductCard :product="p" />
        </motion.div>
      </div>
    </section>

    <!-- Відгуки стрічкою -->
    <section class="border-y border-default py-16">
      <div class="mx-auto max-w-(--ui-container) px-4 sm:px-6">
        <ProtoReveal>
          <h2 class="mb-8 font-display text-4xl text-highlighted">Нам пишуть</h2>
        </ProtoReveal>
        <div class="flex snap-x gap-5 overflow-x-auto pb-3">
          <motion.figure
            v-for="(r, i) in protoReviews"
            :key="r.name"
            :initial="{ opacity: 0, x: 40 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :in-view-options="{ once: true, amount: 0.3 }"
            :transition="{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.08 }"
            class="w-80 shrink-0 snap-start border border-default bg-default p-6"
          >
            <p class="font-display text-4xl leading-none text-clay-400/70">«</p>
            <blockquote class="text-sm leading-relaxed text-toned">
              {{ r.text }}
            </blockquote>
            <figcaption class="mt-4 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              {{ r.name }} · {{ r.source }}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>

    <!-- Про нас: компактний банер -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-16 sm:px-6">
      <ProtoReveal>
        <div
          class="grid items-center gap-8 border border-default bg-moss-50 p-8 md:grid-cols-[auto_1fr_auto] md:p-10"
        >
          <img
            src="/prototype/rose-solo.jpg"
            alt="Marmúr"
            class="hidden aspect-3/4 w-36 object-cover md:block"
          />
          <div>
            <h2 class="font-display text-3xl text-highlighted">
              Майстерня Marmúr — квіти і навчання флористики
            </h2>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Збираємо букети руками з 2019 року і вчимо цього інших. Приходьте по квіти — або по
              професію.
            </p>
          </div>
          <div class="flex gap-3">
            <UButton
              variant="outline"
              color="neutral"
              class="rounded-full px-6"
              to="/prototype/about"
              >Про нас</UButton
            >
            <UButton color="primary" class="rounded-full px-6" to="/prototype/school"
              >Навчання</UButton
            >
          </div>
        </div>
      </ProtoReveal>
    </section>
  </div>
</template>
