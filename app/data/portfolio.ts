export type Bi = { en: string; fa: string };

export const ui = {
  nav: [
    { id: "hero", t: { en: "Home", fa: "خانه" } },
    { id: "skills", t: { en: "Skills", fa: "مهارت‌ها" } },
    { id: "about", t: { en: "About", fa: "درباره من" } },
    { id: "projects", t: { en: "Work", fa: "نمونه کار" } },
  ],
  contact: { en: "Contact", fa: "تماس" },
  hero: {
    hi: { en: "Hi, I'm", fa: "سلام، من" },
    am: { en: "", fa: "هستم" },
    cta1: { en: "View my work", fa: "دیدن نمونه کارها" },
    badge: {
      en: "Available for new projects",
      fa: "آماده همکاری روی پروژه‌های جدید",
    },
    cta2: { en: "About me", fa: "درباره من" },
  },
  skills: {
    a: { en: "Skills", fa: "مهارت‌ها" },
    b: { en: "& Tools", fa: "و ابزارها" },
  },
  about: {
    a: { en: "About", fa: "درباره" },
    b: { en: "me", fa: "من" },
    photo: { en: "Your photo here", fa: "جای عکس شما" },
  },
  projects: {
    a: { en: "Selected", fa: "نمونه" },
    b: { en: "Work", fa: "کارها" },
    view: { en: "View project →", fa: "مشاهده پروژه ←" },
  },
  banner: {
    stars: { en: "Stars", fa: "ستاره" },
    followers: { en: "Followers", fa: "دنبال‌کننده" },
    repos: { en: "Repos", fa: "مخزن" },
    forks: { en: "Forks", fa: "فورک" },
    live: { en: "Live from GitHub", fa: "زنده از گیت‌هاب" },
    updated: { en: "Last updated", fa: "آخرین به‌روزرسانی" },
    open: { en: "Open GitHub profile", fa: "مشاهده پروفایل گیت‌هاب" },
    morning: { en: "Good morning", fa: "صبح بخیر" },
    afternoon: { en: "Good afternoon", fa: "ظهر بخیر" },
    evening: { en: "Good evening", fa: "عصر بخیر" },
    night: { en: "Good night", fa: "شب بخیر" },
  },
  footer: {
    a: { en: "Let's build", fa: "بیا" },
    b: { en: "something great", fa: "چیزی بزرگ" },
    c: { en: "together", fa: "بسازیم" },
  },
};

