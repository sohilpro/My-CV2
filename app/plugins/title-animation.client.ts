export default defineNuxtPlugin(() => {
  // کاراکترهای نامرئی (⁮) در آرایه‌ی قبلی هیچ اثری نداشتند، حذف شدند
  const text = 'Sohil_Pro'
  const STEP = 250          // میلی‌ثانیه
  const HOLD = 6            // چند فریم بعد از تایپ کامل صبر کند
  let i = 0

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return // کاربرانی که حرکت کم خواسته‌اند: تایتل ثابت

  setInterval(() => {
    i = (i + 1) % (text.length + HOLD)
    const shown = text.slice(0, Math.min(i, text.length))
    document.title = `${shown}${i % 2 ? '_' : '.'}`   // مکان‌نمای چشمک‌زن
  }, STEP)
})