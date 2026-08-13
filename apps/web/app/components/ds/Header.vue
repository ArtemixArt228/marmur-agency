<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/Header.
 *
 * Тонка шапка кольору ivory із hairline знизу, 60px і на скролі теж:
 * стану 76px більше немає, стискатись їй нема з чого. Над hero-фотографією
 * (`transparent`) — прозора, зі світлим текстом. Це єдиний фіксований
 * елемент інтерфейсу.
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
    /** Рендерить слот #search між навігацією й утилітами */
    showSearch?: boolean;
  }>(),
  { links: () => [], cartCount: 0, home: "/", showSearch: true },
);

const emit = defineEmits<{ openCart: []; openMenu: [] }>();

const { y } = useWindowScroll();
/**
 * Смуга-анонс над шапкою лежить у потоці й має власне місце. Фіксована
 * шапка стоїть під нею і опускається рівно на ту частину смуги, яку ще
 * видно, — тож перекриває вона лише hero, а не смугу.
 */
const scrollY = computed(() => `${Math.round(y.value)}px`);
/** Прозора лише доки шапка ще над фото — далі вмикається тло */
const overHero = computed(() => props.transparent && y.value < 40);
const tone = computed<"default" | "inverse">(() => (overHero.value ? "inverse" : "default"));
</script>

<template>
  <header
    class="ds-header"
    :class="{
      'ds-header--transparent': overHero,
      'ds-header--fixed': props.transparent,
    }"
    :style="props.transparent ? { '--scroll-y': scrollY } : undefined"
  >
    <DsIconButton
      icon="menu"
      label="Меню"
      :tone="tone"
      class="ds-header__burger"
      @click="emit('openMenu')"
    />

    <DsWordmark :to="props.home" :size="18" :tone="tone" />

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

    <div v-if="props.showSearch" class="ds-header__search">
      <slot name="search" :tone="tone" />
    </div>

    <div class="ds-header__utilities">
      <slot name="utilities" :tone="tone" />
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
    background-color var(--duration) var(--ease-standard),
    border-color var(--duration) var(--ease-standard);
}

.ds-header--fixed {
  position: fixed;
  inset-inline: 0;
  top: max(0px, calc(var(--announce-height) - var(--scroll-y, 0px)));
}

.ds-header--transparent {
  background: transparent;
  border-bottom-color: transparent;
  color: var(--color-foreground-inverse);
}

.ds-header__nav {
  display: none;
  gap: var(--space-8);
}

.ds-header__link {
  padding: var(--space-2) 0;
  font: var(--type-label-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label-sm);
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
  min-width: 0;
}

@media (min-width: 1024px) {
  /*
   * Сітка Peak: знак ліворуч, навігація, поле пошуку, утиліти праворуч.
   * Пошук забирає вільне місце — саме він тримає центр шапки.
   */
  .ds-header {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
  }

  .ds-header__burger {
    display: none;
  }

  .ds-header__nav {
    display: flex;
  }

  .ds-header__search {
    display: block;
    max-width: 360px;
    justify-self: end;
  }
}
</style>
