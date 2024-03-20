<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Konva from 'konva';

const stageContainer = ref()
onMounted(() => {
  init()
});

const paths = ref([])

const init = () => {
  const stage = new Konva.Stage({
    container: stageContainer.value,
    width: 1200,
    height: 450
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // 定义路径数组，每个路径包含一系列坐标点
  const paths = [
    [100, 100, 100, 200, 200, 200],
    [100, 100, 300, 350, 400, 400],
  ];

  // 绘制路径
  paths.forEach((points, index) => {
    const line = new Konva.Line({
      points: points,
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    layer.add(line);
    // 创建图标
    const icon = new Konva.Rect({
      x: 100,
      y: 200,
      width: 10,
      height: 10,
      fill: 'red'
    });
    layer.add(icon);

    const information = `货物${index + 1}`

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


    // 计算路径总长度
    let totalLength = 0;
    for (let i = 0; i < points.length - 2; i += 2) {
      totalLength += Math.sqrt(Math.pow(points[i + 2] - points[i], 2) + Math.pow(points[i + 3] - points[i + 1], 2));
    }

    // 设置动画持续时间为 5 秒
    const duration = 5000;
    const speed = totalLength / duration;

    // 动画
    let pos = 0
    const animation = new Konva.Animation((frame: any) => {
      pos += speed * frame.timeDiff / 10
      if (pos >= totalLength) {
        animation.stop();
        icon.position({ x: points[points.length - 2], y: points[points.length - 1] });
      } else {
        let currentPos = 0;
        let segLength = 0;
        for (let i = 0; i < points.length - 2; i += 2) {
          const dx = points[i + 2] - points[i];
          const dy = points[i + 3] - points[i + 1];
          segLength = Math.sqrt(dx * dx + dy * dy);
          if (currentPos + segLength >= pos) {
            const t = (pos - currentPos) / segLength;
            icon.position({
              x: points[i] + dx * t,
              y: points[i + 1] + dy * t
            });
            break;
          }
          currentPos += segLength;
        }
      }
    }, layer);

    animation.start();
  });
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