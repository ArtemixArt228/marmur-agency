<script setup lang="ts">
// PROTOTYPE — mock-вхід за телефоном + СМС-кодом (без справжніх СМС).
// Форма — єдина поверхня з рамкою в системі (§31): біле тло, 1px sand.
const isOpen = useState<boolean>("proto-login-open", () => false);
const { isLoggedIn } = usePrototypeShop();
const toast = useToast();

const step = ref<"phone" | "code">("phone");
const phone = ref("");
const code = ref("");

watch(isOpen, (open) => {
  if (open) {
    step.value = "phone";
    phone.value = "";
    code.value = "";
  }
});

function sendCode() {
  if (phone.value.replace(/\D/g, "").length < 9) return;
  step.value = "code";
}

function confirmCode() {
  if (code.value.replace(/\D/g, "").length < 4) return;
  isLoggedIn.value = true;
  isOpen.value = false;
  toast.add({
    title: "Вітаємо знову",
    description: "Знижка постійного клієнта −10% уже врахована в цінах.",
    color: "primary",
  });
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Вхід за кодом" :ui="{ content: 'proto-login' }">
    <template #body>
      <div v-if="step === 'phone'" class="proto-login__step">
        <p class="ds-small ds-muted">
          Паролів немає. Введіть номер — надішлемо СМС із кодом входу.
        </p>
        <DsInput
          v-model="phone"
          label="Номер телефону"
          type="tel"
          autocomplete="tel"
          placeholder="+380 __ ___ __ __"
          @keydown.enter="sendCode"
        />
        <DsButton variant="premium" full-width @click="sendCode"> Отримати код </DsButton>
      </div>

      <div v-else class="proto-login__step">
        <p class="ds-small ds-muted">
          Надіслали код на {{ phone || "ваш номер" }}. У прототипі підійде будь-який.
        </p>
        <DsInput
          v-model="code"
          label="Код із СМС"
          inputmode="numeric"
          placeholder="0000"
          @keydown.enter="confirmCode"
        />
        <DsButton variant="premium" full-width @click="confirmCode"> Увійти </DsButton>
        <DsButton variant="ghost" @click="step = 'phone'">Змінити номер</DsButton>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.proto-login__step {
  display: grid;
  gap: var(--space-6);
  justify-items: stretch;
}

.proto-login__step :deep(.ds-button--ghost) {
  justify-self: start;
}
</style>

<style>
.proto-login {
  box-shadow: var(--shadow-overlay);
}
</style>
