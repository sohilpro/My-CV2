<script setup lang="ts">
import { github, profile, ui } from '~/data/portfolio'
const { locale, t } = useLang()
const chips = ['Nuxt', 'Next.js', 'Vue', 'React', 'NestJS', 'Three.js']
</script>

<template>
  <section id="hero" class="relative min-h-svh overflow-hidden">
    <!-- شبکه‌ی محو + لکه‌های نور -->
    <div class="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--c-line)_1px,transparent_1px),linear-gradient(90deg,var(--c-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    <div class="pointer-events-none absolute -top-40 start-1/4 h-96 w-96 rounded-full bg-violet/25 blur-[120px]" />
    <div class="pointer-events-none absolute bottom-0 end-1/4 h-96 w-96 rounded-full bg-cyan/20 blur-[120px]" />

    <div class="relative mx-auto grid min-h-svh max-w-6xl items-center gap-6 px-5 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-4">
      <div class="text-center lg:text-start">
        <span v-reveal class="glass inline-flex items-center gap-2 px-4 py-1.5 text-xs">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {{ t(ui.hero.badge) }}
        </span>

        <p v-reveal="100" class="mt-6 text-sm text-cyan" :class="locale === 'en' && 'uppercase tracking-widest'">{{ t(profile.role) }}</p>
        <h1 v-reveal="200" class="mt-3 text-4xl font-extrabold leading-[1.2] sm:text-5xl lg:text-6xl xl:text-7xl">
          {{ t(ui.hero.hi) }}
          <span class="text-gradient block">{{ t(profile.name) }} {{ t(ui.hero.am) }}</span>
        </h1>
        <p v-reveal="300" class="mx-auto mt-6 max-w-md text-base leading-8 text-muted sm:text-lg lg:mx-0">{{ t(profile.tagline) }}</p>

        <div v-reveal="400" class="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
          <a href="#projects" class="rounded-full bg-gradient-to-l from-cyan to-violet px-7 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:scale-105">{{ t(ui.hero.cta1) }}</a>
          <a href="#about" class="glass px-7 py-3 transition hover:border-violet/60">{{ t(ui.hero.cta2) }}</a>
        </div>

        <div v-reveal="500" class="mt-10 flex flex-wrap justify-center gap-2 lg:justify-start">
          <span v-for="c in chips" :key="c" class="rounded-full border border-line px-3 py-1 text-xs text-muted">{{ c }}</span>
        </div>
      </div>

      <!-- ستون گوی: بنر دقیقاً زیر گوی، داخل همین ستون (نه یک ردیف جدا در گرید) -->
      <div class="flex min-w-0 flex-col">
        <div class="relative h-[340px] sm:h-[420px] lg:h-[560px]">
          <ClientOnly><ThreeHeroScene /></ClientOnly>
        </div>
        <UiHeadlineBanner :href="github.url" class="relative z-10 -mt-6 sm:-mt-8 lg:-mt-12" />
      </div>
    </div>
  </section>
</template>