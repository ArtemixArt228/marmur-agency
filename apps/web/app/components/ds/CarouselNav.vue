<script setup lang="ts">
/**
 * Marmúr DS → components/commerce/CarouselNav.
 *
 * Пара стрілок для каруселі. У Peak вони круглі; тут прямокутні — коло в
 * системі лишилось тільки за кнопкою на плитці, де воно лежить на фото
 * (§24 + відхилення 15).
 *
 * Стану кнопки не мають: край каретки їм передає карусель.
 */
const props = withDefaults(
  defineProps<{
    /** Каретка вперлась у лівий край — кнопка «назад» гасне */
    atStart?: boolean;
    /** Те саме для правого краю */
    atEnd?: boolean;
    labelPrev?: string;
    labelNext?: string;
  }>(),
  {
    // Обидві true, поки карусель не змонтувалась: краще показати погашені
    // кнопки, ніж живі, які перший клік проігнорує.
    atStart: true,
    atEnd: true,
    labelPrev: "Попередні",
    labelNext: "Наступні",
  },
);

const emit = defineEmits<{ prev: []; next: [] }>();
</script>

<template>
  <div class="ds-carousel-nav">
    <button
      type="button"
      class="ds-carousel-nav__button"
      :disabled="props.atStart"
      :aria-label="props.labelPrev"
      :title="props.labelPrev"
      @click="emit('prev')"
    >
      <DsIcon name="arrow-left" :size="16" />
    </button>

    <button
      type="button"
      class="ds-carousel-nav__button"
      :disabled="props.atEnd"
      :aria-label="props.labelNext"
      :title="props.labelNext"
      @click="emit('next')"
    >
      <DsIcon name="arrow-right" :size="16" />
    </button>
  </div>
</template>

<style scoped>
.ds-carousel-nav {
  display: flex;
  gap: var(--space-2);
}

/*
 * 40px — та сама висота, що у вкладок фільтра: кнопки стоять із ними в одному
 * рядку, і будь-яка інша висота лишила б у рейці сходинку.
 */
.ds-carousel-nav__button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-none);
  color: var(--color-foreground);
  cursor: pointer;
  transition: var(--transition-color);
}

/* Ховер той самий, що в активної вкладки: заливка espresso, знак інверсний */
.ds-carousel-nav__button:hover:not(:disabled) {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-foreground-inverse);
}

.ds-carousel-nav__button:disabled {
  color: var(--color-foreground-subtle);
  cursor: default;
}
</style>
