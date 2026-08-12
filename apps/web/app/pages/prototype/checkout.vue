<script setup lang="ts">
// PROTOTYPE — оформлення замовлення (оплата — імітація).
// Форми — єдина поверхня з рамкою в системі; підсумок праворуч — єдиний
// картковий блок (§31). Радіо-групи зібрані на DsOptionSwatch.
import { protoDelivery } from "~/data/prototype";

definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Оформлення — Marmúr" });

const {
  cart,
  productById,
  finalPrice,
  formatUah,
  cartTotal,
  clearCart,
  isBeforeCutoff,
  windowsForDate,
  isLoggedIn,
  discountPercent,
} = usePrototypeShop();

const isLoginOpen = useState<boolean>("proto-login-open", () => false);
const toast = useToast();

const items = computed(() =>
  cart.value.map((i) => ({ ...i, product: productById(i.productId)! })).filter((i) => i.product),
);

/** Чи всі товари доступні сьогодні (інакше — лише завтра) */
const allAvailableToday = computed(() => items.value.every((i) => i.product.available));

const buyer = reactive({ name: "", phone: "" });

const forWhom = ref<"self" | "gift">("gift");
const recipient = reactive({ name: "", phone: "" });
const surprise = ref(true);
const anonymous = ref(false);
const cardText = ref("");

const method = ref<"delivery" | "pickup">("delivery");
const zoneId = ref(protoDelivery.zones[0]!.id);
const day = ref<"today" | "tomorrow">("today");

const canToday = computed(
  () => isBeforeCutoff.value && allAvailableToday.value && windowsForDate("today").length > 0,
);

watchEffect(() => {
  if (!canToday.value) day.value = "tomorrow";
});

const windows = computed(() => windowsForDate(day.value));
const timeWindow = ref<string | undefined>(undefined);
watchEffect(() => {
  if (!timeWindow.value || !windows.value.includes(timeWindow.value)) {
    timeWindow.value = windows.value[0];
  }
});

const zone = computed(() => protoDelivery.zones.find((z) => z.id === zoneId.value));
const freeDelivery = computed(
  () => method.value === "delivery" && cartTotal.value >= protoDelivery.freeFrom,
);
const deliveryPrice = computed(() =>
  method.value === "pickup" || freeDelivery.value ? 0 : (zone.value?.price ?? 0),
);
const total = computed(() => cartTotal.value + deliveryPrice.value);

function pay(kind: "card" | "applepay") {
  if (!buyer.name || !buyer.phone) {
    toast.add({ title: "Вкажіть ваше імʼя і телефон", color: "warning" });
    return;
  }
  if (forWhom.value === "gift" && (!recipient.name || !recipient.phone)) {
    toast.add({ title: "Вкажіть імʼя і телефон отримувача", color: "warning" });
    return;
  }
  const lastOrder = useState<Record<string, unknown>>("proto-last-order");
  lastOrder.value = {
    kind,
    day: day.value,
    method: method.value,
    window: method.value === "delivery" ? timeWindow.value : null,
    zone: zone.value?.label,
    total: total.value,
    surprise: forWhom.value === "gift" && surprise.value,
    anonymous: forWhom.value === "gift" && anonymous.value,
    card: cardText.value,
    recipient: forWhom.value === "gift" ? recipient.name : buyer.name,
  };
  clearCart();
  navigateTo("/prototype/thanks");
}
</script>

