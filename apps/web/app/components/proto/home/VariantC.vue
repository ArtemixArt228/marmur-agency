<script setup lang="ts">
// PROTOTYPE — Варіант C «Іммерсив»: повноекранне фото, скрол-драматургія
import { motion, useScroll, useTransform } from "motion-v";
import { protoDelivery, protoProducts, protoReviews } from "~/data/prototype";

const { todayWord } = usePrototypeShop();

const todayBouquets = computed(() =>
  protoProducts.filter((p) => p.category !== "gift" && p.available),
);

const { scrollY } = useScroll();
const heroTextOpacity = useTransform(scrollY, [0, 500], [1, 0]);
const heroTextY = useTransform(scrollY, [0, 500], [0, 90]);
const heroImgScale = useTransform(scrollY, [0, 800], [1, 1.12]);

const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 16,
      delay: 0.25 + i * 0.15,
    },
  }),
};
</script>

<template>
  <div>
    <!-- Full-bleed hero -->
    <section class="relative -mt-16 flex min-h-svh items-center justify-center overflow-hidden">
      <motion.img
        src="/prototype/hero-dark-rose.jpg"
        alt=""
        class="absolute inset-0 size-full object-cover"
        :style="{ scale: heroImgScale }"
        :initial="{ scale: 1.15, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }"
      />
      <div class="absolute inset-0 bg-stone-950/55" />
      <motion.div
        class="relative px-6 pt-16 text-center text-white"
        :style="{ opacity: heroTextOpacity, y: heroTextY }"
      >
        <motion.p
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.1, duration: 0.8 }"
          class="mb-8 text-xs tracking-[0.4em] uppercase opacity-80"
        >
          Marmúr · квіткова майстерня
        </motion.p>
        <h1 class="font-display text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.95]">
          <span class="block overflow-hidden">
            <motion.span
              class="block"
              :variants="lineReveal"
              initial="hidden"
              animate="visible"
              :custom="0"
              >Скажіть це</motion.span
            >
          </span>
          <span class="block overflow-hidden">
            <motion.span
              class="block italic"
              :variants="lineReveal"
              initial="hidden"
              animate="visible"
              :custom="1"
              >квітами</motion.span
            >
          </span>
        </h1>
        <motion.p
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.8, duration: 0.8 }"
          class="mx-auto mt-8 max-w-md text-lg opacity-85"
        >
          Свіжі букети щоранку. Доставка по Львову {{ todayWord }} — якщо замовите до
          {{ protoDelivery.cutoffHour }}:00.
        </motion.p>
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 1, duration: 0.8 }"
        >
          <UButton
            size="xl"
            color="neutral"
            class="mt-10 rounded-full bg-white px-8 text-stone-900 hover:bg-stone-100"
            to="/prototype/catalog"
            trailing-icon="i-lucide-arrow-right"
          >
            Обрати букет
          </UButton>
        </motion.div>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 1.6, duration: 1 }"
        class="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <UIcon name="i-lucide-chevron-down" class="size-6 animate-bounce text-white/70" />
      </motion.div>
    </section>

    <!-- Горизонтальна стрічка «на сьогодні» -->
    <section class="py-24">
      <div class="mx-auto max-w-(--ui-container) px-4 sm:px-6">
        <ProtoReveal>
          <div class="mb-12 flex items-end justify-between">
            <h2 class="font-display text-5xl text-highlighted sm:text-6xl">
              На <span class="text-clay-600 italic">{{ todayWord }}</span>
            </h2>
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
      </div>
      <div class="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6">
        <motion.div
          v-for="(p, i) in todayBouquets"
          :key="p.id"
          :initial="{ opacity: 0, x: 60 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true, amount: 0.2 }"
          :transition="{ type: 'spring', stiffness: 60, damping: 15, delay: i * 0.06 }"
          class="w-72 shrink-0 snap-start sm:w-80"
        >
          <NuxtLink :to="`/prototype/product/${p.id}`" class="group relative block overflow-hidden">
            <img
              :src="p.photo"
              :alt="p.name"
              class="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-950/85 to-transparent p-5 pt-20 text-white"
            >
              <p class="font-display text-2xl italic">{{ p.name }}</p>
              <ProtoPrice
                :product="p"
                class="[&_span]:text-white [&_.line-through]:text-white/60"
              />
            </div>
          </NuxtLink>
        </motion.div>
      </div>
    </section>

    <!-- Переваги — темна секція -->
    <section class="bg-stone-950 py-24 text-white">
      <div class="mx-auto grid max-w-(--ui-container) gap-12 px-4 sm:px-6 md:grid-cols-3">
        <motion.div
          v-for="(f, i) in [
            {
              icon: 'i-lucide-truck',
              title: 'Доставка за 2 години',
              text: 'У зручне вам вікно, по Львову й передмістю.',
            },
            {
              icon: 'i-lucide-gift',
              title: 'Пакування включено',
              text: 'Крафт, стрічка, листівка від руки — без доплат.',
            },
            {
              icon: 'i-lucide-leaf',
              title: 'Тільки сьогоднішні квіти',
              text: 'Асортимент оновлюється щоранку. Вчорашнього не буває.',
            },
          ]"
          :key="f.title"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.12 }"
          class="text-center"
        >
          <UIcon :name="f.icon" class="mx-auto size-8 text-moss-300" />
          <h3 class="mt-4 font-display text-2xl">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/65">{{ f.text }}</p>
        </motion.div>
      </div>
    </section>

    <!-- Відгуки — великі цитати -->
    <section class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <ProtoReveal v-for="(r, i) in protoReviews.slice(0, 2)" :key="r.name" :delay="i * 120">
        <figure class="py-8">
          <p class="font-display text-7xl leading-none text-clay-400/60">«</p>
          <blockquote
            class="font-display -mt-6 text-2xl leading-relaxed text-toned italic sm:text-3xl"
          >
            {{ r.text }}
          </blockquote>
          <figcaption class="mt-5 text-xs font-semibold tracking-[0.3em] text-muted uppercase">
            {{ r.name }} · {{ r.source }}
          </figcaption>
        </figure>
      </ProtoReveal>
    </section>

    <!-- Про нас — фотосмуга -->
    <section class="relative overflow-hidden">
      <img
        src="/prototype/field-tulips.jpg"
        alt=""
        class="absolute inset-0 size-full object-cover"
      />
      <div class="absolute inset-0 bg-stone-950/50" />
      <div class="relative mx-auto max-w-(--ui-container) px-4 py-32 text-white sm:px-6">
        <ProtoReveal>
          <h2 class="font-display text-5xl sm:text-6xl">
            Майстерня, а не <span class="italic">конвеєр</span>
          </h2>
          <p class="mt-5 max-w-md leading-relaxed opacity-85">
            Кожен букет збирає флорист під людину і привід. А ще ми вчимо флористики — від першого
            букета до власної студії.
          </p>
          <div class="mt-8 flex gap-4">
            <UButton
              color="neutral"
              class="rounded-full bg-white px-6 text-stone-900 hover:bg-stone-100"
              to="/prototype/about"
            >
              Про нас
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              class="rounded-full border-white/40 px-6 text-white hover:bg-white/10"
              to="/prototype/school"
            >
              Навчання
            </UButton>
          </div>
        </ProtoReveal>
      </div>
    </section>
  </div>
</template>
