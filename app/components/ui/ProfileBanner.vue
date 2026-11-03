<script setup lang="ts">
// نسخه‌ی کامپوننتیِ hero-w.svg: ساعت زنده‌ی تهران، آمار زنده‌ی گیت‌هاب، و چیدمان واکنش‌گرا
// (در موبایل ۲×۲، در دسکتاپ ۴ستونه). متن واقعی HTML است، پس هیچ‌وقت ریز نمی‌شود.
import { github, ui } from '~/data/portfolio'

defineProps<{ href?: string }>()
const { locale, t } = useLang()

// ---- آمار: ابتدا مقدار پیش‌فرض (SSR)، بعد مقدار زنده از /api/github
const { data } = useLazyFetch('/api/github', { key: 'github-stats', server: false, default: () => null })
const stats = computed(() => ({ ...github.fallbackStats, ...(data.value ?? {}) }))
const live = computed(() => !!data.value)

const intl = computed(() => (locale.value === 'fa' ? 'fa-IR' : 'en-GB'))
const num = (n: number) => new Intl.NumberFormat(intl.value).format(n)
const cards = computed(() => [
  { k: 'stars', icon: '★ ', label: t(ui.banner.stars), value: num(stats.value.stars) },
  { k: 'followers', icon: '', label: t(ui.banner.followers), value: num(stats.value.followers) },
  { k: 'repos', icon: '', label: t(ui.banner.repos), value: num(stats.value.repos) },
  { k: 'forks', icon: '', label: t(ui.banner.forks), value: num(stats.value.forks) }
])
const updated = computed(() =>
  new Intl.DateTimeFormat(intl.value, { day: '2-digit', month: 'short', year: 'numeric', timeZone: github.timezone })
    .format(new Date(stats.value.updatedAt)))
const footer = computed(() =>
  `${live.value ? t(ui.banner.live) : t(ui.banner.updated)} · ${updated.value} · ${t(github.city)}`)

// ---- ساعت و سلام (فقط سمت کلاینت تا Hydration mismatch نداشته باشیم)
const now = ref<Date | null>(null)
const hour = computed(() => {
  if (!now.value) return 0
  const h = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: github.timezone }).format(now.value)
  return Number(h)
})
const time = computed(() => now.value && new Intl.DateTimeFormat(intl.value, {
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: github.timezone
}).format(now.value))
const greeting = computed(() => {
  const h = hour.value
  if (h >= 5 && h < 12) return { icon: '🌅', text: ui.banner.morning }
  if (h >= 12 && h < 17) return { icon: '☀️', text: ui.banner.afternoon }
  if (h >= 17 && h < 21) return { icon: '🌇', text: ui.banner.evening }
  return { icon: '🌙', text: ui.banner.night }
})

// ---- نام اصلی/فرعی بر اساس زبان سایت
const primary = computed(() => t(github.fullName))
const second = computed(() => (locale.value === 'fa'
  ? { text: github.fullName.en, lang: 'en', dir: 'ltr' }
  : { text: github.fullName.fa, lang: 'fa', dir: 'rtl' }))
const roles = computed(() => github.roles.map(t).join(' · '))

// ---- مدار (SVG): شناسه‌ی یکتا تا با نمونه‌های دیگر تداخل نکند
const uid = 'o' + useId().replace(/\W/g, '')
const orbit = ref<SVGSVGElement>()
let clock: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  now.value = new Date()
  clock = setInterval(() => { now.value = new Date() }, 15_000)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) orbit.value?.pauseAnimations()
})
onBeforeUnmount(() => clearInterval(clock))
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="banner-card pb"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :aria-label="href ? `${primary} — ${t(ui.banner.open)}` : undefined"
  >
    <div class="pb-grid">
      <p class="pb-greet">
        <template v-if="time">{{ greeting.icon }} {{ t(greeting.text) }} · {{ t(github.city) }} {{ time }}</template>
        <template v-else>📍 {{ t(github.city) }}</template>
      </p>

      <svg ref="orbit" class="pb-orbit" viewBox="0 0 200 130" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient :id="`${uid}m`" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style="stop-color: var(--bn-a)" />
            <stop offset="1" style="stop-color: var(--bn-b)" />
          </linearGradient>
          <filter :id="`${uid}g`" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g fill="none" stroke="currentColor" stroke-width="1.6">
          <ellipse cx="100" cy="65" rx="92" ry="57" stroke-opacity=".16" />
          <ellipse cx="100" cy="65" rx="67" ry="41.5" stroke-opacity=".24" />
          <ellipse cx="100" cy="65" rx="42" ry="26" stroke-opacity=".34" />
        </g>
        <circle cx="100" cy="65" r="34" :fill="`url(#${uid}m)`" :filter="`url(#${uid}g)`" opacity=".8" />
        <circle cx="100" cy="65" r="30" :fill="`url(#${uid}m)`" />
        <circle cx="100" cy="65" r="30" fill="none" stroke="#fff" stroke-opacity=".5" />
        <circle cx="100" cy="65" r="30" fill="none" stroke="#fff" stroke-opacity=".35">
          <animate attributeName="r" values="30;44;30" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values=".35;0;.35" dur="4s" repeatCount="indefinite" />
        </circle>
        <g>
          <circle r="8" fill="var(--bn-fg)" />
          <animateMotion dur="18s" repeatCount="indefinite" begin="-0s" path="M8,65 a92,57 0 1,0 184,0 a92,57 0 1,0 -184,0" />
        </g>
        <g>
          <circle r="6.8" fill="var(--bn-fg)" fill-opacity=".85" />
          <animateMotion dur="12s" repeatCount="indefinite" begin="-4.6s" path="M33,65 a67,41.5 0 1,0 134,0 a67,41.5 0 1,0 -134,0" />
        </g>
        <g>
          <circle r="5.4" fill="var(--bn-fg)" fill-opacity=".7" />
          <animateMotion dur="8s" repeatCount="indefinite" begin="-5.8s" path="M58,65 a42,26 0 1,0 84,0 a42,26 0 1,0 -84,0" />
        </g>
      </svg>

      <p class="pb-name">{{ primary }}</p>
      <p class="pb-second"><span :lang="second.lang" :dir="second.dir">{{ second.text }}</span></p>
      <p class="pb-role">{{ roles }}</p>

      <dl class="pb-stats">
        <div v-for="c in cards" :key="c.k" class="pb-stat">
          <dt>{{ c.icon }}{{ c.label }}</dt>
          <dd>{{ c.value }}</dd>
        </div>
      </dl>

      <p class="pb-foot">
        <span v-if="live" class="pb-live" aria-hidden="true" />{{ footer }}
      </p>
    </div>
  </component>
