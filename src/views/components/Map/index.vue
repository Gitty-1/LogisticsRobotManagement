<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';

const stageContainer = ref();

let stage: Stage, layer: Layer;
// 定义路径数组，每个路径包含一系列坐标点
let path = reactive([[]]);

const robot = ref('')
const robots = [
  {
    value: '机器人1',
    label: '机器人1'
  },
  {
    value: '机器人2',
    label: '机器人2'
  },
  {
    value: '机器人3',
    label: '机器人3'
  },
]
const paths = {
  '机器人1': [
      [100, 200],
      [200, 100],
      [300, 400],
      [550, 120],
      [600, 220],
      [730, 220],
      [800, 212],
      [1000, 60]
  ],
  '机器人2': [
      [50, 200],
      [130, 50],
      [240, 400],
      [430, 120],
      [700, 220],
      [860, 220],
      [980, 212],
      [1000, 160]
  ],
  '机器人3': [
      [30, 200],
      [120, 100],
      [230, 400],
      [430, 120],
      [580, 220],
      [860, 220],
      [910, 212],
      [1000, 260]
  ],
}

watch(() => robot.value, () => {
  // @ts-ignore
  path = paths[robot.value]
  init()
})

// onMounted(() => {
//   if(robot.value) {
//     console.log(1)
//     init();
//   }
// });

// onBeforeUnmount(() => {
//   stage.destroy();
// });

const init = () => {
  stage = new Konva.Stage({
    container: stageContainer.value,
    width: 1200,
    height: 450,
    antialias: true,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  // 创建多个长方形
  createRectangles();

  // 绘制路径线
  drawPath(path);

  // 创建图标
  const icon = createNode(path[0][0], path[0][1]);

  // 开始动画，按路径上的每个点移动
  animateIcon(icon, path);

  // 在路径上的每个转折点显示小圆圈和坐标信息
  for (let i = 0; i < path.length; i++) {
    createPointCircle(path[i][0], path[i][1], i + 1);
  }
};

// 创建图标
const createNode = (x: number, y: number) => {
  const group = new Konva.Group({
    x: x,
    y: y,
  });

  const rect = new Konva.Rect({
    x: -10,
    y: -15,
    width: 25,
    height: 10,
    fill: 'black'
  })
  group.add(rect)

  const circle1 = new Konva.Circle({
    x: -5,
    y: 0,
    radius: 5,
    fill: 'black',
  });
  group.add(circle1);

  const circle2 = new Konva.Circle({
    x: 10,
    y: 0,
    radius: 5,
    fill: 'black',
  });
  group.add(circle2);

  layer.add(group);
  return group;
};

// 创建路径上的每个转折点的小圆圈和坐标信息
const createPointCircle = (x: number, y: number, index: number) => {
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 5,
    fill: 'green',
  });
  layer.add(circle);

  const text = new Konva.Text({
    x: x + 10,
    y: y - 10,
    text: `(${x},${y})`,
    fontSize: 12,
    fill: 'black',
  });
  layer.add(text);
};

// 绘制路径
const drawPath = (path: Array<Array<number>>) => {
  const line = new Konva.Line({
    points: path.flat(),
    stroke: 'red',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  });
  layer.add(line);
};

// 图标按路径移动的动画
const animateIcon = (icon: any, path: any) => {
  const moveToNextPoint = (currentIndex: any) => {
    if (currentIndex >= path.length) {
      return;
    }

    const [x, y] = path[currentIndex];
    const tween = new Konva.Tween({
      node: icon,
      x: x,
      y: y,
      duration: 5, // 增加持续时间以减慢动画速度
      easing: Konva.Easings.Linear,
      onFinish: () => {
        moveToNextPoint(currentIndex + 1);
      },
    });

    tween.play();
  };

  // 从第一个点开始
  moveToNextPoint(1); // 从索引1开始，因为起点已经是索引0
};

// 创建长方形
const createRectangle = (x: number, y: number) => {
  const rect = new Konva.Rect({
    x: x,
    y: y,
    width: 30,
    height: 50,
    fill: 'blue',
    tooltip: '长方形'
  });
  layer.add(rect);
  return rect;
};

// 创建多个长方形
const rectangles = [
  [1000, 50],
  [1000, 150],
  [1000, 250],
  [1000, 350],
  [1100, 50],
  [1100, 150],
  [1100, 250],
  [1100, 350],

]
const createRectangles = () => {
  for (let i = 0; i < rectangles.length; i++) {
    createRectangle(rectangles[i][0], rectangles[i][1]);
  }
};

</script>

<template>
  <div class="map-select">
    <span>请选择一个机器人</span>
    <el-select v-model="robot" placeholder="请选择机器人" size="large">
      <el-option v-for="item in robots" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div id="stage" ref="stageContainer"></div>
</template>

<style scoped>
#stage {
  border: 1px solid black;
}
.map-select {
  height: calc(10vh);
  padding: 20px;
}
.map-select span {
  font-weight: bold;
  margin-right: 20px;
}
</style>