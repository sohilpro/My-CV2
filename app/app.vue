<script setup lang="ts">
const { app } = useRuntimeConfig();
const locale = useLocale();
const theme = useTheme();
useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === "fa" ? "rtl" : "ltr",
    class: theme.value,
  },
  title:
    locale.value === "fa"
      ? "سهیل | توسعه‌دهنده فول‌استک"
      : "Sohilpro | Full-Stack Developer",
  meta: [
    {
      name: "theme-color",
      content: theme.value === "dark" ? "#06060c" : "#f5f5fb",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: `${app.baseURL}favicon.ico`,
    },
  ],
}));
</script>

<template>
  <div>
    <LayoutAppHeader />
    <main>
      <SectionsHeroSection />
      <SectionsSkillsSection />
      <SectionsAboutSection />
      <SectionsProjectsSection />
    </main>
    <LayoutAppFooter />
  </div>
</template>