// همه محتوا اینجاست؛ برای افزودن مهارت یا پروژه فقط یک آیتم اضافه کنید.
export const profile = {
  name: { en: "Sohilpro", fa: "سهیل" } as Bi,
  role: { en: "Full-Stack Developer", fa: "توسعه‌دهنده فول‌استک" } as Bi,
  tagline: {
    en: "Fast, precise, distinctive interfaces — from 3D to backend.",
    fa: "رابط‌های کاربری سریع، دقیق و متفاوت؛ از سه‌بعدی تا بک‌اند.",
  } as Bi,
  photo: "/images/sohilpro.webp",
  about: [
    {
      en: "I am a full-stack developer who loves building fast, distinctive web experiences.",
      fa: "من یک توسعه‌دهنده فول‌استک هستم که عاشق ساختن تجربه‌های وب متفاوت و سریع است.",
    },
    {
      en: "With modern frontend frameworks and Node.js/NestJS on the backend, I take products from idea to deployment.",
      fa: "با فریم‌ورک‌های مدرن فرانت‌اند و Node.js/NestJS در بک‌اند، محصول را از ایده تا استقرار می‌سازم.",
    },
  ] as Bi[],
  stats: [
    { label: { en: "Years of experience", fa: "سال تجربه" }, value: "5+" },
    { label: { en: "Projects", fa: "پروژه" }, value: "30+" },
    { label: { en: "Frameworks", fa: "فریم‌ورک" }, value: "6+" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/sohilpro" },
    { label: "LinkedIn", href: "https://linkedin.com/in/sohil-pro-ab2620184" },
    { label: "Email", href: "mailto:sohil123dhh@gmail.com" },
  ],
};

export const skills = [
  {
    group: { en: "Frontend", fa: "فرانت‌اند" },
    items: [
      { name: "Nuxt", level: 95 },
      { name: "Vue", level: 95 },
      { name: "Nuxt.js", level: 95 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 85 },
      { name: "Svelte", level: 75 },
      { name: "Astro", level: 80 },
    ],
  },
  {
    group: { en: "Backend", fa: "بک‌اند" },
    items: [
      { name: "Node.js", level: 90 },
      { name: "NestJS", level: 90 },
      { name: "Postgres", level: 70 },
      { name: "Redis", level: 60 },
      { name: "TypeOrm", level: 80 },
      { name: "Prisma", level: 80 },
    ],
  },
  {
    group: { en: "Tooling", fa: "ابزار" },
    items: [
      { name: "Tailwind", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Three.js", level: 70 },
      { name: "Graphql", level: 80 },
      { name: "Socket.IO", level: 85 },
      { name: "EmDash", level: 84 },
      { name: "Docker", level: 69 },
    ],
  },
];

export const projects = [
  {
    title: { en: "vecaro.ir", fa: "فروشگاه وکارو" },
    desc: {
      en: "Vecaro is an online store specializing in industrial and construction adhesives, technical sprays, and automotive consumables.",
      fa: "وکارو فروشگاه آنلاین چسب صنعتی و ساختمانی، اسپری‌های فنی و لوازم مصرفی خودرو است.",
    },
    tags: ["Nuxt-V4", "NestJS","Tailwind-V4","PrimeVue"],
    link: "https://vecaro.ir/",
    photo: "/images/vecaro-ir.webp",
    alt: "vecaro.ir",
  },
];

// بنرهای گیت‌هاب (HeadlineBanner زیر گوی + ProfileBanner در بخش نمونه‌کارها)
// فقط همین‌جا را ویرایش کنید؛ هر دو بنر و روت /api/github از همین اطلاعات می‌خوانند.
export const github = {
  username: "sohilpro",
  url: "https://github.com/sohilpro",
  timezone: "Asia/Tehran",
  city: { en: "Shiraz", fa: "شیراز" } as Bi,
  fullName: { en: "sohilpro", fa: "سهیل خباز" } as Bi,
  roles: [
    { en: "Full-Stack Developer", fa: "توسعه‌دهنده فول‌استک" },
    { en: "Product Builder", fa: "سازنده محصول" },
    { en: "Problem Solver", fa: "حل‌کننده مسئله" },
    { en: "Iran", fa: "ایران" },
  ] as Bi[],
  // جمله‌های چرخان زیر گوی
  headline: [
    {
      en: "Full-Stack Developer × Product Builder",
      fa: "توسعه‌دهنده فول‌استک × سازنده محصول",
    },
    { en: "🧩 First principles thinking", fa: "🧩 تفکر از اصول اولیه" },
    { en: "💡 Designing solutions", fa: "💡 طراحی راه‌حل" },
    { en: "🚀 Building real products", fa: "🚀 ساخت محصولات واقعی" },
    { en: "Open-source builder from Iran", fa: "سازنده‌ی متن‌باز از ایران" },
  ] as Bi[],
  headlineAlt: {
    en: "Full-Stack Developer and Product Builder — first principles thinking, designing solutions, building real products",
    fa: "توسعه‌دهنده فول‌استک و سازنده محصول — تفکر از اصول اولیه، طراحی راه‌حل، ساخت محصولات واقعی",
  } as Bi,
  // اگر API گیت‌هاب در دسترس نبود (محدودیت نرخ، آفلاین)، این اعداد نمایش داده می‌شوند.
  fallbackStats: {
    stars: 22,
    followers: 20,
    repos: 25,
    forks: 0,
    updatedAt: "2026-11-02T00:00:00Z",
  },
};
