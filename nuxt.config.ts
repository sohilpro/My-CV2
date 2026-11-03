import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["nuxt-gtag"],
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  gtag: { id: "G-NYPRWQJEFF" },
  // اختیاری: برای رد شدن از محدودیت ۶۰ درخواست/ساعت گیت‌هاب، NUXT_GITHUB_TOKEN را در env بگذارید.
  runtimeConfig: { githubToken: "" },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#06060c" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Vazirmatn:wght@400;500;700;800&display=swap",
        },
      ],
      // اگر JS اجرا نشد، انیمیشن reveal نباید محتوا را پنهان نگه دارد
      noscript: [
        {
          innerHTML:
            "<style>.reveal{opacity:1!important;transform:none!important}</style>",
        },
      ],
    },
  },
});
