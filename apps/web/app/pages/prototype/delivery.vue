<script setup lang="ts">
// PROTOTYPE — «Доставка»: рендериться з тих самих налаштувань, що й оформлення.
// Розділи розділені hairline, без іконкових плиток (§33 — декоративні іконки).
import { protoDelivery } from "~/data/prototype";

definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Доставка — Marmúr" });

const { formatUah } = usePrototypeShop();
</script>

<template>
  <div class="ds-container-narrow ds-section delivery">
    <DsSectionHeading
      eyebrow="Сервіс"
      title="Доставка"
      lede="Привеземо букет у зручне вам часове вікно — або чекатимемо вас у майстерні."
    />

    <section class="delivery__block">
      <p class="ds-meta ds-subtle">01 — Коли встигаємо сьогодні</p>
      <p class="ds-body ds-muted delivery__text">
        Замовлення до
        <span class="delivery__strong">{{ protoDelivery.cutoffHour }}:00</span> — доставка того ж
        дня. Пізніше — привеземо завтра, з першим вікном.
      </p>
      <p class="ds-small ds-subtle delivery__windows">
        Часові вікна: {{ protoDelivery.windows.join(" · ") }}
      </p>
    </section>

    <section class="delivery__block">
      <p class="ds-meta ds-subtle">02 — Зони й тарифи</p>
      <ul class="delivery__list">
        <li v-for="z in protoDelivery.zones" :key="z.id" class="delivery__row">
          <span class="ds-body">{{ z.label }}</span>
          <span class="ds-body ds-price">{{ formatUah(z.price) }}</span>
        </li>
        <li class="delivery__row">
          <span class="ds-body"> Замовлення від {{ formatUah(protoDelivery.freeFrom) }} </span>
          <span class="ds-body">безкоштовно</span>
        </li>
        <li class="delivery__row">
          <span class="ds-body">Самовивіз із майстерні</span>
          <span class="ds-body">безкоштовно</span>
        </li>
      </ul>
    </section>

    <section class="delivery__block">
      <p class="ds-meta ds-subtle">03 — Самовивіз</p>
      <p class="ds-body ds-muted delivery__text">
        {{ protoDelivery.pickup.address }} · {{ protoDelivery.pickup.hours }}
      </p>
    </section>

    <section class="delivery__block">
      <p class="ds-meta ds-subtle">04 — Якщо щось піде не так</p>
      <p class="ds-body ds-muted delivery__text">
        Квіти живі: якщо саме вашого букета раптом не стане, флорист одразу зателефонує і запропонує
        заміну тієї ж або більшої вартості — або миттєво повернемо оплату. Сюрпризи не зриваємо: з
        отримувачем нічого не узгоджуємо без вашої згоди.
      </p>
    </section>

    <div class="delivery__cta">
      <DsButton variant="premium" to="/prototype/catalog" icon-right="arrow-right">
        Переглянути колекцію
      </DsButton>
    </div>
  </div>
</template>

<style scoped>
.delivery__block {
  margin-top: var(--space-16);
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}

.delivery__text {
  margin-top: var(--space-6);
  max-width: 60ch;
}

.delivery__strong {
  color: var(--color-foreground);
}

.delivery__windows {
  margin-top: var(--space-3);
}

.delivery__list {
  list-style: none;
  margin: var(--space-6) 0 0;
  padding: 0;
}

.delivery__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-4) 0;
  border-bottom: var(--border-hairline);
}

.delivery__row:last-child {
  border-bottom: none;
}

.delivery__cta {
  margin-top: var(--space-16);
}
</style>
