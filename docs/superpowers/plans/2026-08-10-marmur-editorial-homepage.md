# Marmúr Editorial Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/prototype` as a twelve-section editorial homepage where every scroll feels like turning a page in a flower magazine.

**Architecture:** `pages/prototype/index.vue` becomes a thin composition file; each section is its own component under `app/components/proto/home/`, auto-imported by Nuxt as `ProtoHome<Name>`. Every section composes existing `Ds*` primitives — **no new `Ds*` components are added**, because `app/components/ds/` mirrors the Claude Design source (see `docs/design-system.md`). Sections are built in page order and wired into `index.vue` as each is finished, so the page works and is screenshot-verifiable after every task.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>` + TypeScript, scoped CSS over design-system custom properties, Bun.

**Spec:** `docs/superpowers/specs/2026-08-10-marmur-editorial-homepage-design.md`

## Global Constraints

- **No test runner exists in this repo.** Verification is `bun run check-types && bunx vp check apps/web` (typecheck + lint, scoped to the app) plus browser inspection. Do not invent or install a test framework.
  - Expected output: typecheck completes with no errors, and lint reports **`Found 0 errors and 2 warnings`**. Those two warnings are pre-existing in `apps/web/app/middleware/auth.ts` (unused `from` parameter) and are not yours to fix. Any *error*, or a third warning, is a real regression.
  - Do **not** run the repo-wide `bun run check`: it fails on 138 pre-existing files, almost all vendored under `.agents/skills/`, and was already failing before this branch. It cannot tell you whether your change is clean.
- Dev server: `bun run dev:web` → `http://localhost:3001/prototype` (port is pinned in `nuxt.config.ts`).
- **All user-facing copy is Ukrainian.** Copy strings in this plan are final — paste them exactly, including the apostrophe character `ʼ` (U+02BC) in «памʼяті».
- **No new `Ds*` components.** Compose from: `DsButton`, `DsIcon`, `DsIconButton`, `DsTextLink`, `DsTag`, `DsInput`, `DsSelect`, `DsQuantityStepper`, `DsOptionSwatch`, `DsProductCard`, `DsCartLine`, `DsFilterBar`, `DsEditorialImage`, `DsSectionHeading`, `DsStatementBlock`, `DsWordmark`, `DsHeader`, `DsFooter`, `DsMenuOverlay`, `DsReveal`.
- **No new CSS custom properties.** Use existing tokens only. Never hard-code a colour, radius, duration or spacing value that a token already covers.
- Colours: only the seven base values. Radii 0–6px, never `9999px`. No shadows. No gradients except a scrim over photography.
- Uppercase only in the small sans layer (`.ds-meta`, 11–13px, tracking `0.14em`). Headings are never uppercase.
- Motion 200–500ms with `--ease-standard` / `--ease-entrance`. Nothing animates continuously. No bounce, spring or parallax.
- Icons: Lucide, functional only, from `search, heart, shopping-bag, menu, x, arrow-right, plus, minus, chevron-down, user-round`. No emoji.
- Voice: quiet. No exclamation marks, no urgency, no discount language, no superlatives.
- **Section** numbering appears only on the four commerce sections, with exactly these strings: `01 —` (вітрина, Task 5), `02 —` (колекції, Task 7), `03 —` (добірка, Task 9), `04 —` (підбір, Task 10). This constrains *section* indices only — the `01/02/03` labels on the three principles inside Task 6 are a list, not section numbers, and are required by the spec.
- Every new section component starts with a `// PROTOTYPE —` comment naming what it is and citing the spec section, matching the existing house style.

---

### Task 1: Data foundations and dead-code removal

Shared data both the homepage and the catalog will consume, plus removal of three unreferenced homepage variants that would confuse anyone reading the rebuilt page.

**Files:**
- Modify: `apps/web/app/data/prototype.ts` (append at end)
- Delete: `apps/web/app/components/proto/home/VariantA.vue`
- Delete: `apps/web/app/components/proto/home/VariantB.vue`
- Delete: `apps/web/app/components/proto/home/VariantC.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoBudget` interface; `protoBudgets: ProtoBudget[]` with keys `all | lt1000 | 1000-1500 | gt1500`; `protoOccasions: { label: string; to: string }[]`.

- [ ] **Step 1: Confirm the variants really are unreferenced**

Run:
```bash
grep -rn "VariantA\|VariantB\|VariantC" apps/web/app --include="*.vue" --include="*.ts" \
  | grep -v "components/proto/home/Variant"
```
Expected: no output. If anything prints, stop and report it — the deletion is unsafe.

- [ ] **Step 2: Delete the three dead variant files**

```bash
rm apps/web/app/components/proto/home/VariantA.vue \
   apps/web/app/components/proto/home/VariantB.vue \
   apps/web/app/components/proto/home/VariantC.vue
```

- [ ] **Step 3: Append shared budget bands and occasions to the data file**

Append to the end of `apps/web/app/data/prototype.ts`:

```ts
/**
 * Смуги бюджету. Живуть тут, а не всередині вітрини, бо той самий перелік
 * читає фільтр каталогу — і ключі мусять збігатися з `?budget=` в URL.
 */
export interface ProtoBudget {
  key: string;
  label: string;
  test: (price: number) => boolean;
}

export const protoBudgets: ProtoBudget[] = [
  { key: "all", label: "Усі", test: () => true },
  { key: "lt1000", label: "до 1 000 ₴", test: (p) => p < 1000 },
  { key: "1000-1500", label: "1 000–1 500 ₴", test: (p) => p >= 1000 && p <= 1500 },
  { key: "gt1500", label: "понад 1 500 ₴", test: (p) => p > 1500 },
];

/**
 * Приводи для секції «Розкажіть, для кого» на головній.
 * Кожен веде на подання каталогу, яке реально працює: вигаданих фільтрів
 * тут немає, інакше відвідувач приземлявся б на нефільтрований каталог.
 */
export const protoOccasions: { label: string; to: string }[] = [
  { label: "для неї", to: "/prototype/catalog?category=mix" },
  { label: "для нього", to: "/prototype/catalog?category=mono" },
  { label: "на день народження", to: "/prototype/catalog?category=baskets" },
  { label: "просто так", to: "/prototype/catalog?budget=lt1000" },
  { label: "для особливого вечора", to: "/prototype/catalog?budget=gt1500" },
  { label: "коли не знаєш, що сказати", to: "/prototype/catalog" },
];
```

- [ ] **Step 4: Verify the project still checks**

