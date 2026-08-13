<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/Carousel.
 *
 * Рядок зі scroll-snap і точками. Автопрокрутки немає — §25 забороняє
 * елементи, які анімуються постійно. Без JS це лишається звичайним
 * горизонтальним скролом, тому нічого не ховається.
 *
 * Стрілки живуть не тут: у макеті вони стоять у рейці фільтрів, над каруселлю.
 * Тому керування каретка віддає назовні через `defineExpose`.
 */
const props = withDefaults(defineProps<{ count: number; perView?: number }>(), { perView: 4 });

const track = ref<HTMLElement | null>(null);
const page = ref(0);
/** Скільки ще лишилось прокрутити; 0 означає, що каретка нерухома */
const maxScroll = ref(0);
const scrollLeft = ref(0);

const pages = computed(() => Math.max(1, Math.ceil(props.count / props.perView)));

// Допуск в 1px: на дробових ширинах колонок браузер віддає дробовий scrollLeft,
// і без нього каретка на самому краю вважалась би недокрученою.
const atStart = computed(() => scrollLeft.value <= 1);
const atEnd = computed(() => scrollLeft.value >= maxScroll.value - 1);

function measure() {
  const el = track.value;
  if (!el) return;
  maxScroll.value = el.scrollWidth - el.clientWidth;
  scrollLeft.value = el.scrollLeft;
  page.value =
    maxScroll.value <= 0 ? 0 : Math.round((el.scrollLeft / maxScroll.value) * (pages.value - 1));
}

function goTo(i: number) {
  const el = track.value;
  if (!el) return;
  el.scrollTo({
    left: pages.value <= 1 ? 0 : (maxScroll.value / (pages.value - 1)) * i,
    behavior: "smooth",
  });
}

/*
 * Крок стрілок — ширина видимої частини каретки, а не `maxScroll / pages`:
 * `perView` описує лише десктоп, а нижче 1024px у рядку менше карток, і крок
 * за `pages` перестрибував би через них. Далі scroll-snap притягує до картки.
 */
function step(direction: 1 | -1) {
  const el = track.value;
  if (!el) return;
  el.scrollBy({ left: el.clientWidth * direction, behavior: "smooth" });
}

let observer: ResizeObserver | undefined;

onMounted(() => {
  measure();
  if (!track.value) return;
  observer = new ResizeObserver(measure);
  observer.observe(track.value);
});

onBeforeUnmount(() => observer?.disconnect());

// Зміна фільтра підміняє картки: каретку треба повернути на початок і переміряти
watch(
  () => props.count,
  async () => {
    track.value?.scrollTo({ left: 0 });
    await nextTick();
    measure();
  },
);

defineExpose({ prev: () => step(-1), next: () => step(1), atStart, atEnd });
</script>

<template>
  <div class="ds-carousel">
    <div ref="track" class="ds-carousel__track" @scroll.passive="measure">
      <slot />
    </div>

    <div v-if="pages > 1" class="ds-carousel__dots">
      <button
        v-for="i in pages"
        :key="i"
        type="button"
        class="ds-carousel__dot"
        :class="{ 'ds-carousel__dot--active': i - 1 === page }"
        :aria-label="`Сторінка ${i}`"
        :aria-current="i - 1 === page ? 'true' : undefined"
        @click="goTo(i - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.ds-carousel__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 3 * var(--gutter)) / 4);
  gap: var(--gutter);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.ds-carousel__track::-webkit-scrollbar {
  display: none;
}

.ds-carousel__track > * {
  scroll-snap-align: start;
}

@media (max-width: 1023px) {
  .ds-carousel__track {
    grid-auto-columns: calc((100% - var(--gutter)) / 2);
  }
}

@media (max-width: 767px) {
  .ds-carousel__track {
    grid-auto-columns: 78%;
  }
}

.ds-carousel__dots {
  margin-top: var(--space-8);
  display: flex;
  justify-content: center;
  gap: var(--space-2);
}

/* Точки прямокутні, не круглі: §24 забороняє rounded-full на UI */
.ds-carousel__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: var(--radius-none);
  background: var(--color-border);
  cursor: pointer;
  transition: var(--transition-color);
}

.ds-carousel__dot--active {
  width: 22px;
  background: var(--color-foreground);
}
</style>
