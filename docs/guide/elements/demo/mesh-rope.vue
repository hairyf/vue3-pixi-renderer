<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const ropeLength = 918 / 20

let count = 0
const points = ref<{ x: number; y: number }[]>([])

for (let i = 0; i < 20; i++)
  points.value.push({ x: i * ropeLength, y: 0 })

onTick(() => {
  count += 0.1
  for (let i = 0; i < points.value.length; i++) {
    points.value[i].y = Math.sin((i * 0.5) + count) * 30
    points.value[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20
  }
})
</script>

<template>
  <mesh-rope
    texture="/assets/snake.png"
    :x="20"
    :y="120"
    :scale="0.4"
    :points="points"
  />
</template>