Run: `bun run check-types && bunx vp check apps/web`
Expected: PASS, no lint or type errors.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/data/prototype.ts apps/web/app/components/proto/home/
git commit -m "refactor: share budget bands, add occasions, drop dead home variants"
```

---

### Task 2: Catalog `?budget=` support

Two of the six occasion links point at `?budget=`. Today `catalog.vue` reads only `?category=`, and `setCategory()` calls `router.replace({ query: {...} })` which discards every other key — so a `budget` param would be both ignored and silently erased on the next filter click.

**Files:**
- Modify: `apps/web/app/pages/prototype/catalog.vue`
- Modify: `apps/web/app/components/proto/home/TodayGrid.vue` (consume shared bands)

**Interfaces:**
- Consumes: `protoBudgets` from Task 1 (the array only — the `ProtoBudget` type is inferred, no type import needed).
- Produces: working `/prototype/catalog?budget=<key>` and `?category=<key>&budget=<key>` URLs; `setCategory(key: string)` and `setBudget(key: string)`, both preserving the other param.

- [ ] **Step 1: Import the shared bands in the catalog**

In `apps/web/app/pages/prototype/catalog.vue`, add `protoBudgets` to the existing import from `~/data/prototype`:

```ts
import {
  protoBudgets,
  protoCategoryLabels,
  protoGiftSubcategories,
  protoProducts,
  protoServices,
  type ProtoCategory,
} from "~/data/prototype";
```

- [ ] **Step 2: Read the budget param**

Immediately after the existing `activeService` computed, add:

```ts
const activeBudget = computed(() => {
  const b = String(route.query.budget ?? "all");
  return protoBudgets.some((x) => x.key === b) ? b : "all";
});
```

- [ ] **Step 3: Make both setters preserve the other param**

Replace the existing `setCategory` function with this pair:

```ts
/**
 * Обидва сетери складають query цілком: інакше зміна категорії стирала б
 * активний бюджет, і навпаки. Значення «all» просто не потрапляє в URL.
 */
function setCategory(key: string) {
  const query: Record<string, string> = {};
  if (key !== "all") query.category = key;
  if (activeBudget.value !== "all") query.budget = activeBudget.value;
  router.replace({ query });
}

function setBudget(key: string) {
  const query: Record<string, string> = {};
  if (active.value !== "all") query.category = active.value;
  if (key !== "all") query.budget = key;
  router.replace({ query });
}
```

- [ ] **Step 4: Filter on both axes**

Replace the existing `visible` computed with:

```ts
const visible = computed(() => {
  const budget = protoBudgets.find((b) => b.key === activeBudget.value) ?? protoBudgets[0]!;
  return protoProducts
    .filter((p) => active.value === "all" || p.category === active.value)
    .filter((p) => budget.test(p.price))
    .sort((a, b) => Number(b.available) - Number(a.available));
});
```

- [ ] **Step 5: Add the budget filter row**

In the template, directly after the existing `<DsFilterBar>` for categories, add:

```vue
    <DsFilterBar
      v-if="!activeService"
      class="catalog__budgets"
      :filters="protoBudgets.map((b) => ({ key: b.key, label: b.label }))"
      :model-value="activeBudget"
      @update:model-value="setBudget"
    />
```

And add to the `<style scoped>` block:

```css
.catalog__budgets {
  margin-top: var(--space-4);
}
```

The count stays on the category row only — repeating it twice would just be noise.

- [ ] **Step 6: Point the homepage showcase at the shared bands**

In `apps/web/app/components/proto/home/TodayGrid.vue`, replace the local `budgets` array with the shared one. Change the import line to:

```ts
import { protoBudgets, protoProducts } from "~/data/prototype";
```

Delete the entire local `const budgets = [...] as const;` block, then update the two places that referenced it:

```ts
const bouquets = computed(() => {
  const budget = protoBudgets.find((b) => b.key === activeBudget.value) ?? protoBudgets[0]!;
  return protoProducts
    .filter((p) => ["mix", "mono", "baskets"].includes(p.category) && budget.test(p.price))
    .sort((a, b) => Number(b.available) - Number(a.available));
});
```

and in the template:

```vue
      :filters="protoBudgets.map((b) => ({ key: b.key, label: b.label }))"
```

- [ ] **Step 7: Verify types and lint**

Run: `bun run check-types && bunx vp check apps/web`
Expected: PASS.

- [ ] **Step 8: Verify all six occasion destinations by hand**

Start the dev server (`bun run dev:web`) and visit each URL. Confirm the product count changes and the correct filter row shows as active:

| URL                                              | Expected                                    |
| ------------------------------------------------ | ------------------------------------------- |
| `/prototype/catalog?category=mix`                 | only mix bouquets                           |
| `/prototype/catalog?category=mono`                | only mono bouquets                          |
| `/prototype/catalog?category=baskets`             | only baskets                                |
| `/prototype/catalog?budget=lt1000`                | only items under 1 000 ₴, all categories    |
| `/prototype/catalog?budget=gt1500`                | only items over 1 500 ₴, all categories     |
| `/prototype/catalog`                              | everything                                  |
| `/prototype/catalog?category=mono&budget=lt1000`  | mono **and** under 1 000 ₴                  |

Then, on the last URL, click a different category and confirm `budget=lt1000` **survives** in the address bar. Click a different budget and confirm `category` survives.

- [ ] **Step 9: Commit**

```bash
git add apps/web/app/pages/prototype/catalog.vue apps/web/app/components/proto/home/TodayGrid.vue
git commit -m "feat: filter the catalog by budget as well as category"
```

---

### Task 3: Hero rework

Strip the hero to wordmark, one line, one action. The 18:00 cutoff and free-delivery threshold move one screen down into the fact rail, where they already appear.

**Files:**
- Modify: `apps/web/app/components/proto/home/HeroShowcase.vue`

**Interfaces:**
- Consumes: nothing new.
- Produces: `ProtoHomeHeroShowcase` with no props (unchanged signature).

- [ ] **Step 1: Replace the whole file**

`apps/web/app/components/proto/home/HeroShowcase.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — повноширинний hero (спека §1): знак, один рядок, одна дія.
// Тут буде горизонтальне відео створення букета; поки що вертикальний рілз,
// кропнутий у повну ширину.
//
// Умов доставки тут навмисно немає — вони живуть у рейці фактів на екран
// нижче. Hero не має конкурувати сам із собою.
//
// Знак набраний малим сансом, а не DsWordmark: серифний знак уже стоїть
// у шапці поверх цього ж кадру, і другий великий сериф забив би вислів.
</script>

<template>
  <section class="proto-hero">
    <video
      src="/prototype/marmur-video.mp4"
      poster="/prototype/hero-wide.jpg"
      class="proto-hero__media"
      autoplay
      muted
      loop
      playsinline
    />
    <span class="proto-hero__scrim" />

    <p class="proto-hero__draft ds-meta">
      Чернетка: вертикальний рілз, кропнутий — згодом горизонтальне відео
    </p>

    <div class="proto-hero__body">
      <p class="proto-hero__wordmark ds-meta">Marmúr Flowers</p>

      <DsStatementBlock tone="inverse" class="proto-hero__statement">
        Квіти, які залишаються<br />в памʼяті.
      </DsStatementBlock>

      <div class="proto-hero__actions">
        <DsButton variant="inverse" size="lg" to="/prototype/catalog">
          Переглянути колекцію
        </DsButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proto-hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 100svh;
  overflow: hidden;
  background: var(--color-brand-dark);
}

