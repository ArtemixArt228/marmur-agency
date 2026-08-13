<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/AnnouncementBar.
 *
 * Смуга в потоці над шапкою — вона скролиться геть. Заборона на «плаваючі
 * промо-смуги» стосується липких елементів; ця такою не є.
 *
 * Стрічка їде. Обіцянок більше, ніж влазить у рядок, а лишити з них три —
 * означає сховати решту. Лінок у смузі немає: це інформація, не навігація.
 * Доріжка продубльована й прихована від читалок, щоб цикл не мав шва.
 */
const props = withDefaults(
  defineProps<{
    items: string[];
    /** Швидкість руху, px/с */
    speed?: number;
  }>(),
  { speed: 55 },
);

/**
 * Тривалість циклу рахуємо з довжини тексту, а не з виміряної ширини DOM:
 * так вона однакова на сервері й клієнті і смуга не смикається після
 * гідратації. ~8.6px на символ капсового Manrope 12px з tracking, плюс
 * проміжок навколо крапки-роздільника.
 */
const duration = computed(() => {
  const glyphs = props.items.join("").length * 8.6;
  const gaps = props.items.length * 56;
  return Math.max(18, Math.round((glyphs + gaps) / props.speed));
});
</script>

<template>
  <aside
    class="ds-announce"
    :style="{ '--announce-duration': `${duration}s` }"
    aria-label="Умови замовлення й доставки"
  >
    <div class="ds-announce__viewport">
      <p
        v-for="track in 2"
        :key="track"
        class="ds-announce__track"
        :aria-hidden="track === 2 ? 'true' : undefined"
      >
        <span v-for="item in props.items" :key="item" class="ds-announce__item">
          {{ item }}
          <span aria-hidden="true" class="ds-announce__dot">·</span>
        </span>
      </p>
    </div>
  </aside>
</template>

<style scoped>
.ds-announce {
  height: var(--announce-height);
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  font: var(--type-meta);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
}

.ds-announce__viewport {
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

/*
 * `min-width: 100%` — щоб на широкому екрані доріжка не була вужчою за
 * смугу: інакше в кінці циклу праворуч зʼявляється діра. Коли тексту менше,
 * ніж місця, space-around розгортає його на всю ширину.
 */
.ds-announce__track {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  white-space: nowrap;
  animation: ds-announce-run var(--announce-duration) linear infinite;
}

/* Наведення зупиняє стрічку — щоб рядок можна було дочитати */
.ds-announce:hover .ds-announce__track {
  animation-play-state: paused;
}

.ds-announce__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
  padding-left: var(--space-6);
}

.ds-announce__dot {
  opacity: 0.5;
}

@keyframes ds-announce-run {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

/*
 * Без руху смуга лишається звичайним рядком: копію ховаємо, а те, що не
 * влізло, можна прогорнути.
 */
@media (prefers-reduced-motion: reduce) {
  .ds-announce__viewport {
    overflow-x: auto;
  }

  .ds-announce__track {
    animation: none;
  }

  .ds-announce__track[aria-hidden="true"] {
    display: none;
  }
}
</style>
