<script setup lang="ts">
 /**
 * PROTOTYPE — hero. Кадр на всю ширину, текстовий блок праворуч.
 *
 * Спліт-панелі 50/50 тут немає навмисно: на живій сторінці Peak hero — це
 * повноширинний кадр, а спліт ужито один раз, у блоці «Manifesto».
 */
</script>

<template>
  <section class="hero">
    <video
      src="/prototype/marmur-video.mp4"
      poster="/prototype/hero-wide.jpg"
      class="hero__media"
      autoplay
      muted
      loop
      playsinline
    />
    <span class="hero__scrim" />

    <p class="hero__draft ds-meta">
      Чернетка: вертикальний рілз, кропнутий — згодом горизонтальне відео
    </p>

    <div class="hero__inner">
      <div class="hero__body">
        <p class="hero__eyebrow ds-meta">[ Львів · з 2019 ]</p>

        <h1 class="hero__title">Квіти, які<br />залишаються.</h1>

        <p class="hero__lede">Збираємо щоранку. Замовлення до 18:00 — привеземо сьогодні.</p>

        <div class="hero__actions">
          <DsButton variant="inverse" size="lg" to="/prototype/catalog">
            Переглянути колекцію
          </DsButton>
          <DsButton variant="ghost" size="lg" to="/prototype/about" class="hero__ghost">
            Наша історія
          </DsButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(560px, 82vh, 760px);
  overflow: hidden;
  background: var(--color-brand-dark);
}

.hero__media {
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

.hero__draft {
  position: absolute;
  top: calc(var(--header-height) + var(--space-6));
  left: var(--gutter);
  max-width: 22ch;
  color: var(--color-foreground-inverse);
  opacity: 0.55;
}

.hero__inner {
  position: relative;
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--gutter-lg);
  display: flex;
  justify-content: flex-end;
}

.hero__body {
  width: min(100%, 46ch);
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

@media (max-width: 1023px) {
  .hero__inner {
    justify-content: flex-start;
  }

  .hero__body {
    width: 100%;
  }
}
</style>