.proto-hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/*
 * §17: текст поверх фото захищає верхньо-нижній градієнт, а не плашка.
 * Кадр із білими півоніями майже засвічений, тому тут той самий градієнт,
 * але щільніший — інакше світлий текст на світлому фото не читається.
 */
.proto-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgb(23 21 19 / 0.5) 0%,
    rgb(23 21 19 / 0.24) 34%,
    rgb(23 21 19 / 0.82) 100%
  );
  pointer-events: none;
}

.proto-hero__draft {
  position: absolute;
  top: calc(var(--header-height) + var(--space-6));
  right: var(--gutter);
  max-width: 22ch;
  text-align: right;
  color: var(--color-foreground-inverse);
  opacity: 0.6;
}

.proto-hero__body {
  position: relative;
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 0 var(--gutter-lg) var(--space-16);
  color: var(--color-foreground-inverse);
}

.proto-hero__wordmark {
  letter-spacing: var(--tracking-wordmark);
  color: var(--color-foreground-inverse);
  opacity: 0.8;
  margin-bottom: var(--space-8);
}

.proto-hero__statement {
  max-width: 20ch;
}

.proto-hero__actions {
  margin-top: var(--space-12);
}
</style>
```

- [ ] **Step 2: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

In the browser at `/prototype`, confirm: the hero fills the viewport; the wordmark renders as `MARMÚR FLOWERS` in small caps; the statement breaks after «залишаються»; there is exactly one button; no delivery text remains in the hero.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/components/proto/home/HeroShowcase.vue
git commit -m "feat: strip the hero to wordmark, one line and one action"
```

---

### Task 4: Signature editorial grid

The composition that establishes the page as editorial rather than commercial. Two rows, deliberately unequal and mirrored so the grid never reads as a repeated card row.

**Files:**
- Create: `apps/web/app/components/proto/home/EditorialGrid.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoHomeEditorialGrid`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/EditorialGrid.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — фірмова редакційна сітка одразу під hero (спека §2).
//
// Два ряди, дзеркальні один одному: 1.7fr/1fr, далі 1fr/1.7fr. Цін тут
// немає — це розворот, а не вітрина; ціну відвідувач бачить у вітрині дня
// й на сторінці товару.
const frames = {
  lead: {
    src: "/prototype/rose-macro.jpg",
    alt: "Макрознімок пелюсток троянди",
  },
  bouquet: {
    src: "/prototype/bouquet-lush-mix.jpg",
    alt: "Пишний мікс-букет «Ранковий сад»",
    to: "/prototype/product/morning-garden",
    caption: "Букет дня",
  },
  collection: {
    src: "/prototype/bouquet-tulip.jpg",
    alt: "Моно-букет із піоновидних тюльпанів",
    to: "/prototype/catalog?category=mono",
    caption: "Моно",
  },
  product: {
    src: "/prototype/gift-vase.jpg",
    alt: "Керамічна ваза ручної роботи",
    to: "/prototype/product/vase-ceramic",
    caption: "Ваза",
  },
  editorial: {
    src: "/prototype/bouquet-dark-mix.jpg",
    alt: "Темний мікс-букет «Оксамитовий вечір»",
    to: "/prototype/product/velvet-evening",
  },
};
</script>

<template>
  <section class="ds-container ds-section edgrid">
    <DsReveal>
      <div class="edgrid__row edgrid__row--lead">
        <DsEditorialImage
          :src="frames.lead.src"
          :alt="frames.lead.alt"
          ratio="var(--ratio-editorial)"
        />

        <div class="edgrid__stack">
          <NuxtLink :to="frames.bouquet.to" class="edgrid__tile">
            <DsEditorialImage
              :src="frames.bouquet.src"
              :alt="frames.bouquet.alt"
              ratio="var(--ratio-square)"
              scrim
            >
              <span class="edgrid__caption ds-meta">{{ frames.bouquet.caption }}</span>
            </DsEditorialImage>
          </NuxtLink>

          <NuxtLink :to="frames.collection.to" class="edgrid__tile">
            <DsEditorialImage
              :src="frames.collection.src"
              :alt="frames.collection.alt"
              ratio="var(--ratio-square)"
              scrim
            >
              <span class="edgrid__caption ds-meta">{{ frames.collection.caption }}</span>
            </DsEditorialImage>
          </NuxtLink>
        </div>
      </div>
    </DsReveal>

    <DsReveal :delay="120">
      <div class="edgrid__row edgrid__row--mirror">
        <NuxtLink :to="frames.product.to" class="edgrid__tile">
          <DsEditorialImage
            :src="frames.product.src"
            :alt="frames.product.alt"
            ratio="var(--ratio-portrait)"
            scrim
          >
            <span class="edgrid__caption ds-meta">{{ frames.product.caption }}</span>
          </DsEditorialImage>
        </NuxtLink>

        <NuxtLink :to="frames.editorial.to" class="edgrid__tile">
          <DsEditorialImage
            :src="frames.editorial.src"
            :alt="frames.editorial.alt"
            ratio="var(--ratio-wide)"
          />
        </NuxtLink>
      </div>
    </DsReveal>
  </section>
</template>

<style scoped>
.edgrid__row {
  display: grid;
  gap: var(--gutter);
}

.edgrid__row--mirror {
  margin-top: var(--gutter);
}

/*
 * Ряди нерівні й дзеркальні (§20). У другому ряду вирівнюємо по низу:
 * портрет вищий за широкий кадр, і спільна нижня межа тримає композицію.
 */
@media (min-width: 1024px) {
  .edgrid__row--lead {
    grid-template-columns: 1.7fr 1fr;
    align-items: start;
  }

  .edgrid__row--mirror {
    grid-template-columns: 1fr 1.7fr;
    align-items: end;
  }
}

.edgrid__stack {
  display: grid;
  gap: var(--gutter);
  align-content: start;
}

.edgrid__tile {
  display: block;
  text-decoration: none;
}

.edgrid__tile:hover {
  opacity: 1;
  text-decoration: none;
}

.edgrid__caption {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  color: var(--color-foreground-inverse);
}
</style>
```

- [ ] **Step 2: Wire it into the page**

In `apps/web/app/pages/prototype/index.vue`, insert directly after `<ProtoHomeHeroShowcase />` and **before** `<ProtoMarquee ... />`:

```vue
    <ProtoHomeEditorialGrid />
