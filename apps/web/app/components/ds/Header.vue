<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Header.
 *
 * Тонка простора шапка: 76px, після 40px скролу стискається до 60px.
 * Над hero-фотографією — прозора, зі світлим текстом; далі — кольору ivory
 * із hairline знизу. Це єдиний фіксований елемент інтерфейсу.
 *
 * Відхилення від оригіналу: замість пропа `mobile` — медіазапит, бо шапка
 * живе на реальному сайті, а не в статичному кіті.
 */
export interface DsNavLink {
  label: string;
  to: string;
}

const props = withDefaults(
  defineProps<{
    links?: DsNavLink[];
    /** Шлях активного розділу */
    active?: string;
    /** Лежить поверх hero першого екрана */
    transparent?: boolean;
    cartCount?: number;
    home?: string;
    /** Вимикається, доки на сайті немає справжнього пошуку */
    showSearch?: boolean;
  }>(),
  { links: () => [], cartCount: 0, home: "/", showSearch: true },
);

const emit = defineEmits<{ openCart: []; openMenu: []; search: [] }>();

const { y } = useWindowScroll();
const compact = computed(() => y.value > 40);
/** Прозора лише доки шапка ще над фото — далі вмикається тло */
const overHero = computed(() => props.transparent && y.value < 40);
const tone = computed<"default" | "inverse">(() => (overHero.value ? "inverse" : "default"));
</script>

<template>
  <header
    class="ds-header"
    :class="{
      'ds-header--compact': compact,
      'ds-header--transparent': overHero,
      'ds-header--fixed': props.transparent,
    }"
  >
    <DsIconButton
      icon="menu"
      label="Меню"
      :tone="tone"
      class="ds-header__burger"
      @click="emit('openMenu')"
    />

    <nav class="ds-header__nav">
      <NuxtLink
        v-for="l in props.links"
        :key="l.to"
        :to="l.to"
        class="ds-header__link"
        :class="{ 'ds-header__link--active': props.active === l.to }"
      >
        {{ l.label }}
      </NuxtLink>
    </nav>

    <DsWordmark :to="props.home" :size="compact ? 18 : 21" :tone="tone" />

    <div class="ds-header__utilities">
      <slot name="utilities" :tone="tone" />
      <DsIconButton
        v-if="props.showSearch"
        icon="search"
        label="Пошук"
        :tone="tone"
        class="ds-header__search"
        @click="emit('search')"
      />
      <DsIconButton
        icon="shopping-bag"
        label="Кошик"
        :tone="tone"
        :badge="props.cartCount"
        @click="emit('openCart')"
      />
    </div>
  </header>
</template>

<style scoped>
.ds-header {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  height: var(--header-height);
  padding: 0 var(--gutter-lg);
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-foreground);
  transition:
    height var(--duration) var(--ease-standard),
    background-color var(--duration) var(--ease-standard),
    border-color var(--duration) var(--ease-standard);
}

.ds-header--fixed {
  position: fixed;
  inset-inline: 0;
}

.ds-header--compact {
  height: var(--header-height-scrolled);
}

.ds-header--transparent {
  background: transparent;
  border-bottom-color: transparent;
  color: var(--color-foreground-inverse);
}

.ds-header__nav {
  display: none;
  gap: var(--space-8);
  flex: 1;
}

.ds-header__link {
  padding: var(--space-2) 0;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.72;
  border-bottom: 1px solid transparent;
  transition:
    var(--transition-color),
    opacity var(--duration-fast) var(--ease-standard);
}

.ds-header__link:hover {
  opacity: 1;
  text-decoration: none;
}

.ds-header__link--active {
  opacity: 1;
  border-bottom-color: currentcolor;
}

.ds-header__burger {
  margin-left: -12px;
}

.ds-header__utilities {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);
  margin-right: -12px;
}

.ds-header__search {
  display: none;
}

@media (min-width: 1024px) {
  .ds-header__burger {
    display: none;
  }

  .ds-header__nav {
    display: flex;
  }

  .ds-header__search {
    display: inline-flex;
  }

  .ds-header__utilities {
    flex: 1;
  }
}
</style>
