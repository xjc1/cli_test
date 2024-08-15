<template>
  <div class="container" ref="container">
  </div>
</template>
<script setup>
import { defineOptions, onMounted, ref } from 'vue';
import { Graph } from '@antv/x6';

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 20,
      y: 30,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: 'gray',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 220,
      y: 0,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node3',
      shape: 'rect',
      x: 220,
      y: 60,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node4',
      shape: 'rect',
      x: 220,
      y: 120,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node5',
      shape: 'rect',
      x: 420,
      y: 30,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
    {
      shape: 'edge',
      source: 'node1',
      target: 'node3',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
    {
      shape: 'edge',
      source: 'node1',
      target: 'node4',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
    {
      shape: 'edge',
      source: 'node2',
      target: 'node5',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
    {
      shape: 'edge',
      source: 'node3',
      target: 'node5',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
    {
      shape: 'edge',
      source: 'node4',
      target: 'node5',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
};

defineOptions({
  name: 'TEST',
});
const container = ref();
onMounted(() => {
  const graph = new Graph({
    container: container.value,
    width: 800,
    height: 600,
    background: {
      color: '#F2F7FA',
    },
  });

  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示
});
</script>
<style lang="scss">
.container{

}
</style>