```

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

At 1440px confirm: row 1 is a tall image left with two squares stacked right; row 2 is a narrow portrait left with a wide image right, bottom edges aligned; captions sit bottom-left over a scrim and are legible. At 375px confirm all five frames stack in one column in source order.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/EditorialGrid.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: add the signature editorial grid under the hero"
```

---

### Task 5: Rework the daily showcase

Bigger frames, three columns instead of four, capped at six, and a heading that adopts the brief's wording without breaking the 18:00 cutoff rule.

**Files:**
- Modify: `apps/web/app/components/proto/home/TodayGrid.vue`
- Modify: `apps/web/app/components/proto/ProductCard.vue` (forward a `ratio` prop)

**Interfaces:**
- Consumes: `protoBudgets` (Task 1), `usePrototypeShop().todayWord`.
- Produces: `ProtoProductCard` gains an optional `ratio?: string` prop, forwarded to `DsProductCard`.

- [ ] **Step 1: Let the product card take a frame ratio**

`DsProductCard` already accepts `ratio`, but `ProtoProductCard` does not forward it. In `apps/web/app/components/proto/ProductCard.vue`, replace the props declaration:

```ts
const props = defineProps<{ product: ProtoProduct; ratio?: string }>();
```

and add the binding to the `<DsProductCard>` tag:

```vue
    :ratio="props.ratio"
```

Passing `undefined` leaves `DsProductCard`'s own default (`--ratio-portrait`) in place, so every existing caller is unaffected.

- [ ] **Step 2: Update the heading and lede**

In `apps/web/app/components/proto/home/TodayGrid.vue`, replace the `<DsSectionHeading>` block with:

```vue
      <DsSectionHeading
        index="01 —"
        eyebrow="Вітрина дня"
        :title="`Квіти ${todayWord}`"
        lede="Те, що наші флористи зібрали сьогодні вранці."
      />
```

`todayWord` is already destructured from `usePrototypeShop()` at the top of the file — leave that line alone. The heading reads «Квіти сьогодні» before 18:00 and «Квіти завтра» after, so it never promises same-day delivery to an evening visitor.

- [ ] **Step 3: Cap the showcase at six**

Replace the `bouquets` computed with:

```ts
/**
 * Вітрина показує щонайбільше шість позицій: це вітрина дня, а не каталог.
 * Решта — за посиланням «Увесь каталог» під сіткою.
 */
const bouquets = computed(() => {
  const budget = protoBudgets.find((b) => b.key === activeBudget.value) ?? protoBudgets[0]!;
  return protoProducts
    .filter((p) => ["mix", "mono", "baskets"].includes(p.category) && budget.test(p.price))
    .sort((a, b) => Number(b.available) - Number(a.available))
    .slice(0, 6);
});
```

- [ ] **Step 4: Enlarge the frames and add the catalog link**

Replace the grid block and the empty state in the template with:

```vue
    <div class="ds-grid ds-grid-row proto-today__grid">
      <DsReveal v-for="(p, i) in bouquets" :key="p.id" :delay="(i % 3) * 70">
        <ProtoProductCard :product="p" ratio="var(--ratio-editorial)" />
      </DsReveal>
    </div>

    <p v-if="bouquets.length === 0" class="proto-today__empty ds-body ds-muted">
      У цьому бюджеті сьогодні нічого не лишилось — гляньте сусідній.
    </p>

    <div class="proto-today__more">
      <DsTextLink to="/prototype/catalog" arrow>Увесь каталог</DsTextLink>
    </div>
```

- [ ] **Step 5: Drop to three columns**

Add to the `<style scoped>` block in the same file:

```css
/* Три колонки замість чотирьох: кадри більші, повітря більше (§20) */
@media (min-width: 1024px) {
  .proto-today__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.proto-today__grid {
  row-gap: var(--space-16);
}

.proto-today__more {
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}
```

- [ ] **Step 6: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

In the browser confirm: at 1440px there are three columns and at most six cards; frames are 4:5, noticeably larger than before; the heading reads «Квіти сьогодні»; budget filters still work and can empty the grid; «Увесь каталог» sits under a hairline rule.

- [ ] **Step 7: Verify the evening state**

Temporarily set `cutoffHour: 0` in `protoDelivery` (`apps/web/app/data/prototype.ts`), reload, and confirm the heading reads **«Квіти завтра»**. **Revert the value to `18` before committing** and confirm with `git diff apps/web/app/data/prototype.ts` that nothing remains staged from this check.

- [ ] **Step 8: Commit**

```bash
git add apps/web/app/components/proto/home/TodayGrid.vue apps/web/app/components/proto/ProductCard.vue
git commit -m "feat: enlarge the daily showcase and brand its heading"
```

---

### Task 6: The Marmúr difference

Replaces the current `03 — Майстерня` section. Deliberately minimal: one photograph, one statement, three principles, no call to action.

**Files:**
- Create: `apps/web/app/components/proto/home/Difference.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoHomeDifference`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Difference.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — «Не конвеєр. Квіткова майстерня.» (спека §5).
//
// Секція навмисно без номера й без кнопок: бриф просить крайньої
// мінімальності. Посилання на історію та школу лишились у підвалі й меню.
const principles = [
  { index: "01 —", title: "Щоранку", text: "Нові квіти та нові композиції." },
  { index: "02 —", title: "Вручну", text: "Кожен букет створюється флористом." },
  { index: "03 —", title: "Особисто", text: "Композиція під людину, привід і настрій." },
];
</script>

<template>
  <section class="ds-container ds-section">
    <div class="ds-split">
      <DsReveal>
        <DsEditorialImage
          src="/prototype/marmur-1.jpg"
          alt="Засновниця Marmúr із букетом білих півоній"
          ratio="var(--ratio-editorial)"
          caption="Майстерня, вулиця Городоцька"
        />
      </DsReveal>

      <DsReveal :delay="120">
        <DsStatementBlock size="h1"> Не конвеєр.<br />Квіткова майстерня. </DsStatementBlock>

        <dl class="diff__list">
          <div v-for="p in principles" :key="p.index" class="diff__item">
            <dt class="diff__term">
              <span class="ds-meta ds-subtle">{{ p.index }}</span>
              <span class="ds-h3">{{ p.title }}</span>
            </dt>
            <dd class="diff__text ds-small ds-muted">{{ p.text }}</dd>
          </div>
        </dl>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.diff__list {
  margin: var(--space-16) 0 0;
  display: grid;
  gap: var(--space-8);
}

.diff__item {
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
}

.diff__term {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
}

.diff__text {
  margin: var(--space-2) 0 0;
  max-width: 40ch;
}
</style>
```

- [ ] **Step 2: Replace the old workshop section**

In `apps/web/app/pages/prototype/index.vue`, delete the entire `<!-- 03 — Майстерня ... -->` section (the `<section class="ds-container ds-section">` containing `.ds-split`, `home-school` and `home-actions`) and put in its place:

```vue
    <ProtoHomeDifference />
