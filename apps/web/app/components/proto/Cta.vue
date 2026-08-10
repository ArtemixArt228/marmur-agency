<script setup lang="ts">
// PROTOTYPE — тонка обгортка над DsButton, щоб виклики CTA лишались
// однослівними. Уся стилістика живе в дизайн-системі.
const props = withDefaults(
  defineProps<{
    to?: string;
    variant?: "solid" | "outline" | "dark";
    block?: boolean;
    type?: "button" | "submit";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    noArrow?: boolean;
  }>(),
  { variant: "solid", type: "button", size: "md" },
);

const dsVariant = computed(
  () => (({ solid: "premium", outline: "secondary", dark: "primary" }) as const)[props.variant],
);
</script>

<template>
  <DsButton
    :to="props.to"
    :type="props.type"
    :size="props.size"
    :variant="dsVariant"
    :full-width="props.block"
    :disabled="props.disabled"
    :icon-right="props.noArrow ? undefined : 'arrow-right'"
  >
    <slot />
  </DsButton>
</template>