<template>
  <div class="ds-container ds-section checkout">
    <DsSectionHeading eyebrow="Замовлення" title="Оформлення" />

    <div v-if="items.length === 0" class="checkout__empty">
      <p class="ds-body ds-muted">Кошик порожній — почніть із каталогу.</p>
      <DsButton variant="premium" to="/prototype/catalog" icon-right="arrow-right">
        До каталогу
      </DsButton>
    </div>

    <div v-else class="ds-split ds-split-aside checkout__body">
      <div class="checkout__form">
        <!-- Контакти -->
        <section class="checkout__section">
          <h2 class="ds-h3">Ваші контакти</h2>

          <p v-if="!isLoggedIn" class="ds-small checkout__hint">
            Постійний клієнт?
            <button type="button" class="checkout__link" @click="isLoginOpen = true">
              Увійдіть за номером телефону
            </button>
            — і ціни перерахуються з вашою знижкою.
          </p>

          <div class="checkout__pair">
            <DsInput
              v-model="buyer.name"
              label="Імʼя"
              placeholder="Оля"
              autocomplete="name"
              required
            />
            <DsInput
              v-model="buyer.phone"
              label="Телефон"
              type="tel"
              placeholder="+380 __ ___ __ __"
              autocomplete="tel"
              required
            />
          </div>
        </section>

        <!-- Кому -->
        <section class="checkout__section">
          <h2 class="ds-h3">Кому квіти</h2>
          <div class="checkout__choices" role="group" aria-label="Кому квіти">
            <DsOptionSwatch :selected="forWhom === 'gift'" @click="forWhom = 'gift'">
              Це подарунок
            </DsOptionSwatch>
            <DsOptionSwatch :selected="forWhom === 'self'" @click="forWhom = 'self'">
              Собі
            </DsOptionSwatch>
          </div>

          <div v-if="forWhom === 'gift'" class="checkout__gift">
            <div class="checkout__pair">
              <DsInput
                v-model="recipient.name"
                label="Імʼя отримувача"
                placeholder="Марія"
                required
              />
              <DsInput
                v-model="recipient.phone"
                label="Телефон отримувача"
                type="tel"
                placeholder="+380 __ ___ __ __"
                required
              />
            </div>

            <label class="checkout__check">
              <input v-model="surprise" type="checkbox" />
              <span>
                <span class="ds-small">Сюрприз — не дзвонити отримувачу заздалегідь</span>
                <span class="ds-small ds-subtle">Час і адресу узгодимо тільки з вами</span>
              </span>
            </label>

            <label class="checkout__check">
              <input v-model="anonymous" type="checkbox" />
              <span class="ds-small">Не казати, від кого квіти</span>
            </label>

            <DsInput
              v-model="cardText"
              label="Текст листівки"
              hint="Напишемо від руки"
              :rows="3"
              placeholder="Наприклад: «З днем народження»"
            />
          </div>
        </section>

        <!-- Отримання -->
        <section class="checkout__section">
          <h2 class="ds-h3">Отримання</h2>
          <div class="checkout__choices" role="group" aria-label="Спосіб отримання">
            <DsOptionSwatch :selected="method === 'delivery'" @click="method = 'delivery'">
              Доставка курʼєром
            </DsOptionSwatch>
            <DsOptionSwatch :selected="method === 'pickup'" @click="method = 'pickup'">
              Самовивіз
            </DsOptionSwatch>
          </div>

          <p v-if="!allAvailableToday" class="ds-small checkout__notice">
            У кошику є букет «на завтра» — доставимо все разом завтра.
          </p>
          <p v-else-if="!isBeforeCutoff" class="ds-small checkout__notice">
            Після {{ protoDelivery.cutoffHour }}:00 приймаємо на завтра — привеземо з самого ранку.
          </p>

          <div class="checkout__when">
            <p class="ds-meta ds-muted">
              {{ method === "pickup" ? "Коли заберете" : "Коли доставити" }}
            </p>
            <div class="checkout__choices">
              <DsOptionSwatch
                :selected="day === 'today'"
                :disabled="!canToday"
                @click="day = 'today'"
              >
                Сьогодні
              </DsOptionSwatch>
              <DsOptionSwatch :selected="day === 'tomorrow'" @click="day = 'tomorrow'">
                Завтра
              </DsOptionSwatch>
            </div>
          </div>

          <div v-if="method === 'delivery'" class="checkout__pair">
            <DsSelect
              v-model="zoneId"
              label="Зона доставки"
              :options="
                protoDelivery.zones.map((z) => ({
                  value: z.id,
                  label: `${z.label} — ${formatUah(z.price)}`,
                }))
              "
            />
            <DsSelect
              v-if="timeWindow"
              :model-value="timeWindow"
              label="Часове вікно"
              :options="windows"
              @update:model-value="timeWindow = $event"
            />
          </div>
          <p v-else class="ds-small ds-muted checkout__pickup">
            {{ protoDelivery.pickup.address }} · {{ protoDelivery.pickup.hours }}. Замовлення
            збережемо за вашим номером телефону.
          </p>
        </section>
      </div>

      <!-- Підсумок — єдиний картковий блок у системі -->
      <aside class="ds-panel checkout__summary">
        <h2 class="ds-h3">Ваше замовлення</h2>

        <ul class="checkout__items">
          <li v-for="item in items" :key="item.productId" class="checkout__item">
            <span class="ds-small checkout__item-name">
              {{ item.product.name }} × {{ item.qty }}
            </span>
            <span class="ds-small ds-price">
              {{ formatUah(finalPrice(item.product) * item.qty) }}
            </span>
          </li>
        </ul>

        <hr class="ds-rule checkout__rule" />

        <div class="checkout__line">
          <span class="ds-small ds-muted">Доставка</span>
          <span class="ds-small ds-price">
            {{ deliveryPrice === 0 ? "безкоштовно" : formatUah(deliveryPrice) }}
          </span>
        </div>
        <p v-if="method === 'delivery' && !freeDelivery" class="ds-small ds-subtle">
          Безкоштовна доставка від {{ formatUah(protoDelivery.freeFrom) }}
        </p>
        <div v-if="discountPercent > 0" class="checkout__line">
          <span class="ds-small ds-muted">Знижка постійного клієнта</span>
          <span class="ds-small">−{{ discountPercent }}%</span>
        </div>

        <div class="checkout__total">
          <span class="ds-meta">Разом</span>
          <span class="ds-price checkout__total-value">{{ formatUah(total) }}</span>
        </div>

        <div class="checkout__pay">
          <DsButton variant="primary" full-width @click="pay('applepay')"> Apple Pay </DsButton>
          <DsButton variant="premium" full-width @click="pay('card')"> Оплатити карткою </DsButton>
        </div>

        <p class="ds-small ds-subtle checkout__disclaimer">
          Оплата — імітація для прототипу. Якщо букета раптом не стане, флорист запропонує заміну
          або миттєве повернення коштів.
        </p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.checkout__empty {
  margin-top: var(--space-16);
  display: grid;
  justify-items: start;
  gap: var(--space-6);
}

