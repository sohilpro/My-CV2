<script setup lang="ts">
import { skills, ui } from '~/data/portfolio'
const { t } = useLang()
</script>

<template>
  <section id="skills" class="section">
    <h2 v-reveal class="mb-10 text-3xl font-extrabold sm:mb-12 sm:text-4xl">{{ t(ui.skills.a) }} <span class="text-gradient">{{ t(ui.skills.b) }}</span></h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div v-for="(g, i) in skills" :key="g.group.en" v-reveal="i * 120">
        <UiTiltCard class="h-full">
          <h3 class="mb-5 text-lg font-bold text-cyan">{{ t(g.group) }}</h3>
          <div v-for="s in g.items" :key="s.name" class="mb-4">
            <div class="mb-1 flex justify-between text-sm"><span>{{ s.name }}</span><span class="text-muted">{{ s.level }}%</span></div>
            <div class="h-1.5 rounded-full bg-line">
              <div class="h-full rounded-full bg-gradient-to-l from-cyan to-violet" :style="{ width: s.level + '%' }" />
            </div>
          </div>
        </UiTiltCard>
      </div>
    </div>
  </section>
</template>