<template>
  <!-- 1. 全屏背景容器 -->
  <div class="relative w-full min-h-screen flex items-center justify-center font-fredoka text-gray-800 bg-gray-900 py-10 px-4 overflow-x-hidden">
    
    <!-- A. 动态背景 -->
    <div class="fixed inset-0 z-0 animate-slow-zoom">
      <img 
        src="https://api.paugram.com/wallpaper/?source=sina" 
        class="w-full h-full object-cover"
        alt="Anime Background"
      />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
    </div>

    <!-- B. 樱花特效 -->
    <Sakura />

    <!-- C. Bento Grid 布局容器 -->
    <div class="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 animate-enter">
      
      <!-- ================= 卡片 1: 个人信息主卡 (2x2) ================= -->
      <div 
        ref="card1"
        class="tilt-card md:col-span-2 md:row-span-2 bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center group"
        data-tilt data-tilt-max="5" data-tilt-glare data-tilt-max-glare="0.3"
      >
        <div class="relative w-32 h-32 mb-4 transform-style-3d">
          <div class="absolute inset-0 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full animate-spin-slow opacity-70 blur-md"></div>
          <img 
            src="https://avatars.githubusercontent.com/u/93857159?v=4" 
            class="relative w-full h-full rounded-full border-[3px] border-white shadow-lg object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Avatar" 
          />
          <div class="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-4 border-white rounded-full animate-pulse"></div>
        </div>
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
          Jiuxina
        </h1>
        <p class="text-gray-500 text-sm font-medium mb-4">全栈练习生 / 二次元爱好者</p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="px-3 py-1 text-xs bg-pink-100 text-pink-600 rounded-full border border-pink-200 font-bold">Otaku</span>
          <span class="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full border border-indigo-200 font-bold">INFJ</span>
        </div>
      </div>

      <!-- ================= 卡片 2: 时间 (1x1) ================= -->
      <div 
        ref="card2"
        class="tilt-card bg-black/60 backdrop-blur-md border border-white/20 p-5 rounded-3xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden"
        data-tilt
      >
         <div class="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 blur-[40px] opacity-40"></div>
         <div>
           <p class="text-xs text-gray-300 uppercase tracking-wider">Local Time</p>
           <h2 class="text-2xl font-mono font-bold mt-1">{{ timeString }}</h2>
         </div>
         <div class="flex items-end justify-between mt-2">
           <div class="text-xs text-gray-400">{{ dateString }}</div>
           <div class="i-heroicons-sun-solid text-3xl text-yellow-400 animate-pulse-slow"></div>
         </div>
      </div>

      <!-- ================= 卡片 3: 语录 (1x1) - 修复版 ================= -->
      <div 
        ref="card3"
        class="tilt-card bg-white/80 backdrop-blur-md border border-white/50 p-4 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden"
        data-tilt
      >
        <div class="absolute top-0 left-2 text-4xl text-pink-200 font-serif opacity-50">“</div>
        <div class="flex-1 flex items-center justify-center w-full">
            <!-- 修复点：改用 text-sm，leading-relaxed 增加行距，break-words 防止长单词撑开 -->
            <p v-if="pending" class="text-center text-gray-400 text-xs">加载中...</p>
            <p v-else class="text-center text-gray-700 text-sm font-medium leading-relaxed break-words px-1">
            {{ quote?.hitokoto || 'Loading...' }}
            </p>
        </div>
        <p v-if="quote?.from" class="text-right text-[10px] text-pink-500 font-bold mt-1 truncate w-full">—— {{ quote.from }}</p>
      </div>

      <!-- ================= 卡片 4: 音乐播放器 (2x1) ================= -->
      <div 
        ref="card4"
        class="tilt-card md:col-span-2 bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl shadow-xl overflow-hidden flex flex-col"
        data-tilt data-tilt-scale="1.01"
      >
        <ClientOnly>
            <meting-js
                server="tencent"
                type="playlist"
                id="8619906046"
                autoplay="true"
                order="list"
                loop="all"
                preload="auto"
                list-folded="false"
                list-max-height="140px"
                theme="#2980b9"
            ></meting-js>
        </ClientOnly>
      </div>

      <!-- ================= 卡片 5 & 6: 链接 (修复版 - 字体变大) ================= -->
      <a 
        href="https://github.com/jiuxina/" target="_blank" ref="card5"
        class="tilt-card bg-gray-800 text-white p-4 rounded-3xl shadow-xl flex flex-col items-center justify-center hover:bg-gray-700 transition-colors group cursor-pointer"
        data-tilt
      >
        <div class="i-carbon-logo-github text-5xl mb-3 group-hover:scale-110 transition-transform"></div>
        <!-- 修复点：字体从 text-xs 改为 text-lg font-bold -->
        <span class="text-lg font-bold tracking-wide">GitHub</span>
      </a>

      <div 
        ref="card6"
        class="tilt-card bg-pink-400 text-white p-4 rounded-3xl shadow-xl flex flex-col items-center justify-center hover:bg-pink-500 transition-colors group cursor-pointer"
        data-tilt
        role="button"
        tabindex="0"
        @click="openTip"
        @keyup.enter="openTip"
      >
        <div class="i-simple-icons-bilibili text-4xl mb-3 group-hover:rotate-12 transition-transform"></div>
        <!-- 修复点：字体从 text-xs 改为 text-lg font-bold -->
        <span class="text-lg font-bold tracking-wide">Bilibili</span>
      </div>

      <!-- ================= 卡片 7: 项目 ================= -->
      <a 
        href="https://www.00000721.xyz/" target="_blank" ref="card7"
        class="tilt-card md:col-span-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between group cursor-pointer overflow-hidden"
        data-tilt
      >
        <div class="z-10">
          <h3 class="text-xl font-bold mb-1 flex items-center gap-2">
            My Projects
            <div class="i-heroicons-arrow-up-right-20-solid text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></div>
          </h3>
          <p class="text-xs text-blue-100">点击查看我的个人项目展示 (Cloud)</p>
        </div>
        <div class="i-carbon-cloud-service-management text-8xl opacity-20 absolute -right-4 -bottom-4 rotate-12 group-hover:scale-110 transition-transform"></div>
      </a>
    </div>

    <!-- 非模态提示 -->
    <Transition name="fade">
      <div
        v-if="showTip"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-pink-600 font-bold px-4 py-2 rounded-full shadow-xl border border-pink-200 z-50"
      >
        不给看~
      </div>
    </Transition>

    <!-- 底部版权 -->
    <div class="fixed bottom-2 w-full text-center text-white/50 text-[10px] z-10">
      © 2025 Jiuxina | Powered by Nuxt 3
    </div>

  </div>