.checkout__body {
  margin-top: var(--space-16);
}

.checkout__form {
  display: grid;
  gap: var(--space-16);
}

.checkout__section {
  display: grid;
  gap: var(--space-6);
  align-content: start;
}

.checkout__hint {
  color: var(--color-foreground-muted);
}

.checkout__link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-brand);
  text-decoration: underline;
  text-underline-offset: 0.24em;
  text-decoration-color: var(--color-border-strong);
}

.checkout__pair {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .checkout__pair {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.checkout__choices {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.checkout__gift {
  display: grid;
  gap: var(--space-6);
}

.checkout__check {
  display: flex;
  align-items: start;
  gap: var(--space-3);
  cursor: pointer;
}

.checkout__check > span {
  display: grid;
  gap: var(--space-1);
}

/* Чекбокса в дизайн-системі немає — тримаємо його в тій самій мові:
   квадрат 18px, 1px sand, 2px радіус, заливка espresso. */
.checkout__check input {
  appearance: none;
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  flex: none;
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-color);
}

.checkout__check input:checked {
  background: var(--color-brand);
  border-color: var(--color-brand);
}

.checkout__notice {
  padding: var(--space-4) var(--space-6);
  border: var(--border-hairline);
  border-radius: var(--radius-sm);
  background: var(--color-surface-sunken);
  color: var(--color-foreground-muted);
}

.checkout__when {
  display: grid;
  gap: var(--space-3);
}

.checkout__summary {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

@media (min-width: 1024px) {
  .checkout__summary {
    position: sticky;
    top: calc(var(--header-height) + var(--space-8));
  }
}

.checkout__items {
  list-style: none;
  margin: var(--space-2) 0 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}

.checkout__item,
.checkout__line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.checkout__item-name {
  color: var(--color-foreground-muted);
}

.checkout__rule {
  margin-block: var(--space-2);
}

.checkout__total {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: var(--border-hairline);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.checkout__total-value {
  font: var(--type-mono-lg);
}

.checkout__pay {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-3);
}

.checkout__disclaimer {
  margin-top: var(--space-2);
}
</style>
