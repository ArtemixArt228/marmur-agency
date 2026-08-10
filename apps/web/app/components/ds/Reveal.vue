<script setup lang="ts">
/**
 * Поява блоку при скролі. У Claude Design окремого компонента немає —
 * це рух із §25, знятий з ui_kits: тільки прозорість і мʼякий зсув,
 * 500ms, `--ease-entrance`. Без пружин, без parallax, один раз.
 */
const props = withDefaults(defineProps<{ delay?: number; as?: string }>(), {
  delay: 0,
  as: "div",
});

const el = ref<HTMLElement | null>(null);
const revealed = ref(false);

onMounted(() => {
  if (!el.value) return;
  if (typeof IntersectionObserver === "undefined") {
    revealed.value = true;
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealed.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.15 },
  );
  observer.observe(el.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    class="ds-reveal"
    :data-revealed="String(revealed)"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>
