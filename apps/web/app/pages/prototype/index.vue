<script setup lang="ts">
// PROTOTYPE — головна.
// Ритм секцій нумерований («01 —»), сітки навмисно нерівні (§20):
// повторюваного «заголовок / текст / три картки / кнопка» тут немає.
import { protoDelivery, protoProducts, protoReviews } from "~/data/prototype";

definePageMeta({ layout: "prototype", heroHeader: true });
useSeoMeta({ title: "Marmúr — свіжі букети у Львові" });

const { todayWord } = usePrototypeShop();

const countIn = (c: string) => protoProducts.filter((p) => p.category === c && p.available).length;

const categories = {
  mix: {
    label: "Мікс-букети",
    photo: "/prototype/bouquet-dark-mix.jpg",
    count: countIn("mix"),
    to: "/prototype/catalog?category=mix",
  },
  mono: {
    label: "Моно-букети",
    photo: "/prototype/marmur-2.jpg",
    count: countIn("mono"),
    to: "/prototype/catalog?category=mono",
  },
  baskets: {
    label: "Корзини та коробки",
    photo: "/prototype/composition-heart.jpg",
    count: countIn("baskets"),
    to: "/prototype/catalog?category=baskets",
  },
  gift: {
    label: "Подарунки",
    photo: "/prototype/gift-candle.jpg",
    count: countIn("gift"),
    to: "/prototype/catalog?category=gift",
  },
};

const services = [
  { label: "Букет нареченої", to: "/prototype/catalog?category=bride" },
  { label: "Весільна підписка", to: "/prototype/catalog?category=wedding-sub" },
  { label: "Декор свята", to: "/prototype/catalog?category=decor" },
  { label: "Квіткова підписка", to: "/prototype/catalog?category=flower-sub" },
];
</script>

<template>
  <div>
    <ProtoHomeHeroShowcase />

    <ProtoMarquee
      :items="[
        'Свіжі букети щоранку',
        `Замовлення до ${protoDelivery.cutoffHour}:00 — доставка сьогодні`,
        `Безкоштовна доставка від 5 000 ₴`,
        'Пакування включено',
      ]"
    />

    <ProtoHomeTodayGrid />

    <!-- 02 — Розділи каталогу. Сітка нерівна: одна висока плитка проти
         чотирьох, серед яких одна текстова на темному. -->
    <section class="ds-container ds-section">
      <DsReveal>
        <DsSectionHeading
          index="02 —"
          eyebrow="Каталог"
          title="Оберіть напрям"
          lede="Чотири розділи — від пишних міксів до дрібниць, які роблять подарунок подарунком."
        >
          <template #action>
            <DsTextLink to="/prototype/catalog" arrow>Увесь каталог</DsTextLink>
          </template>
        </DsSectionHeading>
      </DsReveal>

      <div class="home-categories">
        <NuxtLink :to="categories.mix.to" class="home-tile home-tile--lead">
          <DsEditorialImage
            :src="categories.mix.photo"
            :alt="categories.mix.label"
            ratio="var(--ratio-editorial)"
            scrim
            class="home-tile__image"
          >
            <span class="home-tile__caption">
              <span class="home-tile__title">{{ categories.mix.label }}</span>
              <span class="ds-meta home-tile__meta"> сьогодні — {{ categories.mix.count }} </span>
            </span>
          </DsEditorialImage>
        </NuxtLink>

        <div class="home-categories__rest">
          <NuxtLink
            v-for="key in ['mono', 'baskets', 'gift'] as const"
            :key="key"
            :to="categories[key].to"
            class="home-tile"
          >
            <DsEditorialImage
              :src="categories[key].photo"
              :alt="categories[key].label"
              ratio="var(--ratio-portrait)"
              scrim
              class="home-tile__image"
            >
              <span class="home-tile__caption">
                <span class="home-tile__title home-tile__title--sm">
                  {{ categories[key].label }}
                </span>
                <span class="ds-meta home-tile__meta">
                  {{
                    key === "gift"
                      ? "свічки · вази · планери"
                      : `сьогодні — ${categories[key].count}`
                  }}
                </span>
              </span>
            </DsEditorialImage>
          </NuxtLink>

          <div class="home-note">
            <p class="ds-h3 home-note__text">Те, що ви бачите, зібрано сьогодні вранці.</p>
            <p class="ds-small home-note__lede">
              Завтра тут будуть інші букети. Якщо щось сподобалось — не відкладайте.
            </p>
          </div>
        </div>
      </div>

      <div class="home-services">
        <span class="ds-meta ds-subtle">А також</span>
        <NuxtLink
          v-for="s in services"
          :key="s.label"
          :to="s.to"
          class="ds-meta home-services__link"
        >
          {{ s.label }}
        </NuxtLink>
      </div>
    </section>

    <!-- Темна редакційна вставка — голос бренду між двома світлими секціями -->
    <section class="ds-section-dark ds-section-lg">
      <div class="ds-container">
        <DsReveal>
          <DsStatementBlock size="h1" tone="inverse" attribution="Marmúr · з 2019">
            Кожен букет збирається вручну в день доставки.
          </DsStatementBlock>
        </DsReveal>
      </div>
    </section>

    <!-- 03 — Майстерня: нерівний спліт 1.6fr / 1fr -->
    <section class="ds-container ds-section">
      <div class="ds-split">
        <DsReveal>
          <DsEditorialImage
            src="/prototype/marmur-1.jpg"
            alt="Засновниця Marmúr із букетом білих півоній"
            ratio="var(--ratio-wide)"
            caption="Майстерня, вулиця Городоцька"
          />
        </DsReveal>

        <DsReveal :delay="120">
          <DsSectionHeading
            index="03 —"
            eyebrow="Студія"
            title="Майстерня, а не конвеєр"
            lede="Ми відкрились як маленька студія флористики й досі збираємо кожен букет руками — під настрій, привід і людину."
          />
          <p class="home-school ds-body ds-muted">
            А ще ми вчимо флористики: мінігрупи до чотирьох людей, усі квіти й матеріали включені.
          </p>
          <div class="home-actions">
            <DsButton variant="secondary" to="/prototype/about"> Наша історія </DsButton>
            <DsButton variant="premium" to="/prototype/school"> Записатись на навчання </DsButton>
          </div>
        </DsReveal>
      </div>
    </section>

    <!-- 04 — Відгуки. Без полароїдів, поворотів і тіней: три тихі колонки -->
    <section class="ds-container ds-section">
      <DsReveal>
        <DsSectionHeading index="04 —" eyebrow="Відгуки" title="Слова, за які ми працюємо" />
      </DsReveal>
      <div class="home-reviews">
        <DsReveal v-for="(r, i) in protoReviews" :key="r.name" :delay="i * 80" class="home-review">
          <blockquote class="home-review__text ds-body">{{ r.text }}</blockquote>
          <p class="ds-meta ds-subtle home-review__by">{{ r.name }} · {{ r.source }}</p>
        </DsReveal>
      </div>
    </section>

    <!-- Фінальний заклик на темному — разом із підвалом закриває сторінку -->
    <section class="ds-section-dark ds-section-lg">
      <div class="ds-container home-final">
        <DsReveal>
          <DsStatementBlock tone="inverse" align="center"> Скажіть це квітами. </DsStatementBlock>
          <div class="home-final__action">
            <DsButton variant="inverse" size="lg" to="/prototype/catalog" icon-right="arrow-right">
              Переглянути колекцію
            </DsButton>
          </div>
        </DsReveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-categories {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--gutter);
}

