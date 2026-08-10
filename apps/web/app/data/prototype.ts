/**
 * PROTOTYPE — mock-дані для клікабельного прототипу Marmúr.
 * Викинути разом із pages/prototype після затвердження дизайну.
 * У реальній системі все це приходить із KeyCRM.
 */

export type ProtoCategory = "mix" | "mono" | "baskets" | "bride" | "gift";

export interface ProtoProduct {
  id: string;
  name: string;
  price: number;
  category: ProtoCategory;
  photo: string;
  /** Чи є в наявності зараз (у реальності — залишки KeyCRM) */
  available: boolean;
  description: string;
  composition?: string[];
}

export const protoProducts: ProtoProduct[] = [
  {
    id: "morning-garden",
    name: "Ранковий сад",
    price: 1450,
    category: "mix",
    photo: "/prototype/bouquet-lush-mix.jpg",
    available: true,
    description:
      "Пишний мікс із піоновидних троянд, астранції та сезонних ягід — виглядає як щойно зібраний у саду.",
    composition: ["Піоновидна троянда", "Астранція", "Гіперикум", "Евкаліпт"],
  },
  {
    id: "velvet-evening",
    name: "Оксамитовий вечір",
    price: 1690,
    category: "mix",
    photo: "/prototype/bouquet-dark-mix.jpg",
    available: true,
    description:
      "Глибокі винні відтінки: анемони, ранункулюси й протея для тих, хто любить драматичне.",
    composition: ["Анемона", "Ранункулюс", "Протея", "Лаванда"],
  },
  {
    id: "peach-whisper",
    name: "Персиковий шепіт",
    price: 1250,
    category: "mix",
    photo: "/prototype/bouquet-peach.jpg",
    available: true,
    description: "Ніжний букет у персикових тонах — кущові троянди, еустома та багато повітря.",
    composition: ["Кущова троянда", "Еустома", "Евкаліпт"],
  },
  {
    id: "creme-brulee",
    name: "Крем-брюле",
    price: 1150,
    category: "mono",
    photo: "/prototype/bouquet-cream-roses.jpg",
    available: true,
    description: "Моно-букет із кремових піоновидних троянд — класика, яка не потребує пояснень.",
    composition: ["Піоновидна троянда David Austin"],
  },
  {
    id: "carmen",
    name: "Кармен",
    price: 1390,
    category: "mono",
    photo: "/prototype/bouquet-red-roses.jpg",
    available: false,
    description: "Двадцять одна червона троянда глибокого відтінку. Той самий жест.",
    composition: ["Троянда Explorer 60 см"],
  },
  {
    id: "pink-lily",
    name: "Рожева лілія",
    price: 980,
    category: "mono",
    photo: "/prototype/bouquet-lily.jpg",
    available: true,
    description: "Ароматні східні лілії, які розкриваються вдома протягом тижня.",
    composition: ["Лілія орієнтальна"],
  },
  {
    id: "tulip-morning",
    name: "Тюльпановий ранок",
    price: 850,
    category: "mono",
    photo: "/prototype/bouquet-tulip.jpg",
    available: true,
    description: "Свіжі тюльпани — просто, весняно і завжди доречно.",
    composition: ["Тюльпан піоновидний"],
  },
  {
    id: "calla",
    name: "Калла",
    price: 1050,
    category: "mono",
    photo: "/prototype/bouquet-calla.jpg",
    available: false,
    description: "Стриманий букет із рожевих калл — графічний і елегантний.",
    composition: ["Калла"],
  },
  {
    id: "peonies-white",
    name: "Білі півонії",
    price: 1590,
    category: "mono",
    photo: "/prototype/marmur-2.jpg",
    available: true,
    description: "Оберемок білих півоній у фірмовому пакуванні — фото з нашого поля, без прикрас.",
    composition: ["Півонія"],
  },
  {
    id: "bride-tenderness",
    name: "Букет нареченої «Ніжність»",
    price: 2800,
    category: "bride",
    photo: "/prototype/marmur-3.jpg",
    available: true,
    description:
      "Весільний букет під образ і сукню — збираємо після особистої консультації з флористом.",
    composition: ["Півонія", "Кущова троянда", "Стабілізована зелень"],
  },
  {
    id: "flower-heart",
    name: "Серце з квітів",
    price: 1890,
    category: "baskets",
    photo: "/prototype/composition-heart.jpg",
    available: true,
    description:
      "Композиція-серце з сезонних квітів у флористичній губці — для особливих приводів.",
    composition: ["Троянда", "Далія", "Кустова троянда", "Мімоза"],
  },
  {
    id: "rose-solo",
    name: "Троянда соло",
    price: 350,
    category: "baskets",
    photo: "/prototype/rose-solo.jpg",
    available: true,
    description: "Одна досконала троянда у скляній вазі — мінімалізм як він є.",
    composition: ["Троянда", "Ваза у комплекті"],
  },
  {
    id: "candle-hand",
    name: "Свічка ручної роботи",
    price: 420,
    category: "gift",
    photo: "/prototype/gift-candle.jpg",
    available: true,
    description: "Соєва свічка з деревʼяним ґнотом. Аромат: інжир і сандал.",
  },
  {
    id: "candle-amber",
    name: "Свічка бурштинова",
    price: 460,
    category: "gift",
    photo: "/prototype/gift-candle-amber.jpg",
    available: true,
    description: "Тепле бурштинове скло, аромат амбри й ванілі.",
  },
  {
    id: "vase-ceramic",
    name: "Ваза керамічна",
    price: 680,
    category: "gift",
    photo: "/prototype/gift-vase.jpg",
    available: true,
    description: "Матова керамічна ваза ручної роботи — дім для майбутніх букетів.",
  },
];