```

Then delete the now-unused `.home-school` and `.home-actions` rules from the page's `<style scoped>` block.

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm in the browser: image left, text right at 1440px; principles separated by hairline rules; no buttons anywhere in the section; single column at 375px. Confirm no dead CSS remains by searching the page file for `home-school` and `home-actions` — both should return nothing.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Difference.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: replace the workshop section with the Marmur difference"
```

---

### Task 7: Collections as an exhibition

Replaces the inline category markup. Each category gets its own frame proportion and type scale so the row never reads as four identical cards.

**Files:**
- Create: `apps/web/app/components/proto/home/Collections.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: `protoProducts`, `protoServices`.
- Produces: `ProtoHomeCollections`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Collections.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — «Колекції як виставка» (спека §6).
//
// Не чотири однакові картки: у кожної категорії свій кадр і свій масштаб
// назви. Назва стоїть під кадром, а не поверх — тут веде типографіка.
import { protoProducts, protoServices } from "~/data/prototype";

const countIn = (c: string) => protoProducts.filter((p) => p.category === c && p.available).length;

const lead = {
  label: "Мікс-букети",
  photo: "/prototype/bouquet-peach.jpg",
  to: "/prototype/catalog?category=mix",
  meta: `сьогодні — ${countIn("mix")}`,
};

const rest = [
  {
    key: "mono",
    label: "Моно-букети",
    photo: "/prototype/bouquet-cream-roses.jpg",
    ratio: "var(--ratio-portrait)",
    to: "/prototype/catalog?category=mono",
    meta: `сьогодні — ${countIn("mono")}`,
  },
  {
    key: "baskets",
    label: "Корзини та коробки",
    photo: "/prototype/composition-heart.jpg",
    ratio: "var(--ratio-editorial)",
    to: "/prototype/catalog?category=baskets",
    meta: `сьогодні — ${countIn("baskets")}`,
  },
  {
    key: "gift",
    label: "Подарунки",
    photo: "/prototype/gift-candle-amber.jpg",
    ratio: "var(--ratio-square)",
    to: "/prototype/catalog?category=gift",
    meta: "свічки · вази · планери",
  },
];
</script>

<template>
  <section class="ds-container ds-section">
    <DsReveal>
      <DsSectionHeading
        index="02 —"
        eyebrow="Каталог"
        title="Оберіть напрям"
        lede="Чотири розділи — від пишних міксів до дрібниць, які роблять подарунок подарунком."
      >
        <template #action>
          <DsTextLink to="/prototype/catalog" arrow>Увесь каталог</DsTextLink>
        </template>
      </DsSectionHeading>
    </DsReveal>

    <DsReveal>
      <NuxtLink :to="lead.to" class="coll__tile coll__lead">
        <DsEditorialImage :src="lead.photo" :alt="lead.label" ratio="var(--ratio-wide)" />
        <span class="coll__label">
          <span class="ds-h2 coll__name">{{ lead.label }}</span>
          <span class="ds-meta ds-subtle">{{ lead.meta }}</span>
        </span>
      </NuxtLink>
    </DsReveal>

    <div class="coll__rest">
      <DsReveal v-for="(c, i) in rest" :key="c.key" :delay="i * 80">
        <NuxtLink :to="c.to" class="coll__tile">
          <DsEditorialImage :src="c.photo" :alt="c.label" :ratio="c.ratio" />
          <span class="coll__label">
            <span class="ds-h3 coll__name">{{ c.label }}</span>
            <span class="ds-meta ds-subtle">{{ c.meta }}</span>
          </span>
        </NuxtLink>
      </DsReveal>
    </div>

    <div class="coll__services">
      <span class="ds-meta ds-subtle">А також</span>
      <NuxtLink
        v-for="s in protoServices"
        :key="s.id"
        :to="`/prototype/catalog?category=${s.id}`"
        class="ds-meta coll__service"
      >
        {{ s.label }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.coll__lead {
  margin-top: var(--space-16);
}

.coll__tile {
  display: block;
  text-decoration: none;
  color: var(--color-foreground);
}

.coll__tile:hover {
  opacity: 1;
  text-decoration: none;
}

.coll__label {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-2);
}

.coll__tile:hover .coll__name {
  text-decoration: underline;
  text-decoration-color: var(--color-border-strong);
  text-underline-offset: 0.26em;
}

/* Три нерівні колонки — сітка навмисно не ділиться порівну (§20) */
.coll__rest {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--space-12) var(--gutter);
}

@media (min-width: 768px) {
  .coll__rest {
    grid-template-columns: 1.2fr 1fr 1fr;
    align-items: start;
  }
}

.coll__services {
  margin-top: var(--space-16);
  padding-top: var(--space-6);
  border-top: var(--border-hairline);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-4) var(--space-8);
}

.coll__service {
  color: var(--color-foreground-muted);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: var(--transition-color);
}

.coll__service:hover {
  color: var(--color-foreground);
  border-bottom-color: var(--color-foreground);
  opacity: 1;
  text-decoration: none;
}
</style>
```

The services rail links by service id (`wedding-sub`, `decor`, `flower-sub`), which `catalog.vue` already accepts through its `validKeys` set. Note this drops the standalone «Букет нареченої» link that the old markup carried; that category is reachable from the catalog's own category row.

- [ ] **Step 2: Replace the old category section**

In `apps/web/app/pages/prototype/index.vue`, delete the whole `<!-- 02 — Розділи каталогу ... -->` section together with the `categories`, `countIn` and `services` constants in `<script setup>`, and put in its place:

```vue
    <ProtoHomeCollections />
```

Also delete these now-unused rules from the page's `<style scoped>`: `.home-categories`, `.home-categories__rest`, `.home-tile`, `.home-tile:hover`, `.home-tile__caption`, `.home-tile__title`, `.home-tile__title--sm`, `.home-tile__meta`, `.home-note`, `.home-note__text`, `.home-note__lede`, `.home-services`, `.home-services__link`, `.home-services__link:hover`, and the `@media (min-width: 1024px)` block that targets `.home-categories`.

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm: the lead category is full-width and 16:9 with an `h2` name; the other three sit in unequal columns with different frame proportions and `h3` names; counts match the catalog; every tile and service link navigates correctly.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Collections.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: present collections as an exhibition rather than cards"
```

---

### Task 8: The signature moment

One full-bleed photograph that exists purely to be remembered. No links, no call to action.

**Files:**
- Create: `apps/web/app/components/proto/home/Signature.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoHomeSignature`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Signature.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — фірмовий момент (спека §7).
//
// Секція без посилань і без CTA: вона існує лише щоб запамʼятатись.
// Виходить за контейнер на всю ширину вікна.
</script>

<template>
  <section class="sig">
    <img
      src="/prototype/hero-dark-rose.jpg"
      alt="Скульптурна композиція з темних троянд"
      class="sig__media"
      loading="lazy"
    />
    <span class="sig__scrim" />

    <div class="sig__body">
      <DsStatementBlock tone="inverse" align="center">
        Квіти не повинні бути<br />звичайними.
      </DsStatementBlock>
      <p class="ds-meta sig__mark">Marmúr / 2026</p>
    </div>
  </section>
</template>

<style scoped>
.sig {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90svh;
  overflow: hidden;
  background: var(--color-brand-dark);
}

.sig__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Той самий захисний градієнт, що в hero (§17) */
.sig__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgb(23 21 19 / 0.44) 0%,
    rgb(23 21 19 / 0.2) 40%,
    rgb(23 21 19 / 0.66) 100%
  );
  pointer-events: none;
}

.sig__body {
  position: relative;
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--gutter-lg);
  text-align: center;
}

.sig__mark {
  margin-top: var(--space-16);
  color: var(--color-foreground-inverse);
  opacity: 0.7;
}
</style>
```

