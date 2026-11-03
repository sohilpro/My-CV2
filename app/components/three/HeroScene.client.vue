<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = '/models/hero.glb' // اختیاری: اگر فایل بود، جای گوی را می‌گیرد
const canvas = ref<HTMLCanvasElement>()
const theme = useTheme()
let cleanup = () => {}

const vert = /* glsl */ `
  uniform float uTime;
  varying vec3 vN; varying vec3 vV; varying float vH;
  void main() {
    vec3 n0 = normalize(normal);
    float hh = (sin(position.x*1.8+uTime) + sin(position.y*2.1+uTime*1.3) + sin(position.z*1.6+uTime*.8)) * .11;
    vec3 dh = vec3(1.8*cos(position.x*1.8+uTime), 2.1*cos(position.y*2.1+uTime*1.3), 1.6*cos(position.z*1.6+uTime*.8)) * .11;
    vec3 n = normalize(n0 - (dh - dot(dh, n0) * n0));
    vec4 mv = modelViewMatrix * vec4(position + n0 * hh, 1.);
    vN = normalize(normalMatrix * n); vV = -mv.xyz; vH = hh;
    gl_Position = projectionMatrix * mv;
  }`
const frag = /* glsl */ `
  uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
  varying vec3 vN; varying vec3 vV; varying float vH;
  void main() {
    vec3 n = normalize(vN); vec3 v = normalize(vV);
    float fres = pow(1. - max(dot(n, v), 0.), 2.5);
    float k = n.y * .5 + .5 + vH * 1.5;
    vec3 col = mix(uA, uB, smoothstep(0., .7, k));
    col = mix(col, uC, smoothstep(.6, 1., k));
    vec3 l = normalize(vec3(.5, .8, .6));
    float spec = pow(max(dot(reflect(-l, n), v), 0.), 48.);
    col += fres * uC * 1.1 + spec * .7;
    gl_FragColor = vec4(col, 1.);
    #include <colorspace_fragment>
  }`

function softTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

