<script setup lang="ts">
/**
 * Marmúr DS → components/navigation/MenuOverlay.
 * Повноекранне ivory-меню для вузьких екранів. Зʼявляється прозорістю
 * за 320ms — без висувань і без затемнення.
 */
import type { DsNavLink } from "./Header.vue";

const props = withDefaults(
  defineProps<{
    open: boolean;
    links?: DsNavLink[];
    secondary?: DsNavLink[];
  }>(),
  { links: () => [], secondary: () => [] },
);

const emit = defineEmits<{ close: [] }>();

/** Меню на весь екран — тіло сторінки під ним не має скролитись */
watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      document.documentElement.style.overflow = open ? "hidden" : "";
    }
  },
);

onUnmounted(() => {
  if (import.meta.client) document.documentElement.style.overflow = "";
});

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.open) emit("close");
  };
  window.addEventListener("keydown", onKey);
  onUnmounted(() => window.removeEventListener("keydown", onKey));
});
</script>

<template>
  <div
    class="ds-menu"
    :class="{ 'ds-menu--open': props.open }"
    role="dialog"
    aria-modal="true"
    aria-label="Меню"
    :aria-hidden="!props.open"
    :inert="!props.open"
  >
    <div class="ds-menu__bar">
      <DsWordmark :size="21" />
      <DsIconButton icon="x" label="Закрити" class="ds-menu__close" @click="emit('close')" />
    </div>

    <nav class="ds-menu__nav">
      <NuxtLink
        v-for="l in props.links"
        :key="l.to"
        :to="l.to"
        class="ds-menu__link"
        @click="emit('close')"
      >
        {{ l.label }}
      </NuxtLink>
    </nav>

    <div class="ds-menu__secondary">
      <NuxtLink
        v-for="l in props.secondary"
        :key="l.to"
        :to="l.to"
        class="ds-menu__secondary-link"
        @click="emit('close')"
      >
        {{ l.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.ds-menu {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration) var(--ease-standard);
}

.ds-menu--open {
  opacity: 1;
  pointer-events: auto;
}

.ds-menu__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--gutter);
}

.ds-menu__close {
  margin-right: -12px;
}

.ds-menu__nav {
  padding: var(--space-12) var(--gutter);
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}

.ds-menu__link {
  font: var(--type-h2);
  font-size: 36px;
  color: var(--color-foreground);
  text-decoration: none;
}

.ds-menu__secondary {
  margin-top: auto;
  padding: var(--space-12) var(--gutter);
  border-top: var(--border-hairline);
  display: grid;
  gap: var(--space-4);
  justify-items: start;
}

.ds-menu__secondary-link {
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  color: var(--color-foreground-muted);
  text-decoration: none;
}

@media (min-width: 1024px) {
  .ds-menu {
    display: none;
  }
}
</style>
