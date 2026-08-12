<script setup lang="ts">
/**
 * Marmúr DS → components/core/IconButton.
 * Утиліти шапки: пошук, обране, кошик, меню. 44px зона дотику, без тла.
 */
// Імпорт замість resolveComponent('NuxtLink') — інакше варіант із `to`
// рендериться як мертвий тег <NuxtLink> і нікуди не веде.
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    icon: string;
    label: string;
    size?: number;
    /** Лічильник у кошику; 0 і null не показуються */
    badge?: number | null;
    tone?: "default" | "inverse";
    to?: string;
  }>(),
  { size: 18, tone: "default", badge: null },
);
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :to="props.to"
    :type="props.to ? undefined : 'button'"
    class="ds-icon-button"
    :class="{ 'ds-icon-button--inverse': props.tone === 'inverse' }"
    :aria-label="props.label"
    :title="props.label"
  >
    <DsIcon :name="props.icon" :size="props.size" />
    <span v-if="props.badge" class="ds-icon-button__badge">{{ props.badge }}</span>
  </component>
</template>

<style scoped>
.ds-icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target);
  height: var(--touch-target);
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--color-foreground);
  cursor: pointer;
  transition:
    var(--transition-color),
    opacity var(--duration-fast) var(--ease-standard);
}

.ds-icon-button:hover {
  opacity: var(--hover-opacity);
  text-decoration: none;
}

.ds-icon-button--inverse {
  color: var(--color-foreground-inverse);
}

.ds-icon-button__badge {
  position: absolute;
  top: 6px;
  right: 4px;
  font: var(--type-meta);
  font-size: 10px;
  letter-spacing: 0;
  color: var(--color-foreground-muted);
}

.ds-icon-button--inverse .ds-icon-button__badge {
  color: var(--color-foreground-inverse);
}
</style>
