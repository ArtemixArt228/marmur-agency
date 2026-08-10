<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Footer.
 * Редакційний підвал на темному шоколаді: контакти, доставка, соцмережі,
 * правове. Ніколи не мапа сайту.
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
  }>(),
  { columns: () => [], legal: "Політика конфіденційності · Умови" },
);

const year = new Date().getFullYear();
</script>

<template>
  <footer class="ds-footer">
    <div class="ds-footer__grid">
      <div>
        <DsWordmark :size="28" tone="inverse" />
        <p v-if="props.note" class="ds-footer__note">{{ props.note }}</p>
        <div v-if="props.social" class="ds-footer__social">
          <DsTextLink :href="props.social.href" tone="inverse" arrow>
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
    </div>

    <div class="ds-footer__bottom">
      <span>© {{ year }} Marmúr</span>
      <span>{{ props.legal }}</span>
    </div>
  </footer>
</template>

<style scoped>
.ds-footer {
  background: var(--color-background-dark);
  color: var(--color-foreground-inverse);
  padding: var(--space-24) var(--gutter-lg) var(--space-12);
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

.ds-footer__note {
  margin-top: var(--space-6);
  font: var(--type-small);
  color: var(--color-foreground-subtle);
  max-width: 34ch;
}

.ds-footer__social {
  margin-top: var(--space-8);
}

.ds-footer__column-title {
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-subtle);
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
  color: var(--color-foreground-inverse);
  opacity: 0.86;
  text-decoration: none;
}

.ds-footer__link:hover {
  opacity: 1;
  text-decoration: underline;
  text-decoration-color: var(--color-border-inverse);
}

.ds-footer__bottom {
  max-width: var(--container-max);
  margin: var(--space-20) auto 0;
  padding-top: var(--space-6);
  border-top: var(--border-inverse);
  display: flex;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-subtle);
}
</style>
