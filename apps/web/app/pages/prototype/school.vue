<script setup lang="ts">
// PROTOTYPE — «Навчання» із заявкою (mock).
// Заявка, а не замовлення: без кошика й онлайн-оплати.
definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Навчання — Marmúr" });

const toast = useToast();
const form = reactive({ name: "", phone: "", note: "" });

const programmes = [
  "Базовий курс — 4 заняття по 3 години",
  "Майстер-клас вихідного дня — 1 зустріч",
  "Індивідуальний інтенсив — програма під вас",
];

function submit() {
  if (!form.name || !form.phone) {
    toast.add({ title: "Вкажіть імʼя і телефон", color: "warning" });
    return;
  }
  toast.add({
    title: "Заявку отримано",
    description: "Зателефонуємо протягом дня і розкажемо про найближчі групи.",
    color: "primary",
  });
  form.name = "";
  form.phone = "";
  form.note = "";
}
</script>

<template>
  <div class="ds-container ds-section">
    <div class="ds-split school">
      <div>
        <DsSectionHeading
          eyebrow="Школа флористики"
          title="Навчіться збирати букети, які хочеться дарувати"
        />

        <div class="school__text">
          <p class="ds-body ds-muted">
            Індивідуальні заняття та мінігрупи до чотирьох людей у нашій майстерні. Від першого
            спірального букета до комерційної флористики й роботи з весіллями.
          </p>
          <p class="ds-body ds-muted">
            Усі матеріали й квіти включені — свій букет ви забираєте з собою.
          </p>
        </div>

        <ul class="school__programmes">
          <li v-for="item in programmes" :key="item" class="school__programme">
            <span class="ds-body">{{ item }}</span>
          </li>
        </ul>
      </div>

      <form class="ds-panel school__form" @submit.prevent="submit">
        <h2 class="ds-h3">Залишити заявку</h2>
        <p class="ds-small ds-muted">Розкажемо про програму, дати й вартість — без зобовʼязань.</p>

        <DsInput v-model="form.name" label="Імʼя" placeholder="Оля" autocomplete="name" required />
        <DsInput
          v-model="form.phone"
          label="Телефон"
          type="tel"
          placeholder="+380 __ ___ __ __"
          autocomplete="tel"
          required
        />
        <DsInput
          v-model="form.note"
          label="Коментар"
          :rows="3"
          placeholder="Наприклад: цікавить курс для початківців"
        />

        <DsButton type="submit" variant="premium" full-width> Надіслати заявку </DsButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.school {
  align-items: start;
}

.school__text {
  margin-top: var(--space-8);
  display: grid;
  gap: var(--space-4);
  max-width: 56ch;
}

.school__programmes {
  list-style: none;
  margin: var(--space-12) 0 0;
  padding: 0;
}

.school__programme {
  padding: var(--space-4) 0;
  border-top: var(--border-hairline);
}

.school__programme:last-child {
  border-bottom: var(--border-hairline);
}

.school__form {
  display: grid;
  gap: var(--space-6);
  align-content: start;
}
</style>
