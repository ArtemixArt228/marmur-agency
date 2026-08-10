<script setup lang="ts">
// PROTOTYPE — Варіант A «Едиторіал»: велика типографіка, стагер-анімації, паралакс
import { motion, useScroll, useTransform } from "motion-v";
import { protoDelivery, protoProducts, protoReviews } from "~/data/prototype";

const { todayWord, isBeforeCutoff } = usePrototypeShop();

const todayBouquets = computed(() =>
  protoProducts.filter((p) => p.category !== "gift" && p.available).slice(0, 6),
);

const { scrollY } = useScroll();
const heroPhotoY = useTransform(scrollY, [0, 900], [0, -90]);

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const heroWord = {
  hidden: { y: "0.7em", opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
};
const heroAfter = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 16 },
  },
};

const line1 = ["Квіти,", "зібрані"];
const line2 = ["сьогодні", "вранці"];

const benefits = [
  {
    n: "01",
    title: "Доставка за 2 години",
    text: `По Львову — у зручне вам вікно. Замовлення до ${protoDelivery.cutoffHour}:00 привеземо того ж дня.`,
  },
  {
    n: "02",
    title: "Пакування, яке хочеться фотографувати",
    text: "Крафт, шовкова стрічка й листівка, підписана від руки — усе вже включено.",
  },
  {
    n: "03",
    title: "Свіжість без компромісів",
    text: "Не продаємо вчорашні квіти. Те, що не пішло сьогодні, — їде у кавʼярні по сусідству.",
  },
];
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto max-w-(--ui-container) px-4 pt-14 pb-16 sm:px-6">
      <div class="grid items-center gap-12 lg:grid-cols-12">
        <motion.div
          class="lg:col-span-7"
          :variants="heroContainer"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            :variants="heroAfter"
            class="mb-8 text-xs font-semibold tracking-[0.35em] text-moss-700 uppercase"
          >
            Квіткова майстерня — Львів
          </motion.p>
          <h1 class="font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.95] text-highlighted">
            <span class="block overflow-hidden">
              <motion.span
                v-for="w in line1"
                :key="w"
                :variants="heroWord"
                class="mr-[0.22em] inline-block"
                >{{ w }}</motion.span
              >
            </span>
            <span class="block overflow-hidden">
              <motion.span
                v-for="w in line2"
                :key="w"
                :variants="heroWord"
                class="mr-[0.22em] inline-block italic"
                :class="w === 'вранці' ? 'text-clay-600' : ''"
                >{{ w }}</motion.span
              >
            </span>
          </h1>
          <motion.p :variants="heroAfter" class="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Щодня новий асортимент. Замовте до
            {{ protoDelivery.cutoffHour }}:00 — і букет буде у дверях {{ todayWord }}.
          </motion.p>
          <motion.div :variants="heroAfter" class="mt-10 flex flex-wrap items-center gap-6">
            <UButton
              size="xl"
              color="primary"
              to="/prototype/catalog"
              trailing-icon="i-lucide-arrow-right"
              class="rounded-full px-7"
            >
              Букети на {{ todayWord }}
            </UButton>
            <NuxtLink to="/prototype/about" class="group text-sm font-medium text-toned">
              Наша історія
              <span
                class="block h-px max-w-0 bg-clay-500 transition-all duration-500 group-hover:max-w-full"
              />
            </NuxtLink>
          </motion.div>
        </motion.div>

        <div class="lg:col-span-5">
          <motion.div
            :style="{ y: heroPhotoY }"
            :initial="{ opacity: 0, scale: 1.06, y: 30 }"
            :animate="{ opacity: 1, scale: 1, y: 0 }"
            :transition="{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }"
            class="relative will-change-transform"
          >
            <img
              src="/prototype/bouquet-lush-mix.jpg"
              alt="Букет дня"
              class="aspect-3/4 w-full rounded-t-full object-cover"
            />
            <motion.div
              :initial="{ opacity: 0, y: 16 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: 0.9, type: 'spring', stiffness: 80 }"
              class="absolute -bottom-5 left-6 border border-default bg-default px-5 py-3 shadow-lg"
            >
              <p class="text-[10px] font-semibold tracking-[0.25em] text-muted uppercase">
                {{ isBeforeCutoff ? "Встигаєте на сьогодні" : "Приймаємо на завтра" }}
              </p>
              <p class="font-display text-lg text-highlighted italic">
                доставка {{ todayWord }} по Львову
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Marquee -->
    <ProtoMarquee
      :items="[
        'Свіжі букети щоранку',
        `Замовлення до ${protoDelivery.cutoffHour}:00 — доставка сьогодні`,
        'Пакування включено',
        'Мікс · моно · композиції',
      ]"
    />

    <!-- 01 / На сьогодні -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-20 sm:px-6">
      <ProtoReveal>
        <div class="mb-12 flex items-end justify-between border-b border-default pb-6">
          <div>
            <p class="mb-2 text-xs font-semibold tracking-[0.35em] text-clay-600 uppercase">
              01 — Вітрина дня
            </p>
            <h2 class="font-display text-5xl text-highlighted sm:text-6xl">
              Букети на <span class="italic">{{ todayWord }}</span>
            </h2>
          </div>
          <UButton
            variant="link"
            color="neutral"
            to="/prototype/catalog"
            trailing-icon="i-lucide-arrow-right"
          >
            Весь каталог
          </UButton>
        </div>
      </ProtoReveal>
      <div class="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
        <motion.div
          v-for="(p, i) in todayBouquets"
          :key="p.id"
          :initial="{ opacity: 0, y: 36 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, amount: 0.2 }"
          :transition="{
            type: 'spring',
            stiffness: 80,
            damping: 16,
            delay: (i % 3) * 0.1,
          }"
        >
          <ProtoProductCard :product="p" />
        </motion.div>
      </div>
    </section>

    <!-- 02 / Переваги -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-16 sm:px-6">
      <div class="grid gap-12 md:grid-cols-3">
        <ProtoReveal v-for="(f, i) in benefits" :key="f.n" :delay="i * 110">
          <div class="border-t border-default pt-6">
            <p class="font-display text-5xl text-clay-500/80 italic">{{ f.n }}</p>
            <h3 class="mt-4 font-display text-2xl text-highlighted">{{ f.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted">{{ f.text }}</p>
          </div>
        </ProtoReveal>
      </div>
    </section>

    <!-- 03 / Відгуки -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-20 sm:px-6">
      <ProtoReveal>
        <p class="mb-2 text-xs font-semibold tracking-[0.35em] text-clay-600 uppercase">
          02 — Нам пишуть
        </p>
        <h2 class="mb-12 font-display text-5xl text-highlighted">Слова, за які ми працюємо</h2>
      </ProtoReveal>
      <div class="grid gap-x-16 gap-y-12 md:grid-cols-2">
        <ProtoReveal v-for="(r, i) in protoReviews" :key="r.name" :delay="i * 90">
          <figure :class="i % 2 === 1 ? 'md:translate-y-8' : ''">
            <p class="font-display text-6xl leading-none text-clay-400/60">«</p>
            <blockquote class="font-display -mt-4 text-2xl leading-relaxed text-toned italic">
              {{ r.text }}
            </blockquote>
            <figcaption class="mt-4 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              {{ r.name }} — {{ r.source }}
            </figcaption>
          </figure>
        </ProtoReveal>
      </div>
    </section>

    <!-- 04 / Про нас -->
    <section class="mx-auto max-w-(--ui-container) px-4 py-20 sm:px-6">
      <div class="grid items-center gap-14 lg:grid-cols-2">
        <ProtoReveal>
          <img
            src="/prototype/bouquet-peach.jpg"
            alt="Майстерня Marmúr"
            class="aspect-4/3 w-full object-cover"
          />
        </ProtoReveal>
        <ProtoReveal :delay="140">
          <p class="mb-2 text-xs font-semibold tracking-[0.35em] text-clay-600 uppercase">
            03 — Хто ми
          </p>
          <h2 class="font-display text-5xl leading-tight text-highlighted">
            Майстерня,<br />а не <span class="text-clay-600 italic">конвеєр</span>
          </h2>
          <p class="mt-6 max-w-md leading-relaxed text-muted">
            Ми відкрились як маленька студія флористики й досі збираємо кожен букет руками — під
            настрій, привід і людину. Вчимо цього й інших на наших майстер-класах.
          </p>
          <div class="mt-8 flex gap-4">
            <UButton
              variant="outline"
              color="neutral"
              class="rounded-full px-6"
              to="/prototype/about"
            >
              Про нас
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              class="rounded-full px-6"
              to="/prototype/school"
            >
              Навчання
            </UButton>
          </div>
        </ProtoReveal>
      </div>
    </section>

    <!-- CTA-фінал -->
    <section class="border-t border-default">
      <NuxtLink
        to="/prototype/catalog"
        class="group mx-auto block max-w-(--ui-container) px-4 py-24 text-center sm:px-6"
      >
        <ProtoReveal>
          <p class="font-display text-[clamp(2.5rem,7vw,6rem)] leading-tight text-highlighted">
            Скажіть це <span class="text-clay-600 italic">квітами</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="ml-4 inline-block size-[0.7em] align-middle text-moss-700 transition-transform duration-500 group-hover:translate-x-4"
            />
          </p>
        </ProtoReveal>
      </NuxtLink>
    </section>
  </div>
</template>
