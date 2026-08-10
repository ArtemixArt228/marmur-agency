<script setup lang="ts">
// PROTOTYPE — підтвердження замовлення.
definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Дякуємо — Marmúr" });

interface ProtoLastOrder {
  day?: "today" | "tomorrow";
  method?: "delivery" | "pickup";
  window?: string | null;
  zone?: string;
  total?: number;
  surprise?: boolean;
  recipient?: string;
}

const order = useState<ProtoLastOrder | undefined>("proto-last-order");
const { formatUah } = usePrototypeShop();

const dayWord = computed(() => (order.value?.day === "today" ? "сьогодні" : "завтра"));
</script>

<template>
  <div class="ds-container-narrow ds-section-lg thanks">
    <p class="ds-meta ds-subtle">Замовлення прийнято</p>

    <DsStatementBlock size="h1" class="thanks__statement">
      Дякуємо.<br />Далі — наша робота.
    </DsStatementBlock>

    <div v-if="order" class="thanks__detail">
      <p class="ds-body-lg ds-muted">
        <template v-if="order.method === 'delivery'">
          Букет для {{ order.recipient }} поїде {{ dayWord
          }}<template v-if="order.window">, у вікні {{ order.window }}</template
          ><template v-if="order.zone"> ({{ order.zone }})</template>.
        </template>
        <template v-else> Замовлення чекатиме на вас у майстерні {{ dayWord }}. </template>
        <template v-if="order.surprise"> Отримувачу не дзвонитимемо — це сюрприз. </template>
      </p>
      <p v-if="order.total" class="ds-small ds-subtle thanks__total">
        Оплачено {{ formatUah(order.total) }} · підтвердження надіслали СМС
      </p>
    </div>

    <p class="ds-body ds-muted thanks__note">
      Менеджер уже отримав ваше замовлення. Якщо щось знадобиться — ми на звʼязку за номером із СМС.
    </p>

    <div class="thanks__actions">
      <DsButton variant="premium" to="/prototype" icon-right="arrow-right"> На головну </DsButton>
      <DsButton variant="secondary" to="/prototype/catalog"> Переглянути колекцію </DsButton>
    </div>
  </div>
</template>

<style scoped>
.thanks__statement {
  margin-top: var(--space-8);
}

.thanks__detail {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
  max-width: 52ch;
}

.thanks__total {
  margin-top: var(--space-3);
}

.thanks__note {
  margin-top: var(--space-8);
  max-width: 52ch;
}

.thanks__actions {
  margin-top: var(--space-16);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
</style>
