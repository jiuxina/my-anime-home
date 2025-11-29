<template>
  <canvas ref="canvasRef" class="absolute inset-0 z-1 pointer-events-none"></canvas>
</template>

<script setup>
const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const sakuras = []
  const total = 50 // 樱花数量，嫌多改小，嫌少改大

  class Sakura {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 15 + 9
      this.speedX = Math.random() * 2 - 1
      this.speedY = Math.random() * 1.5 + 1.5
      this.rotation = Math.random() * 360
      this.rotationSpeed = Math.random() * 2 - 1
      // 樱花花瓣图片 (Base64，减少请求)
      this.img = new Image()
      this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAzgAAAM4BdQrRYgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJSURBVFiF7ZdLSFtRGIafm0u04qKVUuhCq1zouqmFkhZ0I0QhhRB00U0hCLpS6TIdtIUbC4Ug1I1C6aaLoBvxLkQLLV2oQsFCoZsiskjR4r3/d4c5cWJt4uWc5H+X3znf/8855zvnfEcYGxujiGq12iAiY0TkF5H3IrIuIsvW2rGIpE1jRGSbiHwTkQ8islCtVq+LyBhF9Ho9isgHEfkqIktE5D0R+Swiy9baS03Q6/W4iHwSkS8islStVj+LyDiF9Ho9isg3Efnq/7W2XkQ+i8iStfa2CRqNxiAR+SIiX/z/70Xkk4i8stb+NAEAdF0fNca0G2PajDGdxtgOY0yHMaZhjOkwxrRba88Mw3jVBD09PYM45w7OuQ7OuQ7OuQ7O+Q7OuQ7OuQ7O+S7O+b619rYJstnscRzHCBzHCDiOEXAcI+A4RsBxjIDjGAHHMQKOYwQcxwg4jhFwHCPgOEbAcYyA4xgBxzECjmMEHMcIOI4RaDabX5qg0Wj045x7OOceznkP57yHc97DOe/hnPdwzns45z2c8x7OeY+19k4TZLPZEziO23AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ3AcJ/D/BHwG/gJ/gT/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gD/AH+AP8Af4A/wB/gB/gL8/c7/XWn53uGAAAAAASUVORK5CYII='
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.rotation += this.rotationSpeed

      if (this.y > canvas.height) {
        this.y = -this.size
        this.x = Math.random() * canvas.width
      }
      if (this.x > canvas.width) this.x = -this.size
      if (this.x < -this.size) this.x = canvas.width
    }

    draw() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation * Math.PI / 180)
      ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size)
      ctx.restore()
    }
  }

  // 初始化樱花
  for (let i = 0; i < total; i++) sakuras.push(new Sakura())

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    sakuras.forEach(s => {
      s.update()
      s.draw()
    })
    requestAnimationFrame(animate)
  }

  // 图片加载完成后开始动画
  const tempImg = new Image()
  tempImg.src = sakuras[0].img.src
  tempImg.onload = () => animate()

  // 窗口大小改变适应
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
})
</script>