<script setup lang="ts">
// PROTOTYPE — підвал на DsFooter: темний шоколад, контакти, розділи, правове.
import { protoDelivery } from "~/data/prototype";
</script>

<template>
  <DsFooter
    note="Квіткова майстерня у Львові. Збираємо букети щоранку — з тих квітів, які самі поставили б удома."
    :social="{ label: 'Instagram', href: 'https://instagram.com/marmur.flowers' }"
    legal="Прототип для обговорення дизайну"
    newsletter
    :columns="[
      {
        title: 'Магазин',
        links: [
          { label: 'Каталог', to: '/prototype/catalog' },
          { label: 'Мікс-букети', to: '/prototype/catalog?category=mix' },
          { label: 'Моно-букети', to: '/prototype/catalog?category=mono' },
          { label: 'Подарунки', to: '/prototype/catalog?category=gift' },
          { label: 'Букет нареченої', to: '/prototype/catalog?category=bride' },
        ],
      },
      {
        title: 'Студія',
        links: [
          { label: 'Про нас', to: '/prototype/about' },
          { label: 'Навчання', to: '/prototype/school' },
          { label: 'Декор свята', to: '/prototype/catalog?category=decor' },
          { label: 'Квіткова підписка', to: '/prototype/catalog?category=flower-sub' },
        ],
      },
      {
        title: 'Сервіс',
        links: [
          { label: 'Доставка', to: '/prototype/delivery' },
          { label: 'Самовивіз', to: '/prototype/delivery' },
          { label: 'Оплата', to: '/prototype/delivery' },
        ],
      },
    ]"
  >
    <template #contacts>
      <dl class="proto-footer__contacts">
        <dt class="ds-meta">Майстерня</dt>
        <dd class="ds-mono">{{ protoDelivery.pickup.address }}</dd>
        <dd class="ds-mono">{{ protoDelivery.pickup.hours }}</dd>
        <dt class="ds-meta">Звʼязок</dt>
        <dd class="ds-mono">{{ protoDelivery.phone }}</dd>
        <dd class="ds-mono">{{ protoDelivery.instagram }}</dd>
      </dl>
    </template>
  </DsFooter>
</template>

<style scoped>
.proto-footer__contacts {
  margin: var(--space-8) 0 0;
  display: grid;
  gap: var(--space-1);
  font: var(--type-small);
  color: var(--color-foreground-muted);
}

.proto-footer__contacts dt {
  color: var(--color-foreground);
  margin-top: var(--space-4);
}

.proto-footer__contacts dt:first-child {
  margin-top: 0;
}

.proto-footer__contacts dd {
  margin: 0;
}
</style>