</template>

<script setup>
import VanillaTilt from 'vanilla-tilt'

// 1. 头部配置
useHead({
  title: 'Jiuxina の 空间',
  link: [{ rel: 'icon', href: 'https://avatars.githubusercontent.com/u/93857159?v=4' }]
})

// 2. API 数据
const { data: quote, pending } = await useFetch('https://v1.hitokoto.cn?c=a&c=b')

// 3. 时间逻辑
const timeString = ref('')
const dateString = ref('')
const updateTime = () => {
  const now = new Date()
  timeString.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  dateString.value = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

// 4. 初始化 Tilt
const card1 = ref(null); const card2 = ref(null); const card3 = ref(null);
const card4 = ref(null); const card5 = ref(null); const card6 = ref(null); const card7 = ref(null);

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  
  const cards = [card1.value, card2.value, card3.value, card4.value, card5.value, card6.value, card7.value]
  VanillaTilt.init(cards.filter(Boolean), {
    max: 10, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02
  })
})

// 5. 非模态提示逻辑
const showTip = ref(false)
let tipTimer = null
const openTip = () => {
  showTip.value = true
  if (tipTimer) clearTimeout(tipTimer)
  tipTimer = setTimeout(() => { showTip.value = false }, 2000)
}

onBeforeUnmount(() => {
  if (tipTimer) clearTimeout(tipTimer)
})
</script>

<style>
.font-fredoka { font-family: 'Fredoka', sans-serif; }
@keyframes slowZoom { 0%, 100% { transform: scale(1.1); } 50% { transform: scale(1.2); } }
.animate-slow-zoom { animation: slowZoom 20s ease-in-out infinite alternate; }
@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spinSlow 10s linear infinite; }
@keyframes slideUpFade { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
.animate-enter { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes pulseSlow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.9); } }
.animate-pulse-slow { animation: pulseSlow 3s infinite; }

/* 覆盖 APlayer 的部分样式 */
.aplayer {
  margin: 0 !important; 
  border-radius: 0 !important; 
  box-shadow: none !important;
  background: transparent !important;
}
.aplayer .aplayer-body {
  background-color: transparent !important;
}
.aplayer .aplayer-list ol li {
  border-top: 1px solid #f0f0f0;
}
.aplayer .aplayer-list ol li:hover {
  background: #fcfcfc;
}

/* Toast 动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>