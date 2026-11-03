<script setup lang="ts">
const card = ref<HTMLElement>()
const style = ref('')
let canTilt = false

// روی تاچ و برای کاربرانی که حرکت کم را خواسته‌اند، تیلت غیرفعال است
onMounted(() => {
  canTilt = matchMedia('(hover: hover) and (pointer: fine)').matches
    && !matchMedia('(prefers-reduced-motion: reduce)').matches
})

function move(e: PointerEvent) {
  if (!canTilt || e.pointerType !== 'mouse' || !card.value) return
  const r = card.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  style.value = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`
}
const reset = () => (style.value = '')
</script>

<template>
  <div ref="card" class="glass p-5 transition-transform duration-200 will-change-transform hover:border-violet/50 sm:p-6"
       :style="{ transform: style }" @pointermove="move" @pointerleave="reset">
    <slot />
  </div>
</template>
