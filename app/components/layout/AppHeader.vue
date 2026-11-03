<script setup lang="ts">
import { profile, ui } from '~/data/portfolio'
const { locale, t } = useLang()
const theme = useTheme()

// منوی موبایل (قبلاً زیر md هیچ ناوبری‌ای وجود نداشت)
const open = ref(false)
const close = () => { open.value = false }
const fa = computed(() => locale.value === 'fa')

let stop = () => {}
onMounted(() => {
  const mq = matchMedia('(min-width: 768px)')
  const onChange = () => { if (mq.matches) close() }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  mq.addEventListener('change', onChange)
  addEventListener('keydown', onKey)
  stop = () => { mq.removeEventListener('change', onChange); removeEventListener('keydown', onKey) }
})
onBeforeUnmount(() => stop())
</script>

<template>
  <header class="fixed inset-x-0 top-3 z-50 flex justify-center px-3 pt-[env(safe-area-inset-top)] sm:top-4 sm:px-4">
    <div class="relative w-full max-w-4xl">
      <nav class="glass flex w-full items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3" aria-label="Main">
        <a href="#hero" class="text-gradient text-lg font-extrabold" @click="close">{{ t(profile.name) }}</a>

        <ul class="hidden gap-5 text-sm md:flex lg:gap-6">
          <li v-for="l in ui.nav" :key="l.id">
            <a :href="`#${l.id}`" class="transition hover:text-cyan">{{ t(l.t) }}</a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <button class="glass px-3 py-1 text-xs font-bold transition hover:border-cyan/60"
                  :aria-label="fa ? 'تغییر زبان' : 'Switch language'"
                  @click="locale = locale === 'en' ? 'fa' : 'en'">
            {{ locale === 'en' ? 'فا' : 'EN' }}
          </button>
          <button class="glass grid h-8 w-8 place-items-center transition hover:border-cyan/60"
                  :aria-label="fa ? 'تغییر تم' : 'Toggle theme'"
                  @click="theme = theme === 'dark' ? 'light' : 'dark'">
            {{ theme === 'dark' ? '☀️' : '🌙' }}
          </button>
          <a href="#contact" class="hidden rounded-full bg-violet px-4 py-1.5 text-sm font-medium text-white transition hover:bg-violet/80 md:block">
            {{ t(ui.contact) }}
          </a>
          <button class="glass grid h-8 w-8 place-items-center md:hidden"
                  :aria-label="fa ? 'منو' : 'Menu'" :aria-expanded="open" aria-controls="mobile-nav"
                  @click="open = !open">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
              <path v-else d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- پنل موبایل: هم‌سطح nav (نه داخل آن) تا backdrop-filter تو در تو خراب نشود -->
      <Transition name="menu">
        <div v-if="open" class="md:hidden">
          <div class="fixed inset-0 -z-10" @click="close" />
          <ul id="mobile-nav" class="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-panel/95 p-2 shadow-2xl backdrop-blur-xl">
            <li v-for="l in ui.nav" :key="l.id">
              <a :href="`#${l.id}`" class="block rounded-xl px-4 py-3 transition hover:bg-violet/10 hover:text-cyan" @click="close">{{ t(l.t) }}</a>
            </li>
            <li class="p-2 pt-1">
              <a href="#contact" class="block rounded-full bg-violet px-4 py-2.5 text-center font-medium text-white" @click="close">{{ t(ui.contact) }}</a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.menu-enter-active, .menu-leave-active { transition: opacity .18s ease, transform .18s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-6px); }
@media (prefers-reduced-motion: reduce) { .menu-enter-active, .menu-leave-active { transition: none; } }
</style>
