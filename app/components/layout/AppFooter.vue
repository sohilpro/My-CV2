<script setup lang="ts">
import { profile, ui } from '~/data/portfolio'
const { t } = useLang()
</script>

<template>
  <footer id="contact" class="relative border-t border-line">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-violet to-transparent" />
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-16 text-center sm:px-6">
      <h3 v-reveal class="text-2xl font-extrabold sm:text-3xl">
        {{ t(ui.footer.a) }} <span class="text-gradient">{{ t(ui.footer.b) }}</span> {{ t(ui.footer.c) }}
      </h3>
      <div v-reveal="150" class="flex flex-wrap justify-center gap-3">
        <a v-for="s in profile.socials" :key="s.label" :href="s.href" target="_blank" rel="noopener"
           class="glass px-5 py-2 text-sm transition hover:border-cyan/60 hover:text-cyan">{{ s.label }}</a>
      </div>
      <p class="text-xs text-muted">© {{ new Date().getFullYear() }} {{ t(profile.name) }}</p>
    </div>
  </footer>
</template>