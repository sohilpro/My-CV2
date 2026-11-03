<script setup lang="ts">
import { profile, ui } from '~/data/portfolio'
import { assetUrl as getAssetUrl } from '~/utils/helper'
const { t } = useLang()

const { app: {baseURL} } = useRuntimeConfig()

const imageUrl = (path: string) => {
  return getAssetUrl(path, baseURL)
}
</script>

<template>
  <section id="about" class="section grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
    <div v-reveal class="mx-auto w-full max-w-xs md:max-w-none">
      <UiTiltCard class="!p-2">
        <div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel">
          <div class="absolute inset-0 flex items-center justify-center text-muted">{{ t(ui.about.photo) }}</div>
          <!-- عکس خود را در public/images/me.jpg قرار دهید -->
          <img :src="imageUrl(profile.photo)" alt="" class="relative h-full w-full object-fit" onerror="this.style.display='none'">
        </div>
      </UiTiltCard>
    </div>
    <div>
      <h2 v-reveal class="mb-6 text-3xl font-extrabold sm:text-4xl">{{ t(ui.about.a) }} <span class="text-gradient">{{ t(ui.about.b) }}</span></h2>
      <p v-for="(p, i) in profile.about" :key="i" v-reveal="(i + 1) * 100" class="mb-4 leading-8 text-muted">{{ t(p) }}</p>
      <div class="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <div v-for="(s, i) in profile.stats" :key="s.value" v-reveal="300 + i * 100" class="glass p-3 text-center sm:p-4">
          <div class="text-gradient text-2xl font-extrabold sm:text-3xl">{{ s.value }}</div>
          <div class="mt-1 text-xs text-muted">{{ t(s.label) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>