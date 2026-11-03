<script setup lang="ts">
// نسخه‌ی کامپوننتیِ headline-w.svg: جمله‌های چرخان، کاملاً واکنش‌گرا، دوزبانه و هماهنگ با تم.
import { github } from '~/data/portfolio'

defineProps<{ href?: string }>()
const { t } = useLang()

const INTERVAL = 2600 // مثل SVG اصلی: ۱۳ ثانیه برای ۵ جمله
const phrases = computed(() => github.headline.map(t))
const active = ref(0)
const root = ref<HTMLElement>()

let paused = false
let inView = true
let timer: ReturnType<typeof setInterval> | undefined
let io: IntersectionObserver | undefined

onMounted(() => {
  timer = setInterval(() => {
    if (paused || !inView || document.hidden) return
    active.value = (active.value + 1) % phrases.value.length
  }, INTERVAL)
  io = new IntersectionObserver(([e]) => { inView = !!e?.isIntersecting })
  if (root.value) io.observe(root.value)
})
onBeforeUnmount(() => { clearInterval(timer); io?.disconnect() })
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    ref="root"
    class="banner-card hb"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    @mouseenter="paused = true" @mouseleave="paused = false"
    @focusin="paused = true" @focusout="paused = false"
  >
    <!-- متن کامل برای صفحه‌خوان و موتور جستجو؛ جمله‌های چرخان فقط تصویری هستند -->
    <span class="sr-only">{{ t(github.headlineAlt) }}</span>
    <span class="hb-stage" aria-hidden="true">
      <span v-for="(p, i) in phrases" :key="i" class="hb-line" :class="{ 'is-on': i === active }">{{ p }}</span>
    </span>
  </component>
</template>

<style scoped>
.hb-stage {
  display: grid; place-items: center;
  padding: clamp(1rem, 4.2cqw, 1.6rem) clamp(1rem, 4cqw, 2rem);
}
/* همه‌ی جمله‌ها در یک خانه‌ی گرید روی هم می‌نشینند؛ ارتفاع = بلندترین جمله، پس صفحه هنگام عوض شدن نمی‌پرد */
.hb-line {
  grid-area: 1 / 1;
  max-width: 100%;
  text-align: center; text-wrap: balance;
  font-weight: 700; line-height: 1.4; letter-spacing: -0.01em;
  font-size: clamp(0.95rem, 0.55rem + 2.6cqw, 1.65rem);
  opacity: 0; transform: translateY(0.45em); filter: blur(4px);
  transition: opacity .45s ease, transform .45s ease, filter .45s ease;
}
.hb-line.is-on { opacity: 1; transform: none; filter: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-line { transform: none; filter: none; transition: none; }
}
</style>
