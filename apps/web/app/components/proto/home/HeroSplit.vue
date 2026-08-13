<script setup lang="ts">
 /**
 * PROTOTYPE — hero. Спліт із двох блоків поверх повноширинного кадру:
 * ліворуч рухоме відео, праворуч текст. Фон — саме фотографія, відео живе
 * у своїй рамці й не тягне на себе весь екран.
 */
</script>

<template>
  <section class="hero">
    <img src="/prototype/hero-wide.jpg" alt="" class="hero__backdrop" fetchpriority="high" />
    <span class="hero__scrim" />

    <div class="hero__inner">
      <figure class="hero__frame">
        <video
          src="/prototype/marmur-video.mp4"
          poster="/prototype/marmur-3.jpg"
          class="hero__video"
          autoplay
          muted
          loop
          playsinline
        />
      </figure>

      <div class="hero__body">
        <p class="hero__eyebrow ds-meta">[ Львів · з 2019 ]</p>

        <h1 class="hero__title">Квіти, зібрані<br />сьогодні вранці.</h1>

        <p class="hero__lede">Збираємо щоранку. Замовлення до 18:00 привеземо сьогодні.</p>

        <div class="hero__actions">
          <DsButton variant="inverse" size="lg" to="/prototype/catalog">
            Переглянути колекцію
          </DsButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  /* Стеля 540px: вище кадр починає жити самими відступами */
  --hero-height: clamp(420px, 60vh, 540px);
  --hero-inset: var(--space-section);

  position: relative;
  display: flex;
  align-items: center;
  min-height: var(--hero-height);
  padding-block: var(--hero-inset);
  overflow: hidden;
  background: var(--color-brand-dark);
}

.hero__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* §17 — текст поверх фото захищає градієнт, а не плашка */
.hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgb(23 21 19 / 0.24) 0%,
    rgb(23 21 19 / 0.52) 52%,
    rgb(23 21 19 / 0.82) 100%
  );
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  align-items: center;
  gap: var(--space-12);
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--gutter-lg);
}

.hero__frame {
  margin: 0;
  overflow: hidden;
  aspect-ratio: var(--ratio-wide);
  background: var(--color-brand-dark);
}

.hero__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__body {
  max-width: 46ch;
  color: var(--color-foreground-inverse);
}

.hero__eyebrow {
  color: var(--color-foreground-inverse);
  opacity: 0.82;
  margin-bottom: var(--space-6);
}

/* Курсив дозволений тільки тут і на одному слові в блоці Visit — §3 spec */
.hero__title {
  font: var(--type-display-italic);
  letter-spacing: var(--tracking-display);
  color: var(--color-foreground-inverse);
}

.hero__lede {
  margin-top: var(--space-6);
  max-width: 40ch;
  font: var(--type-body);
  font-size: var(--text-body-lg);
  color: var(--color-foreground-inverse);
  opacity: 0.88;
}

.hero__actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-8);
}

.hero__ghost {
  color: var(--color-foreground-inverse);
  border-bottom-color: var(--color-border-inverse);
}

@media (min-width: 1024px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
    gap: var(--space-16);
  }

  /*
   * На десктопі рамка бере висоту, а не пропорцію: інакше при широкій
   * колонці 4:3 розганяє секцію вище за стелю.
   */
  .hero__frame {
    aspect-ratio: auto;
    height: calc(var(--hero-height) - var(--hero-inset) * 2);
  }
}
</style>
