export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | undefined
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, { value }) {
      io ??= new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io!.unobserve(e.target) }
        })
      }, { threshold: 0.15 })
      el.classList.add('reveal')
      if (value) el.style.transitionDelay = `${value}ms`
      io.observe(el)
    },
    unmounted(el: HTMLElement) { io?.unobserve(el) },
    // کلاس reveal از همان رندر سرور اعمال می‌شود؛ قبلاً محتوا اول دیده می‌شد، بعد هنگام hydrate پنهان و دوباره ظاهر می‌شد (پرش)
    getSSRProps: (binding) => ({
      class: 'reveal',
      ...(binding.value ? { style: { transitionDelay: `${binding.value}ms` } } : {})
    })
  })
})
