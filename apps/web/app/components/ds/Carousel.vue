<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/Carousel.
 *
 * Рядок зі scroll-snap і точками. Автопрокрутки немає — §25 забороняє
 * елементи, які анімуються постійно. Без JS це лишається звичайним
 * горизонтальним скролом, тому нічого не ховається.
 */
const props = withDefaults(defineProps<{ count: number; perView?: number }>(), { perView: 4 });

const track = ref<HTMLElement | null>(null);
const page = ref(0);

const pages = computed(() => Math.max(1, Math.ceil(props.count / props.perView)));

function onScroll() {
  const el = track.value;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  page.value = max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages.value - 1));
}

function goTo(i: number) {
  const el = track.value;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  el.scrollTo({ left: pages.value <= 1 ? 0 : (max / (pages.value - 1)) * i, behavior: "smooth" });
}
</script>

<template>
  <div class="ds-carousel">
    <div ref="track" class="ds-carousel__track" @scroll.passive="onScroll">
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

.ds-carousel__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: var(--color-border);
  cursor: pointer;
  transition: var(--transition-color);
}

.ds-carousel__dot--active {
  width: 22px;
  background: var(--color-foreground);
}
</style>
