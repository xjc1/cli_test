<template>
  <div class="oval">
    <div class="ellipse-container"></div>
  </div>
</template>
<script setup>
import { defineOptions, onMounted } from 'vue';

defineOptions({
  name: 'Oval',
});
onMounted(() => {
  init();
});
function init() {
  const container = document.getElementsByClassName('ellipse-container')[0];
  console.log('container', container);
  const a = 150; // 椭圆的长半轴
  const b = 100; // 椭圆的短半轴
  const elementsCount = 6; // 元素数量

  for (let i = 0; i < elementsCount; i++) {
    const angle = (i / elementsCount) * 2 * Math.PI; // 计算角度
    const x = a * Math.cos(angle) + a; // 计算元素的 x 位置
    const y = b * Math.sin(angle) + b; // 计算元素的 y 位置

    const element = document.createElement('div');
    element.className = 'circle';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    container.appendChild(element);
  }
}
</script>

<style lang="scss" scoped>
.oval {
  .ellipse-container {
    position: relative;
    width: 300px;
    height: 200px;
    border: 1px solid #000;
    overflow: hidden;

    .circle {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: red;
      border-radius: 50%;
    }
  }

}
</style>
