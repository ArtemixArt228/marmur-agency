<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Footer.
 *
 * Світлий підвал на чотири колонки з підпискою всередині — так його тримає
 * peakdesign.com. Волосяна лінія зверху відділяє білу поверхню від
 * ivory-полотна. Ніколи не мапа сайту.
 *
 * Форма підписки нікуди не веде: поштового бекенда немає, а вигаданий
 * успіх був би гіршим за інертне поле.
 */
export interface DsFooterColumn {
  title: string;
  links: { label: string; to: string }[];
}

const props = withDefaults(
  defineProps<{
    columns?: DsFooterColumn[];
    note?: string;
    social?: { label: string; href: string };
    legal?: string;
    newsletter?: boolean;
  }>(),
  { columns: () => [], legal: "Політика конфіденційності · Умови", newsletter: false },
);

const year = new Date().getFullYear();
const email = ref("");
</script>

<template>
  <footer class="ds-footer">
    <div class="ds-footer__grid">
      <div>
        <DsWordmark :size="28" />
        <p v-if="props.note" class="ds-footer__note">{{ props.note }}</p>
        <div v-if="props.social" class="ds-footer__social">
          <DsTextLink :href="props.social.href" arrow>
            {{ props.social.label }}
          </DsTextLink>
        </div>
        <slot name="contacts" />
      </div>

      <nav v-for="c in props.columns" :key="c.title">
        <p class="ds-footer__column-title">{{ c.title }}</p>
        <ul class="ds-footer__list">
          <li v-for="l in c.links" :key="l.label">
            <NuxtLink :to="l.to" class="ds-footer__link">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div v-if="props.newsletter" class="ds-footer__news">
        <p class="ds-footer__column-title">Лист від Marmúr</p>
        <p class="ds-footer__news-text">
          Пишемо рідко: коли зʼявляються сезонні квіти й коли відкриваємо набір у школу.
        </p>
        <form class="ds-footer__news-form" @submit.prevent>
          <DsInput v-model="email" type="email" label="Пошта" placeholder="Пошта" />
          <DsButton type="submit" size="sm">Підписатись</DsButton>
        </form>
      </div>
    </div>

    <div class="ds-footer__bottom">
      <span>© {{ year }} Marmúr</span>
      <span>{{ props.legal }}</span>
    </div>
  </footer>
</template>

<style scoped>
.ds-footer {
  background: var(--color-background-alt);
  color: var(--color-foreground);
  border-top: var(--border-hairline);
  padding: var(--space-20) var(--gutter-lg) var(--space-8);
}

.ds-footer__grid {
  display: grid;
  gap: var(--space-12);
  align-items: start;
  max-width: var(--container-max);
  margin-inline: auto;
}

@media (min-width: 768px) {
  .ds-footer__grid {
    grid-template-columns: 1.4fr repeat(3, 1fr);
    gap: var(--space-16);
  }
}

@media (min-width: 1024px) {
  .ds-footer__grid {
    grid-template-columns: 1.3fr repeat(3, 0.8fr) 1.2fr;
  }
}

.ds-footer__note {
  margin-top: var(--space-6);
  font: var(--type-small);
  color: var(--color-foreground-muted);
  max-width: 34ch;
}

.ds-footer__social {
  margin-top: var(--space-8);
}

.ds-footer__column-title {
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground);
  margin-bottom: var(--space-6);
}

.ds-footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}

.ds-footer__link {
  font: var(--type-small);
  color: var(--color-foreground-muted);
  text-decoration: none;
}

.ds-footer__link:hover {
  color: var(--color-foreground);
  opacity: 1;
  text-decoration: underline;
  text-decoration-color: var(--color-border-strong);
}

.ds-footer__news-text {
  font: var(--type-small);
  color: var(--color-foreground-muted);
  max-width: 34ch;
}

.ds-footer__news-form {
  margin-top: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: flex-end;
}

.ds-footer__bottom {
  max-width: var(--container-max);
  margin: var(--space-16) auto 0;
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  font: var(--type-small);
  color: var(--color-foreground-muted);
}
</style>
