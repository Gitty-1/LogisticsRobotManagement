<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import { getRandomColor } from '@/utils/randomColor'

const stageContainer = ref()

let stage: Stage, layer: Layer
// 定义路径数组，每个路径包含一系列坐标点
const paths = reactive([
    [100, 200],
    [500, 200]
])
const pathColors = [
  getRandomColor(),
  getRandomColor()
]
let timeout: number | undefined

onMounted(() => {
  init()
});

onBeforeUnmount(() => {
  console.log('id')
  stage.destroy()
  clearTimeout(timeout)
})

const init = () => {
  stage = new Konva.Stage({
    container: stageContainer.value,
    width: 1200,
    height: 450,
    antialias: true
  });

  layer = new Konva.Layer();
  stage.add(layer);

  paths.forEach((path, index) => {

    const icon = createNode(path[0], path[1])

    toolTip(icon, index)

    // 监听容器的点击事件，调用 addPoint 方法
    addPoint(path[0], path[1], path, index)

    animationStart(icon, path, index)
    
    
  });
}
// 创建图标
const createNode = (x: number, y: number) => {
  const icon = new Konva.Rect({
    x: x,
    y: y,
    width: 10,
    height: 10,
    fill: getRandomColor()
  });
  layer.add(icon);
  return icon
}
// 绘制路径
const drawPath = (path: Array<number>, pathColor: string) => {
  const line = new Konva.Line({
    points: path,
    stroke: pathColor,
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round'
  });
  layer.add(line);
}
// 创建信息提示框
const toolTip = (icon: any, index: number) => {
  // 创建信息展示框
  const tooltip = new Konva.Label({
    x: 0,
    y: 0,
    opacity: 0
  });
  tooltip.add(new Konva.Tag({
    fill: 'skyblue',
    pointerDirection: 'down',
    pointerWidth: 10,
    pointerHeight: 10,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10
  }));

  const information = `货物${index + 1}`

  tooltip.add(new Konva.Text({
    text: information,
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black'
  }));
  layer.add(tooltip);

  // 鼠标悬停显示信息
  icon.on('mouseover', () => {
    tooltip.position({
      x: icon.x() + 30,
      y: icon.y() - 30
    });
    tooltip.opacity(1);
    layer.batchDraw();
  });

  // 鼠标移开隐藏信息
  icon.on('mouseout', () => {
    tooltip.opacity(0);
    layer.batchDraw();
  });

}
// 动态增加路径坐标点，同时更新路径
const addPoint = (offsetX: number, offsetY: number, path: Array<number>, index: number) => {
  path.push(offsetX, offsetY); // 在路径坐标数组中添加新的坐标点

  // 更新路径的坐标点
  // @ts-ignore
  layer.findOne('.konvajs-content')?.destroy()

  drawPath(path, pathColors[index])

  stage.batchDraw();
};
// 绘制动画
const animationStart = (icon: any, path: any, index: number) => {

  // 动画
  const animation = new Konva.Animation((frame: any) => {
    animation.stop();
    icon.position({ x: path[path.length - 2], y: path[path.length - 1] });
    timeout = setTimeout(() => {
      addPoint(path[path.length - 2] + 1, path[path.length - 1] - 1, path, index)
      animation.start()
    }, 500)
  }, layer);

  animation.start();
}
</script>
<template>
  <el-button type="primary" @click="init">刷新</el-button>
  <div id="stage" ref="stageContainer"></div>
</template>
<style scoped>
#stage {
  border: 1px solid black;
}
</style>