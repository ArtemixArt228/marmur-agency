<script setup lang="ts">
/**
 * Marmúr DS → components/editorial/EditorialImage.
 *
 * Кадр фотографії: завжди гострі кути, ніколи не всередині декорованої
 * картки. Без `src` показує рівне нейтральне поле з підказкою, що саме тут
 * має бути знято — порожній кадр чесніший за стокове фото.
 */
const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    /** Значення aspect-ratio, зазвичай токен --ratio-* */
    ratio?: string;
    fill?: "sand" | "taupe" | "sunken" | "espresso" | "chocolate";
    placeholder?: string;
    caption?: string;
    /** Градієнт-захист під текстом поверх фото — єдиний градієнт у системі */
    scrim?: boolean;
    hoverZoom?: boolean;
    loading?: "lazy" | "eager";
  }>(),
  {
    alt: "",
    ratio: "var(--ratio-portrait)",
    fill: "sand",
    placeholder: "Photography",
    hoverZoom: true,
    loading: "lazy",
  },
);
</script>

<template>
  <figure class="ds-image">
    <div
      class="ds-image__frame"
      :class="[`ds-image__frame--${props.fill}`, { 'ds-image__frame--zoom': props.hoverZoom }]"
      :style="{ aspectRatio: props.ratio }"
    >
      <img
        v-if="props.src"
        :src="props.src"
        :alt="props.alt"
        :loading="props.loading"
        class="ds-image__img"
      />
      <span v-else-if="props.placeholder" class="ds-image__placeholder">
        {{ props.placeholder }}
      </span>
      <span v-if="props.scrim" class="ds-image__scrim" />
      <slot />
    </div>
    <figcaption v-if="props.caption" class="ds-image__caption">
      {{ props.caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.ds-image {
  margin: 0;
}

.ds-image__frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-none);
}

.ds-image__frame--sand {
  background: var(--sand);
  color: rgb(23 21 19 / 0.42);
}

.ds-image__frame--taupe {
  background: var(--taupe);
  color: rgb(23 21 19 / 0.5);
}

.ds-image__frame--sunken {
  background: var(--color-surface-sunken);
  color: rgb(23 21 19 / 0.36);
}

.ds-image__frame--espresso {
  background: var(--color-brand);
  color: rgb(245 241 234 / 0.5);
}

.ds-image__frame--chocolate {
  background: var(--color-brand-dark);
  color: rgb(245 241 234 / 0.45);
}

.ds-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: var(--transition-image);
}

/* 1 → 1.02 за 500ms. Більше система не масштабує нічого. */
.ds-image__frame--zoom:hover .ds-image__img,
:global(.group:hover) .ds-image__frame--zoom .ds-image__img {
  transform: scale(var(--hover-image-scale));
}

.ds-image__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--type-meta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-meta);
  text-align: center;
  padding: var(--space-6);
}

.ds-image__scrim {
  position: absolute;
  inset: 0;
  background: var(--color-scrim);
  pointer-events: none;
}

.ds-image__caption {
  margin-top: var(--space-3);
  font: var(--type-small);
  font-size: var(--text-meta);
  color: var(--color-foreground-subtle);
}
</style>