onMounted(() => {
  const el = canvas.value!
  // موبایل/تاچ: مش سبک‌تر و pixel ratio کمتر (۸۴هزار مثلث در هر فریم برای گوشی سنگین است)
  const light = matchMedia('(pointer: coarse)').matches || innerWidth < 768
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: !light })
  renderer.setPixelRatio(Math.min(devicePixelRatio, light ? 1.5 : 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
  camera.position.z = 7.5

  // نور (برای مدل GLB)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444466, 1.6))
  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.set(3, 4, 5)
  scene.add(sun)

  const stage = new THREE.Group()
  scene.add(stage)

  // گوی مایع
  const orbMat = new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: { uTime: { value: 0 }, uA: { value: new THREE.Color() }, uB: { value: new THREE.Color() }, uC: { value: new THREE.Color() } }
  })
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, light ? 28 : 64), orbMat)
  stage.add(orb)

  // حلقه‌های مداری با گره‌ی نورانی
  const rings = [
    { r: 2.6, rot: [1.2, 0.2, 0], speed: 0.6, color: 0x22d3ee },
    { r: 2.9, rot: [0.5, 0.9, 0.3], speed: -0.45, color: 0xa78bfa },
    { r: 3.2, rot: [-0.8, 0.4, 1.0], speed: 0.3, color: 0xf472b6 }
  ].map((cfg) => {
    const g = new THREE.Group()
    g.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2])
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(cfg.r, 0.006, 8, 240),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.45 })
    ))
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), new THREE.MeshBasicMaterial({ color: cfg.color }))
    g.add(node)
    stage.add(g)
    return { ...cfg, node }
  })

  // هاله‌ی نور پشت گوی + ذرات نرم
  const tex = softTexture()
  const glowMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
  const glow = new THREE.Sprite(glowMat)
  glow.scale.setScalar(9)
  glow.position.z = -1.5
  scene.add(glow)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(900 * 3).map(() => (Math.random() - 0.5) * 14), 3))
  const starMat = new THREE.PointsMaterial({ size: 0.12, map: tex, transparent: true, depthWrite: false })
  const stars = new THREE.Points(geo, starMat)
  scene.add(stars)

  // مدل GLB اختیاری (فایل فعلی public/models/hero.glb خالی است، پس فقط اگر واقعاً فایل بود بارگذاری می‌شود)
  let disposed = false
  fetch(MODEL_URL).then((r) => (r.ok ? r.arrayBuffer() : null)).then((buf) => {
    // GLB واقعی حداقل هدر ۱۲ بایتی دارد؛ فایل خالی/نامعتبر نادیده گرفته می‌شود
    if (!buf || buf.byteLength < 12 || disposed) return
    new GLTFLoader().parse(buf, '', (gltf) => {
      if (disposed) return
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      model.position.sub(box.getCenter(new THREE.Vector3()))
      const holder = new THREE.Group()
      holder.add(model)
      holder.scale.setScalar(4.5 / box.getSize(new THREE.Vector3()).length())
      stage.remove(orb)
      orb.geometry.dispose()
      stage.add(holder)
      renderOnce()
    }, () => {})
  }).catch(() => {})

  // رنگ‌ها بر اساس تم
  const stopTheme = watch(theme, () => {
    const d = theme.value === 'dark'
    orbMat.uniforms.uA.value.set(d ? 0x1e1b4b : 0x5b21b6)
    orbMat.uniforms.uB.value.set(d ? 0x7c3aed : 0xa78bfa)
    orbMat.uniforms.uC.value.set(d ? 0x22d3ee : 0x06b6d4)
    const blend = d ? THREE.AdditiveBlending : THREE.NormalBlending
    starMat.color.set(d ? 0xa5b4fc : 0x7c3aed)
    starMat.blending = blend
    starMat.needsUpdate = true
    glowMat.color.set(d ? 0x7c3aed : 0xc4b5fd)
    glowMat.opacity = d ? 0.6 : 0.5
    glowMat.blending = blend
    glowMat.needsUpdate = true
  }, { immediate: true })

  const mouse = { x: 0, y: 0 }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    mouse.x = (e.clientX / innerWidth - 0.5) * 2
    mouse.y = (e.clientY / innerHeight - 0.5) * 2
  }
  const clock = new THREE.Clock()
  let raf = 0
  let running = false
  let inView = true

  const frame = () => {
    const t = clock.getElapsedTime()
    orbMat.uniforms.uTime.value = t
    stage.rotation.y = t * 0.12
    stage.rotation.x += (mouse.y * 0.35 - stage.rotation.x) * 0.05
    stage.position.x += (mouse.x * 0.4 - stage.position.x) * 0.05
    stage.position.y = Math.sin(t * 0.8) * 0.12
    rings.forEach((r) => {
      const a = t * r.speed * 2
      r.node.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0)
    })
    stars.rotation.y = t * 0.02
    renderer.render(scene, camera)
  }
  const loop = () => { frame(); raf = requestAnimationFrame(loop) }
  const renderOnce = () => { if (!running) frame() }
  // وقتی گوی خارج از دید است یا تب پنهان است، رندر متوقف می‌شود (باتری/CPU)
  const sync = () => {
    const want = inView && !document.hidden && !reduceMotion
    if (want && !running) { running = true; clock.start(); loop() }
    else if (!want && running) { running = false; cancelAnimationFrame(raf) }
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = el.parentElement!
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // پرتره‌ی باریک: کمی عقب‌تر تا حلقه‌ها بریده نشوند
    camera.position.z = camera.aspect < 1 ? 7.5 / Math.max(camera.aspect, 0.72) * 0.9 : 7.5
    camera.updateProjectionMatrix()
    renderOnce()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el.parentElement!)
  const io = new IntersectionObserver(([e]) => { inView = !!e?.isIntersecting; sync() })
  io.observe(el)
  addEventListener('pointermove', onMove)
  document.addEventListener('visibilitychange', sync)
  resize()
  sync()
  if (reduceMotion) renderOnce()

  cleanup = () => {
    disposed = true
    running = false
    cancelAnimationFrame(raf)
    stopTheme()
    ro.disconnect()
    io.disconnect()
    removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', sync)
    scene.traverse((o) => {
      const m = o as THREE.Mesh
      m.geometry?.dispose?.()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      ;(Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose())
    })
    tex.dispose()
    renderer.dispose()
  }
})
onBeforeUnmount(() => cleanup())
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />
</template>