- [ ] **Step 2: Wire it into the page**

In `apps/web/app/pages/prototype/index.vue`, replace the existing dark `DsStatementBlock` interlude — the `<section class="ds-section-dark ds-section-lg">` containing «Кожен букет збирається вручну в день доставки.» — with:

```vue
    <ProtoHomeSignature />
```

It occupies the same slot in the rhythm: the dark beat between two light sections, now carrying a photograph.

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm: the section spans the full window width with no container gutters visible at the edges; the statement is centred and breaks after «бути»; `MARMÚR / 2026` renders in small caps beneath it; text stays legible over the photograph at 375px.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Signature.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: add the signature full-bleed brand moment"
```

---

### Task 9: Product and editorial combination

Four products interleaved with a large editorial frame, so the commerce beat never becomes a plain row of cards.

**Files:**
- Create: `apps/web/app/components/proto/home/EditorialMix.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: `protoProducts`; `ProtoProductCard` at its default portrait ratio (this section does not pass `ratio`).
- Produces: `ProtoHomeEditorialMix`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/EditorialMix.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — товар + редакційний розворот (спека §8).
//
// Чотири букети, яких немає серед шести у вітрині дня, і великий кадр
// із висловом праворуч: замість рядка з чотирьох однакових карток.
import { protoProducts } from "~/data/prototype";

const ids = ["peonies-white", "flower-heart", "rose-solo", "carmen"];

const picks = ids
  .map((id) => protoProducts.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));
</script>

<template>
  <section class="ds-container ds-section">
    <DsReveal>
      <DsSectionHeading
        index="03 —"
        eyebrow="Добірка"
        title="Не найочевидніше"
        lede="Композиції, які легко проминути в каталозі, — і які найчастіше запамʼятовують."
      />
    </DsReveal>

    <div class="mix">
      <div class="mix__products">
        <DsReveal v-for="(p, i) in picks" :key="p.id" :delay="(i % 2) * 70">
          <ProtoProductCard :product="p" />
        </DsReveal>
      </div>

      <DsReveal :delay="140" class="mix__editorial">
        <DsEditorialImage
          src="/prototype/field-tulips.jpg"
          alt="Тюльпанове поле на світанку"
          ratio="var(--ratio-portrait)"
        />
        <DsStatementBlock size="h2" class="mix__quote">
          Квіти для тих,<br />хто не шукає<br />очевидного.
        </DsStatementBlock>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.mix {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--space-16) var(--gutter);
}

/*
 * Базове правило мусить стояти ДО медіазапиту: специфічність однакова,
 * тож `display: grid` нижче переміг би `display: contents` і зламав
 * триколонкову розкладку на десктопі.
 */
.mix__products {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-12) var(--gutter);
}

