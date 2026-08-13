<script setup lang="ts">
// PROTOTYPE — спільний каркас усіх сторінок прототипу.
// Шапка всюди однакова: з тлом і волосяною лінією від першого пікселя, а не
// лише після скролу. Прозорого режиму над hero немає.
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
        'Свіжі букети щоранку',
        `Замовлення до ${protoDelivery.cutoffHour}:00 — доставка сьогодні`,
        `Безкоштовна доставка від ${protoDelivery.freeFrom.toLocaleString('uk-UA')} ₴`,
        'Пакування включено',
        'Мікс · моно · корзини та коробки',
      ]"
    />

    <ProtoSiteHeader @open-menu="menuOpen = true" />

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
