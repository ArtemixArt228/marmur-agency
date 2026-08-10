/**
 * PROTOTYPE — стан прототипу (кошик, mock-вхід, відсічка).
 * Живе лише в памʼяті вкладки; викинути разом із pages/prototype.
 */
import { protoDelivery, protoProducts, type ProtoProduct } from "~/data/prototype";

export interface ProtoCartItem {
  productId: string;
  qty: number;
}

const DISCOUNT_RATE = 0.1;

export function usePrototypeShop() {
  const cart = useState<ProtoCartItem[]>("proto-cart", () => []);
  const isLoggedIn = useState<boolean>("proto-logged-in", () => false);
  const isCartOpen = useState<boolean>("proto-cart-open", () => false);

  const discountRate = computed(() => (isLoggedIn.value ? DISCOUNT_RATE : 0));
  const discountPercent = computed(() => Math.round(discountRate.value * 100));

  function productById(id: string): ProtoProduct | undefined {
    return protoProducts.find((p) => p.id === id);
  }

  function finalPrice(product: ProtoProduct): number {
    return Math.round(product.price * (1 - discountRate.value));
  }

  function formatUah(value: number): string {
    return `${new Intl.NumberFormat("uk-UA").format(value)} ₴`;
  }

  function addToCart(productId: string, qty = 1) {
    const item = cart.value.find((i) => i.productId === productId);
    if (item) item.qty += qty;
    else cart.value.push({ productId, qty });
    isCartOpen.value = true;
  }

  function setQty(productId: string, qty: number) {
    const item = cart.value.find((i) => i.productId === productId);
    if (!item) return;
    if (qty <= 0) cart.value = cart.value.filter((i) => i.productId !== productId);
    else item.qty = qty;
  }

  function clearCart() {
    cart.value = [];
  }

  const cartCount = computed(() => cart.value.reduce((sum, i) => sum + i.qty, 0));

  const cartTotal = computed(() =>
    cart.value.reduce((sum, i) => {
      const p = productById(i.productId);
      return p ? sum + finalPrice(p) * i.qty : sum;
    }, 0),
  );

  const cartBaseTotal = computed(() =>
    cart.value.reduce((sum, i) => {
      const p = productById(i.productId);
      return p ? sum + p.price * i.qty : sum;
    }, 0),
  );

  /** До відсічки — «сьогодні», після — чесне «завтра» */
  const isBeforeCutoff = computed(() => new Date().getHours() < protoDelivery.cutoffHour);
  const todayWord = computed(() => (isBeforeCutoff.value ? "сьогодні" : "завтра"));

  /** Вікна, які ще реально встигаємо сьогодні */
  function windowsForDate(date: "today" | "tomorrow"): string[] {
    if (date === "tomorrow") return protoDelivery.windows;
    const hour = new Date().getHours();
    return protoDelivery.windows.filter((w) => {
      const start = Number.parseInt(w.split(":")[0] ?? "0", 10);
      return start > hour + 1;
    });
  }

  return {
    cart,
    isLoggedIn,
    isCartOpen,
    discountRate,
    discountPercent,
    productById,
    finalPrice,
    formatUah,
    addToCart,
    setQty,
    clearCart,
    cartCount,
    cartTotal,
    cartBaseTotal,
    isBeforeCutoff,
    todayWord,
    windowsForDate,
  };
}