/* Товари 2×2 ліворуч, розворот праворуч — колонки нерівні (§20) */
@media (min-width: 1024px) {
  .mix {
    grid-template-columns: 1fr 1fr 1.4fr;
    align-items: start;
  }

  .mix__products {
    display: contents;
  }

  .mix__editorial {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
}

.mix__quote {
  margin-top: var(--space-8);
}
</style>
```

`display: contents` on `.mix__products` at ≥1024px lets the four cards become direct grid items, filling columns 1–2 across two rows while the editorial frame spans both rows in column 3. Below 1024px the wrapper reverts to its own 2×2 grid and the editorial frame drops beneath.

- [ ] **Step 2: Wire it into the page**

In `apps/web/app/pages/prototype/index.vue`, add after `<ProtoHomeSignature />`:

```vue
    <ProtoHomeEditorialMix />
```

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm: four product cards in a 2×2 block on the left, editorial frame spanning both rows on the right at 1440px; the quote sits under the frame and breaks after «тих,» and «шукає»; `carmen` shows its «на завтра» note since it is unavailable; prices render with tabular figures. At 375px everything stacks.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/EditorialMix.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: interleave products with an editorial spread"
```

---

### Task 10: Personalization

Six occasion prompts, each landing on a catalog view that genuinely filters.

**Files:**
- Create: `apps/web/app/components/proto/home/Occasions.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: `protoOccasions` (Task 1); working `?budget=` (Task 2).
- Produces: `ProtoHomeOccasions`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Occasions.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — «Розкажіть, для кого» (спека §9).
//
// Кожен привід веде на подання каталогу, яке реально фільтрує: два з них
// спираються на `?budget=`, доданий у catalog.vue.
import { protoOccasions } from "~/data/prototype";
</script>

<template>
  <section class="ds-container ds-section">
    <DsReveal>
      <p class="ds-meta ds-subtle occ__index">04 — Підбір</p>
      <DsStatementBlock size="h1">
        Розкажіть, для кого.<br />Ми підберемо квіти.
      </DsStatementBlock>
    </DsReveal>

    <DsReveal :delay="120">
      <ul class="occ__list">
        <li v-for="o in protoOccasions" :key="o.label">
          <NuxtLink :to="o.to" class="occ__link">
            <span class="ds-h3">{{ o.label }}</span>
            <DsIcon name="arrow-right" :size="16" class="occ__arrow" />
          </NuxtLink>
        </li>
      </ul>
    </DsReveal>
  </section>
</template>

<style scoped>
.occ__index {
  margin-bottom: var(--space-6);
}

.occ__list {
  margin: var(--space-16) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0 var(--gutter-lg);
}

@media (min-width: 768px) {
  .occ__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.occ__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-6);
  padding-block: var(--space-6);
  border-bottom: var(--border-hairline);
  color: var(--color-foreground);
  text-decoration: none;
  transition: var(--transition-color);
}

.occ__link:hover {
  opacity: 1;
  text-decoration: none;
  border-bottom-color: var(--color-foreground);
}

/* Єдиний рух — 4px зсуву стрілки, як у DsTextLink (§26) */
.occ__arrow {
  color: var(--color-foreground-subtle);
  transform: translateX(0);
  transition:
    transform var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard);
}

.occ__link:hover .occ__arrow {
  transform: translateX(4px);
  color: var(--color-foreground);
}

@media (prefers-reduced-motion: reduce) {
  .occ__arrow {
    transition: color var(--duration-fast) var(--ease-standard);
  }

  .occ__link:hover .occ__arrow {
    transform: none;
  }
}
</style>
```

- [ ] **Step 2: Wire it into the page**

In `apps/web/app/pages/prototype/index.vue`, add after `<ProtoHomeEditorialMix />`:

```vue
    <ProtoHomeOccasions />
```

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Click all six links from the homepage and confirm each lands on a filtered catalog matching the table in Task 2 Step 8. Confirm two columns at ≥768px, one below; arrows shift 4px on hover and stay still under `prefers-reduced-motion: reduce`.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Occasions.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: add the personalization section with working occasion links"
```

---

### Task 11: Behind the flowers

Four intentionally empty frames carrying Ukrainian shot briefs. This section doubles as the shot list for the photographer; when real photography arrives only `src` is added and `placeholder` removed.

**Files:**
- Create: `apps/web/app/components/proto/home/Studio.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoHomeStudio`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Studio.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — «За кадром» (спека §10).
//
// Кадри навмисно порожні: зйомки процесу ще немає, а готовий букет на місці
// «рук флористки» обіцяв би те, чого секція не показує. Плейсхолдер називає,
// що саме тут має бути знято, тож секція водночас працює як список зйомки.
// Коли приїдуть фото — додаємо `src`, знімаємо `placeholder`, верстка та сама.
const shots = [
  { brief: "Руки флористки · збирання букета", ratio: "var(--ratio-portrait)" },
  { brief: "Ранкове привезення · квіти у відрах", ratio: "var(--ratio-editorial)" },
  { brief: "Пакування · папір і стрічки", ratio: "var(--ratio-square)" },
  { brief: "Листівка від руки · робоче місце флориста", ratio: "var(--ratio-wide)" },
];
</script>

<template>
  <section class="ds-container ds-section">
    <DsReveal>
      <DsStatementBlock size="h2" class="studio__statement">
        Зібрано сьогодні.<br />Вручну. Для вас.
      </DsStatementBlock>
    </DsReveal>

    <div class="studio__grid">
      <DsReveal v-for="(s, i) in shots" :key="s.brief" :delay="(i % 2) * 80">
        <DsEditorialImage :ratio="s.ratio" :placeholder="s.brief" fill="sand" />
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.studio__statement {
  max-width: 24ch;
}

/*
 * 2×2 з різними ratio, тому ряди навмисно не вирівнюються між собою (§20).
 * align-items: start не дає коротшому кадру розтягнутись до сусіда.
 */
.studio__grid {
  margin-top: var(--space-16);
  display: grid;
  gap: var(--space-12) var(--gutter);
}

@media (min-width: 768px) {
  .studio__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
}
</style>
```

- [ ] **Step 2: Wire it into the page**

In `apps/web/app/pages/prototype/index.vue`, add after `<ProtoHomeOccasions />`:

```vue
    <ProtoHomeStudio />
```

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm each of the four frames shows a sand field with its brief in small caps, centred — none is blank. Confirm the four proportions differ visibly and rows do not align. Confirm the statement breaks after «сьогодні.».

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Studio.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: add the behind-the-flowers section with shot briefs"
```

---

### Task 12: Testimonials

Three reviews, each given a full editorial beat. No carousel: §25 forbids anything that animates continuously, and nothing should hide behind a click.

**Files:**
- Create: `apps/web/app/components/proto/home/Testimonials.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: `protoReviews`.
- Produces: `ProtoHomeTestimonials`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/Testimonials.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — відгуки (спека §11).
//
// Без каруселі: §25 забороняє елементи, що анімуються постійно, а ховати
// три відгуки з чотирьох за кліком означає, що їх ніхто не прочитає.
// Цитати беремо з наявних даних і не вигадуємо нових під реальні імена.
import { protoReviews } from "~/data/prototype";

const order = ["Андрій", "Марта", "Олена"];

const quotes = order
  .map((name) => protoReviews.find((r) => r.name === name))
  .filter((r): r is NonNullable<typeof r> => Boolean(r));
</script>

<template>
  <section class="ds-container-narrow ds-section-lg">
    <DsReveal v-for="q in quotes" :key="q.name" class="quote">
      <DsStatementBlock size="h2" :attribution="`— ${q.name} · ${q.source}`">
        {{ `“${q.text}”` }}
      </DsStatementBlock>
    </DsReveal>
  </section>
</template>

<style scoped>
.quote + .quote {
  margin-top: var(--space-32);
}
</style>
```

Width is governed by `--container-narrow` (880px) rather than a `max-width` on the quote itself, so the left edge lines up across all three despite their different lengths. `DsStatementBlock`'s `attribution` prop already renders in the small caps meta layer.

- [ ] **Step 2: Replace the old reviews section**

In `apps/web/app/pages/prototype/index.vue`, delete the entire `<!-- 04 — Відгуки ... -->` section, remove `protoReviews` from the page's import from `~/data/prototype`, and put in its place:

```vue
    <ProtoHomeTestimonials />
```

Also delete the `.home-reviews`, `.home-review`, `.home-review__text`, `.home-review__by` rules and their `@media` blocks from the page's `<style scoped>`.

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm: three quotes, Андрій first, each in large serif with an attribution line beneath; Ігор's review does not appear; generous space between quotes; left edges align; single column at 375px.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/Testimonials.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: give each testimonial a full editorial beat"
```

---

### Task 13: Final emotional call to action

Closes the page on `--color-brand` (`#3A2923`) — a warmer dark than every other dark beat on the page, using only existing tokens.

**Files:**
- Create: `apps/web/app/components/proto/home/FinalCta.vue`
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: nothing.
- Produces: `ProtoHomeFinalCta`, no props.

- [ ] **Step 1: Create the component**

`apps/web/app/components/proto/home/FinalCta.vue`:

```vue
<script setup lang="ts">
// PROTOTYPE — фінальний заклик (спека §12).
//
// Фон — --color-brand (#3A2923, espresso), а не --color-background-dark
// (#261B17, chocolate): останній екран трохи тепліший за решту темних врізок.
// Обидва значення вже є в системі, тож це не відхилення.
</script>

<template>
  <section class="final ds-section-lg">
    <div class="ds-container final__body">
      <DsReveal>
        <DsStatementBlock tone="inverse" align="center"> Скажіть це квітами. </DsStatementBlock>

        <p class="final__lede ds-body">
          Ми допоможемо підібрати композицію для людини, якій хочеться сказати більше.
        </p>

        <div class="final__action">
          <DsButton variant="inverse" size="lg" to="/prototype/catalog" icon-right="arrow-right">
            Обрати букет
          </DsButton>
        </div>
      </DsReveal>
    </div>
  </section>
</template>

<style scoped>
.final {
  background: var(--color-brand);
  color: var(--color-foreground-inverse);
}

.final__body {
  display: grid;
  justify-items: center;
  text-align: center;
}

.final__lede {
  margin: var(--space-8) auto 0;
  max-width: 46ch;
  color: var(--color-foreground-inverse);
  opacity: 0.8;
}

.final__action {
  margin-top: var(--space-12);
  display: flex;
  justify-content: center;
}
</style>
```

- [ ] **Step 2: Replace the old final section**

In `apps/web/app/pages/prototype/index.vue`, delete the trailing `<!-- Фінальний заклик ... -->` section and put in its place:

```vue
    <ProtoHomeFinalCta />
```

Also delete the `.home-final` and `.home-final__action` rules from the page's `<style scoped>`.

- [ ] **Step 3: Verify**

Run: `bun run check-types && bunx vp check apps/web` — expected PASS.

Confirm: the closing section is visibly warmer than the fact rail above it; statement, supporting line and button are centred; the button carries a right arrow and reaches the catalog.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/components/proto/home/FinalCta.vue apps/web/app/pages/prototype/index.vue
git commit -m "feat: close the homepage on the final emotional CTA"
```

---

### Task 14: Compose the page and run the full review

Every section now exists. This task reduces `index.vue` to composition and verifies the whole page against the design system.

**Files:**
- Modify: `apps/web/app/pages/prototype/index.vue`

**Interfaces:**
- Consumes: all twelve section components.
- Produces: the finished page.

- [ ] **Step 1: Replace the page with its final composition**

`apps/web/app/pages/prototype/index.vue` in full:

```vue
<script setup lang="ts">
// PROTOTYPE — головна.
//
// Сторінка лише складає секції. Ритм чергується
// PRODUCT → IMAGE → STORY → PRODUCT → IMAGE → EMOTION, а не
// «секція → картки → секція → картки»; темні біти припадають на позиції
// 3, 7 і 12, щоб задавати ритм скролу, а не збиратись докупи.
//
// Пронумеровані тільки чотири торгові секції (01 — вітрина, 02 — колекції,
// 03 — добірка, 04 — підбір): нумерувати всі дванадцять — це зміст, а не
// журнал. Пронумеровано = тут купують.
import { protoDelivery } from "~/data/prototype";

definePageMeta({ layout: "prototype", heroHeader: true });
useSeoMeta({ title: "Marmúr — свіжі букети у Львові" });
</script>

<template>
  <div>
    <ProtoHomeHeroShowcase />

    <ProtoHomeEditorialGrid />

    <ProtoMarquee
      :items="[
        'Свіжі букети щоранку',
        `Замовлення до ${protoDelivery.cutoffHour}:00 — доставка сьогодні`,
        'Безкоштовна доставка від 5 000 ₴',
        'Пакування включено',
      ]"
    />

    <ProtoHomeTodayGrid />

    <ProtoHomeDifference />

    <ProtoHomeCollections />

    <ProtoHomeSignature />

    <ProtoHomeEditorialMix />

    <ProtoHomeOccasions />

    <ProtoHomeStudio />

    <ProtoHomeTestimonials />

    <ProtoHomeFinalCta />
  </div>
