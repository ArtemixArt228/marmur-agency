<script setup lang="ts">
// PROTOTYPE — підвал на DsFooter: темний шоколад, контакти, розділи, правове.
import { protoDelivery } from "~/data/prototype";
</script>

<template>
  <DsFooter
    note="Квіткова майстерня у Львові. Збираємо букети щоранку — з тих квітів, які самі поставили б удома."
    :social="{ label: 'Instagram', href: 'https://instagram.com/marmur.flowers' }"
    legal="Прототип для обговорення дизайну"
    :columns="[
      {
        title: 'Магазин',
        links: [
          { label: 'Каталог', to: '/prototype/catalog' },
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
        <dd>{{ protoDelivery.pickup.address }}</dd>
        <dd>{{ protoDelivery.pickup.hours }}</dd>
        <dt class="ds-meta">Звʼязок</dt>
        <dd>{{ protoDelivery.phone }}</dd>
        <dd>{{ protoDelivery.instagram }}</dd>
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
  color: var(--color-foreground-subtle);
}

.proto-footer__contacts dt {
  color: var(--color-foreground-inverse);
  margin-top: var(--space-4);
}

.proto-footer__contacts dt:first-child {
  margin-top: 0;
}

.proto-footer__contacts dd {
  margin: 0;
}
</style>
