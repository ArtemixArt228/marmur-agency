<script setup lang="ts">
// PROTOTYPE — шапка сайту на DsHeader.
// Тло і hairline є від першого пікселя: прозорого режиму над hero немає,
// тож `DsHeader` лишається липким і в потоці на всіх сторінках.
import { protoNav } from "~/data/prototype";

const emit = defineEmits<{ openMenu: [] }>();

const route = useRoute();
const router = useRouter();
const { isLoggedIn, cartCount, discountPercent } = usePrototypeShop();

const searchQuery = ref("");

function onSearch(q: string) {
  searchQuery.value = "";
  router.push({ path: "/prototype/catalog", query: { q } });
}
const isCartOpen = useState<boolean>("proto-cart-open");
const isLoginOpen = useState<boolean>("proto-login-open", () => false);
const toast = useToast();

const activePath = computed(() => {
  const match = protoNav.find((l) => l.to.split("?")[0] === route.path);
  return match?.to;
});

function onAccount() {
  if (!isLoggedIn.value) {
    isLoginOpen.value = true;
    return;
  }
  isLoggedIn.value = false;
  toast.add({ title: "Ви вийшли з акаунта", color: "neutral" });
}
</script>

<template>
  <DsHeader
    :links="protoNav"
    :active="activePath"
    :cart-count="cartCount"
    :show-search="true"
    home="/prototype"
    @open-cart="isCartOpen = true"
    @open-menu="emit('openMenu')"
  >
    <template #search="{ tone }">
      <DsSearchField
        v-model="searchQuery"
        :tone="tone"
        placeholder="Пошук: півонії, ваза, підписка…"
        @submit="onSearch"
      />
    </template>

    <template #utilities="{ tone }">
      <DsIconButton
        :icon="isLoggedIn ? 'user-round-check' : 'user-round'"
        :label="isLoggedIn ? `Вийти · знижка −${discountPercent}%` : 'Увійти'"
        :tone="tone"
        @click="onAccount"
      />
    </template>
  </DsHeader>
</template>