</template>
```

There is no `<style scoped>` block: every rule now lives with the section that uses it.

- [ ] **Step 2: Confirm nothing stale is left behind**

Run:
```bash
grep -n "home-" apps/web/app/pages/prototype/index.vue
```
Expected: no output. Any hit is a leftover class from a deleted section.

- [ ] **Step 3: Run the full check**

Run: `bun run check-types && bunx vp check apps/web`
Expected: PASS with no lint or type errors.

- [ ] **Step 4: Walk the page at three viewports**

With the dev server running, load `/prototype` and inspect at 375, 768 and 1440. Confirm all twelve sections appear in the order listed in Step 1, and that no section is horizontally scrollable at 375.

- [ ] **Step 5: Run the design-system checklist**

Confirm each of these against the rendered page and the diff:

- Only the seven base colours appear; no new accent was introduced
- No `border-radius` above 6px anywhere in the new CSS
- No `box-shadow` in any new CSS
- The only gradients are the hero and signature scrims
- Uppercase text appears only in `.ds-meta` contexts; no heading is uppercase
- No section is «heading / text / three cards / button»
- No element animates continuously; all transitions are 200–500ms
- Icons used: only `arrow-right`; no emoji anywhere
- No exclamation marks, urgency or discount language in any copy
- No new file was added under `apps/web/app/components/ds/`
- No token file under `apps/web/app/assets/css/design-system/` was modified

Run these two greps to check the mechanical ones:
```bash
git diff main --stat -- apps/web/app/components/ds/ apps/web/app/assets/css/design-system/
grep -rn "box-shadow\|9999px" apps/web/app/components/proto/home/
```
Expected: the first prints nothing, the second prints nothing.

- [ ] **Step 6: Verify reduced motion**

In DevTools, enable **Emulate CSS prefers-reduced-motion: reduce**, hard-reload `/prototype`, and scroll the whole page. Confirm every section is visible — no `DsReveal` content stays hidden — and the occasion arrows do not shift on hover.

- [ ] **Step 7: Verify the page without JavaScript**

Disable JavaScript in DevTools and reload. Confirm all twelve sections render and no content is stuck invisible (the `@media (scripting: none)` fallback in `utilities.css` covers `DsReveal`).

- [ ] **Step 8: Commit**

```bash
git add apps/web/app/pages/prototype/index.vue
git commit -m "feat: compose the editorial homepage from its twelve sections"
```

---

## Notes for the reviewer

**Photographs repeat on this page and that is deliberate.** `public/prototype/` holds 20 images and only five are not already a product's photo. The spec fixes a rule — the same file never appears twice within two sections, and always at a different crop — and lists the four accepted repeats. Do not flag these as bugs:

| File                    | First use            | Second use          |
| ----------------------- | -------------------- | ------------------- |
| `bouquet-lush-mix.jpg`  | §2 grid (square)     | §4 showcase (4/5)   |
| `bouquet-tulip.jpg`     | §2 grid (square)     | §4 showcase (4/5)   |
| `bouquet-dark-mix.jpg`  | §2 grid (16/9)       | §4 showcase (4/5)   |
| `composition-heart.jpg` | §6 collections (4/5) | §8 selection (3/4)  |

**The empty frames in §10 are the deliverable, not an unfinished state.** They carry the shot briefs the photographer needs.

**Content that intentionally left the homepage:** the floristry-school paragraph and the «Наша історія» / «Записатись на навчання» buttons (Task 6), the standalone «Букет нареченої» service link (Task 7), and Ігор's review (Task 12). All remain reachable elsewhere on the site.
