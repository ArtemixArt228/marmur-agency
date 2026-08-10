<script setup lang="ts">
// PROTOTYPE — повноширинний hero: тут буде горизонтальне відео створення
// букета. Поки що вертикальний рілз, кропнутий у повну ширину.
// §17: текст поверх фото захищає градієнт-scrim, а не плашка.
import { protoDelivery } from "~/data/prototype";

const { todayWord, formatUah } = usePrototypeShop();
</script>

<template>
  <section class="proto-hero">
    <video
      src="/prototype/marmur-video.mp4"
      poster="/prototype/hero-wide.jpg"
      class="proto-hero__media"
      autoplay
      muted
      loop
      playsinline
    />
    <span class="proto-hero__scrim" />

    <p class="proto-hero__draft ds-meta">
      Чернетка: вертикальний рілз, кропнутий — згодом горизонтальне відео
    </p>

    <div class="proto-hero__body">
      <p class="proto-hero__eyebrow ds-meta">Marmúr — Львів</p>

      <DsStatementBlock tone="inverse" class="proto-hero__statement">
        Букети<br />з особливою<br />енергетикою.
      </DsStatementBlock>

      <p class="proto-hero__lede">
        Замовлення до {{ protoDelivery.cutoffHour }}:00 — привеземо {{ todayWord }} у ваше вікно.
      </p>

      <div class="proto-hero__actions">
        <DsButton variant="inverse" size="lg" to="#today"> Букети на {{ todayWord }} </DsButton>
        <p class="ds-meta proto-hero__note">
          Безкоштовна доставка від {{ formatUah(protoDelivery.freeFrom) }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proto-hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 100svh;
  overflow: hidden;
  background: var(--color-brand-dark);
}

.proto-hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/*
 * §17: текст поверх фото захищає верхньо-нижній градієнт, а не плашка.
 * Кадр із білими півоніями майже засвічений, тому тут той самий градієнт,
 * але щільніший — інакше світлий текст на світлому фото не читається.
 */
.proto-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgb(23 21 19 / 0.5) 0%,
    rgb(23 21 19 / 0.24) 34%,
    rgb(23 21 19 / 0.82) 100%
  );
  pointer-events: none;
}

.proto-hero__draft {
  position: absolute;
  top: calc(var(--header-height) + var(--space-6));
  right: var(--gutter);
  max-width: 22ch;
  text-align: right;
  color: var(--color-foreground-inverse);
  opacity: 0.6;
}

.proto-hero__body {
  position: relative;
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 0 var(--gutter-lg) var(--space-16);
  color: var(--color-foreground-inverse);
}

.proto-hero__eyebrow {
  color: var(--color-foreground-inverse);
  opacity: 0.8;
  margin-bottom: var(--space-6);
}

.proto-hero__statement {
  max-width: 18ch;
}

.proto-hero__lede {
  margin-top: var(--space-6);
  max-width: 44ch;
  font: var(--type-body);
  font-size: var(--text-body-lg);
  color: var(--color-foreground-inverse);
  opacity: 0.88;
}

.proto-hero__actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-12);
}

.proto-hero__note {
  color: var(--color-foreground-inverse);
  opacity: 0.75;
}
</style>