/** Навігація: спільна для шапки, повноекранного меню й підвалу */
export const protoNav = [
  { label: "Каталог", to: "/prototype/catalog" },
  { label: "Подарунки", to: "/prototype/catalog?category=gift" },
  { label: "Про нас", to: "/prototype/about" },
  { label: "Навчання", to: "/prototype/school" },
  { label: "Доставка", to: "/prototype/delivery" },
];

export const protoCategoryLabels: Record<ProtoCategory, string> = {
  mix: "Мікс-букети",
  mono: "Моно-букети",
  baskets: "Квіти у корзинах та коробках",
  bride: "Букет нареченої",
  gift: "Подарунки",
};

/** Підкатегорії подарунків (з реального списку власниці) */
export const protoGiftSubcategories = ["Свічки", "Вази", "Фініки", "Планери"];

/**
 * Сервісні категорії: без кошика й оплати — оформлюються заявкою,
 * далі менеджер зв'язується особисто.
 */
export const protoServices = [
  {
    id: "wedding-sub",
    label: "Весільна підписка",
    text: "Квіткове оформлення весілля під ключ: від букета нареченої до декору залу. Працюємо за індивідуальним кошторисом.",
  },
  {
    id: "decor",
    label: "Декор свята",
    text: "Оформлення подій квітами: дні народження, корпоративи, фотозони. Виїжджаємо, слухаємо, пропонуємо концепцію.",
  },
  {
    id: "flower-sub",
    label: "Квіткова підписка",
    text: "Свіжий букет у ваш дім чи офіс щотижня або щодва — за підпискою, з персональним стилем.",
  },
];

export const protoReviews = [
  {
    name: "Олена",
    source: "Instagram",
    text: "Замовляла букет мамі на ювілей — привезли точно у вікно, квіти простояли два тижні. Найкращі у місті!",
  },
  {
    name: "Андрій",
    source: "Google",
    text: "Робив сюрприз дружині. Флористка сама підібрала композицію під її улюблені кольори. Дружина плакала від щастя.",
  },
  {
    name: "Марта",
    source: "Instagram",
    text: "Це вже пʼятий букет за пів року. Пакування таке, що шкода розгортати. Дякую за естетику!",
  },
  {
    name: "Ігор",
    source: "Google",
    text: "Замовив о 21:00 на ранок — о 10:30 букет уже був у отримувачки. Сервіс рівня столиці.",
  },
];

/** Умови доставки — у реальній системі це налаштування, звідси ж рендериться сторінка «Доставка» */
export const protoDelivery = {
  cutoffHour: 18,
  freeFrom: 5000,
  windows: ["10:00–13:00", "13:00–16:00", "16:00–19:00"],
  zones: [
    { id: "city", label: "Львів", price: 150 },
    { id: "suburb", label: "Передмістя (до 15 км)", price: 300 },
  ],
  pickup: {
    address: "вул. Городоцька, 12, Львів",
    hours: "щодня 9:00–20:00",
  },
  phone: "+380 67 000 00 00",
  instagram: "@marmur.flowers",
};