@media (min-width: 1024px) {
  .home-categories {
    grid-template-columns: 1.6fr 2fr;
    align-items: start;
  }
}

.home-categories__rest {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gutter);
}

.home-tile {
  display: block;
  text-decoration: none;
}

.home-tile:hover {
  opacity: 1;
  text-decoration: none;
}

.home-tile__caption {
  position: absolute;
  inset-inline: var(--space-6);
  bottom: var(--space-6);
  display: grid;
  gap: var(--space-2);
  color: var(--color-foreground-inverse);
}

.home-tile__title {
  font: var(--type-h2);
  font-size: clamp(26px, 2.4vw, 38px);
  letter-spacing: var(--tracking-heading);
}

.home-tile__title--sm {
  font-size: clamp(20px, 1.6vw, 26px);
}

.home-tile__meta {
  color: var(--color-foreground-inverse);
  opacity: 0.78;
}

.home-note {
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
  min-height: 100%;
}

.home-note__text {
  color: var(--color-foreground-inverse);
}

.home-note__lede {
  color: var(--color-foreground-subtle);
}

.home-services {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-4) var(--space-8);
}

.home-services__link {
  color: var(--color-foreground-muted);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: var(--transition-color);
}

.home-services__link:hover {
  color: var(--color-foreground);
  border-bottom-color: var(--color-foreground);
  opacity: 1;
  text-decoration: none;
}

.home-school {
  margin-top: var(--space-8);
  padding-left: var(--space-6);
  border-left: var(--border-strong);
  max-width: 46ch;
}

.home-actions {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.home-reviews {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--space-12) var(--gutter);
}

@media (min-width: 768px) {
  .home-reviews {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .home-reviews {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.home-review {
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}

.home-review__text {
  margin: 0;
  color: var(--color-foreground-muted);
}

.home-review__by {
  margin-top: var(--space-6);
}

.home-final {
  display: grid;
  justify-items: center;
  text-align: center;
}

.home-final__action {
  margin-top: var(--space-12);
  display: flex;
  justify-content: center;
}
</style>
