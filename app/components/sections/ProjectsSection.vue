<script setup lang="ts">
import { github, projects, ui } from '~/data/portfolio'
const { t } = useLang()
</script>

<template>
  <section id="projects" class="section">
    <h2 v-reveal class="mb-10 text-3xl font-extrabold sm:mb-12 sm:text-4xl">{{ t(ui.projects.a) }} <span class="text-gradient">{{ t(ui.projects.b) }}</span></h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div v-for="(p, i) in projects" :key="p.title.en" v-reveal="i * 120">
        <UiTiltCard class="h-full">
           <img :src="p.photo" :alt="p.alt" class="mb-5 h-40 rounded-xl" onerror="this.style.display='none'">
          <h3 class="text-xl font-bold">{{ t(p.title) }}</h3>
          <p class="mt-2 text-sm leading-7 text-muted">{{ t(p.desc) }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="tag in p.tags" :key="tag" class="rounded-full border border-line px-3 py-0.5 text-xs text-cyan">{{ tag }}</span>
          </div>
          <NuxtLink :href="p.link" class="mt-5 inline-block text-sm text-violet hover:text-pink">{{ t(ui.projects.view) }}</NuxtLink>
        </UiTiltCard>
      </div>
    </div>

    <!-- کارت زنده‌ی گیت‌هاب: ادامه‌ی طبیعی «نمونه کارها» -->
    <div v-reveal class="mt-14 md:mt-20">
      <UiProfileBanner :href="github.url" />
    </div>
  </section>
</template>