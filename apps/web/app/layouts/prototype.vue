<script setup lang="ts">
// PROTOTYPE — спільний каркас усіх сторінок прототипу.
// Сторінка з повноекранним hero декларує definePageMeta({ heroHeader: true }) —
// тоді шапка лягає поверх першого екрана без тла (§13 дизайн-системи).
import { protoDelivery, protoNav } from "~/data/prototype";

const route = useRoute();
const menuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <div class="proto-shell">
    <DsAnnouncementBar
      :items="[
        'Свіжі квіти щоранку',
        `Замовлення до ${protoDelivery.cutoffHour}:00 — доставка сьогодні`,
        `Безкоштовна доставка від ${protoDelivery.freeFrom.toLocaleString('uk-UA')} ₴`,
      ]"
      :left="{ label: 'Наша історія', to: '/prototype/about' }"
      :right="{ label: 'Майстерня', to: '/prototype/delivery' }"
    />

    <ProtoSiteHeader :transparent="route.meta.heroHeader === true" @open-menu="menuOpen = true" />

    <main class="proto-shell__main">
      <slot />
    </main>

    <ProtoSiteFooter />

    <DsMenuOverlay
      :open="menuOpen"
      :links="protoNav"
      :secondary="[
        { label: 'Кошик', to: '/prototype/checkout' },
        { label: 'Догляд за квітами', to: '/prototype/delivery' },
        { label: 'Контакти', to: '/prototype/about' },
      ]"
      @close="menuOpen = false"
    />

    <ProtoCartSlideover />
    <ProtoLoginModal />
  </div>
</template>

<style scoped>
.proto-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--color-background);
  color: var(--color-foreground);
}

.proto-shell__main {
  flex: 1;
}
</style>
