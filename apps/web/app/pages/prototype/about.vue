<script setup lang="ts">
// PROTOTYPE — «Про нас».
definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Про нас — Marmúr" });

const stats = [
  { n: "6", label: "років із квітами" },
  { n: "4 800+", label: "зібраних букетів" },
  { n: "120+", label: "випускниць курсів" },
];

const values = [
  {
    title: "Чесна свіжість",
    text: "Кажемо як є: що зібрано сьогодні, а що приїде завтра вранці.",
  },
  {
    title: "Смак, а не шаблон",
    text: "Жодних стандартних наборів — кожен букет має характер.",
  },
  {
    title: "Люди перш за все",
    text: "Флорист завжди на звʼязку: підкаже, замінить, врятує сюрприз.",
  },
];
</script>

<template>
  <div>
    <section class="ds-container ds-section">
      <div class="ds-split about__intro">
        <div>
          <DsSectionHeading eyebrow="Наша історія" title="Marmúr почався з одного букета" />
          <div class="about__text">
            <p class="ds-body ds-muted">
              У 2019 році ми зібрали перший букет на кухні — для подруги, якій було сумно. Відтоді
              нічого по суті не змінилось: ми досі збираємо квіти для людей і приводів, а не позиції
              для каталогу.
            </p>
            <p class="ds-body ds-muted">
              Щоранку їдемо на квіткову базу, обираємо найсвіжіше і збираємо асортимент дня. Тому в
              нас не буває вчорашніх букетів — і тому каталог щодня різний.
            </p>
          </div>

          <dl class="about__stats">
            <div v-for="s in stats" :key="s.label" class="about__stat">
              <dt class="about__stat-value">{{ s.n }}</dt>
              <dd class="ds-small ds-muted about__stat-label">{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <DsEditorialImage
          src="/prototype/bouquet-peach.jpg"
          alt="Майстерня Marmúr"
          ratio="var(--ratio-editorial)"
          :hover-zoom="false"
        />
      </div>
    </section>

    <section class="ds-section-dark ds-section-lg">
      <div class="ds-container">
        <DsStatementBlock size="h1" tone="inverse">
          Ми не продаємо квіти.<br />Ми збираємо привід.
        </DsStatementBlock>
      </div>
    </section>

    <section class="ds-container ds-section">
      <div class="about__values">
        <div v-for="v in values" :key="v.title" class="about__value">
          <h3 class="ds-h3">{{ v.title }}</h3>
          <p class="ds-body ds-muted about__value-text">{{ v.text }}</p>
        </div>
      </div>

      <div class="about__cta">
        <DsButton variant="premium" to="/prototype/catalog" icon-right="arrow-right">
          Переглянути колекцію
        </DsButton>
        <DsButton variant="secondary" to="/prototype/school"> Навчання флористики </DsButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__intro {
  align-items: start;
}

.about__text {
  margin-top: var(--space-8);
  display: grid;
  gap: var(--space-4);
  max-width: 56ch;
}

.about__stats {
  margin: var(--space-16) 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
}

.about__stat {
  padding-top: var(--space-4);
  border-top: var(--border-hairline);
}

.about__stat-value {
  font: var(--type-h2);
  font-size: clamp(28px, 3vw, 40px);
  font-variant-numeric: tabular-nums;
}

.about__stat-label {
  margin: var(--space-2) 0 0;
}

.about__values {
  display: grid;
  gap: var(--space-12) var(--gutter);
}

@media (min-width: 768px) {
  .about__values {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.about__value {
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}

.about__value-text {
  margin-top: var(--space-4);
}

.about__cta {
  margin-top: var(--space-16);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
</style>
