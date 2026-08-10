<script setup lang="ts">
// PROTOTYPE — плаваючий перемикач варіантів дизайну (лише dev)
const props = defineProps<{
  variants: { key: string; name: string }[];
}>();

const route = useRoute();
const router = useRouter();
const isDev = import.meta.dev;

const current = computed(() => {
  const key = String(route.query.variant ?? props.variants[0]!.key);
  return props.variants.find((v) => v.key === key) ?? props.variants[0]!;
});

function go(offset: number) {
  const idx = props.variants.findIndex((v) => v.key === current.value.key);
  const next = props.variants[(idx + offset + props.variants.length) % props.variants.length]!;
  router.replace({ query: { ...route.query, variant: next.key } });
}

function onKey(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null;
  if (
    target &&
    (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
  )
    return;
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "ArrowRight") go(1);
}

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div
    v-if="isDev"
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-stone-900 px-2 py-1.5 text-white shadow-xl"
  >
    <button
      class="grid size-7 place-items-center rounded-full transition hover:bg-white/15"
      aria-label="Попередній варіант"
      @click="go(-1)"
    >
      <UIcon name="i-lucide-chevron-left" class="size-4" />
    </button>
    <span class="min-w-40 px-1 text-center text-xs font-medium tracking-wide">
      {{ current.key }} — {{ current.name }}
    </span>
    <button
      class="grid size-7 place-items-center rounded-full transition hover:bg-white/15"
      aria-label="Наступний варіант"
      @click="go(1)"
    >
      <UIcon name="i-lucide-chevron-right" class="size-4" />
    </button>
  </div>
</template>