</template>

<style scoped>
.pb { --bn-aura-bg:
  radial-gradient(55% 80% at 100% 0%, color-mix(in srgb, var(--bn-a) calc(var(--bn-aura) * 100%), transparent), transparent 70%),
  radial-gradient(50% 70% at 0% 100%, color-mix(in srgb, var(--bn-b) calc(var(--bn-aura) * 70%), transparent), transparent 70%); }

.pb-grid {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: start;
  column-gap: 1rem; row-gap: .3rem;
  padding: clamp(1.1rem, 3.6cqw, 2.5rem);
}
.pb-greet {
  grid-column: 1; grid-row: 1; align-self: center; min-height: 1.5em;
  font-weight: 700; letter-spacing: .02em; color: var(--bn-a);
  font-size: clamp(.8rem, .62rem + .9cqw, 1.15rem);
}
.pb-orbit {
  grid-column: 2; grid-row: 1; align-self: center; overflow: visible;
  width: clamp(4.5rem, 14cqw, 13rem); height: auto; color: var(--bn-fg);
}
.pb-name, .pb-second, .pb-role { grid-column: 1; margin: 0; }
.pb-name {
  margin-top: .35rem; font-weight: 800; line-height: 1.1; letter-spacing: -.02em; text-wrap: balance;
  font-size: clamp(1.85rem, 6.5cqw, 4.5rem);
}
.pb-second { font-weight: 700; color: var(--bn-sub); font-size: clamp(1.05rem, 2.9cqw, 2rem); line-height: 1.4; }
.pb-role { color: var(--bn-muted); font-weight: 500; line-height: 1.6; font-size: clamp(.82rem, .65rem + .85cqw, 1.2rem); }

.pb-stats {
  grid-column: 1 / -1; margin: clamp(.9rem, 3cqw, 1.9rem) 0 0; padding: 0;
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem;
}
.pb-stat {
  display: flex; align-items: baseline; justify-content: space-between; gap: .5rem;
  padding: clamp(.7rem, 2cqw, 1.15rem) clamp(.85rem, 2.4cqw, 1.4rem);
  border-radius: 1.1rem; border: 1px solid var(--bn-glass-bd);
  background: var(--bn-glass); box-shadow: inset 0 1px 0 var(--bn-glass-hi);
}
.pb-stat dt { margin: 0; font-weight: 600; color: var(--bn-sub); font-size: clamp(.8rem, .62rem + .8cqw, 1.15rem); }
.pb-stat dd { margin: 0; font-weight: 800; font-variant-numeric: tabular-nums; font-size: clamp(1.1rem, .8rem + 1.5cqw, 2rem); line-height: 1.1; }

.pb-foot {
  grid-column: 1 / -1; margin: .9rem 0 0; color: var(--bn-muted);
  display: flex; align-items: center; gap: .45rem; font-size: clamp(.7rem, .6rem + .45cqw, .85rem);
}
.pb-live { width: .45rem; height: .45rem; border-radius: 9999px; background: #34d399; box-shadow: 0 0 0 3px rgb(52 211 153 / .25); }

/* دسکتاپ / کانتینر پهن */
@container (min-width: 38rem) {
  .pb-orbit { grid-row: 1 / span 4; align-self: start; }
  .pb-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .9rem; }
  .pb-foot { justify-content: flex-end; }
}
</style>
