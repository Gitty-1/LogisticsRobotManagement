<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import { getRobotPath, getRobotList, getMap } from '@/api/map'
import type { RobotType } from './type';

onBeforeMount(async () => {
  // 获取机器人列表
  const res = await getRobotList()
  const { data } = res
  robots.value = data

  // 获取地图数据
  const res2 = await getMap()
  map.value = res2.data.shelfPositionList
  console.log('map', map.value)
})

const stageContainer = ref();

const currentPath = ref([])

let stage: Stage, layer: Layer;
// 定义路径数组，每个路径包含一系列坐标点
let path = reactive([[]]);

const robot = ref<number>()
const robots = ref<RobotType[]>()

const map = ref()

const initData = async () => {
  // @ts-ignore
  const res = await getRobotPath(robot.value)
  const { data } = res
  currentPath.value = data.path

  // @ts-ignore
  currentPath.value = currentPath.value.reverse()
  currentPath.value.map((item: any, index: number) => {
    if(index % 5 === 0) {
      item.positionX *= 500
      item.positionY *= 300
      item.positionX += 5*index
      //@ts-ignore
      path.push([item.positionX, item.positionY])
      if(index === currentPath.value.length - 1 && index % 5 !==0){
        //@ts-ignore
        path.push([item.positionX, item.positionY])
      }
    }
  })

  init()

}

watch(() => robot.value, () => {
  initData()
})

const init = () => {



  stage = new Konva.Stage({
    container: stageContainer.value,
    width: 1200,
    height: 500,
    antialias: true,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  // 创建多个长方形
  createRectangles();

  // 绘制路径线
  drawPath(path);

  // 创建图标
  path = path.slice(1)
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
const createRectangle = (item: any) => {
  // 创建一个组
  const group = new Konva.Group({
    x: item.positionX * 5,
    y: item.positionY * 5,
  });

  // 创建矩形并添加到组中
  const rect = new Konva.Rect({
    width: 35,
    height: 50,
    fill: 'blue',
  });
  group.add(rect);

  // 创建文本并添加到组中
  const text = new Konva.Text({
    text: item.name,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'white',
    x: 0, // 根据需要调整文本位置
    y: 25, // 根据需要调整文本位置
  });
  group.add(text);

  // 将组添加到舞台
  layer.add(group);
};

// 创建多个长方形
const createRectangles = () => {
  for (let i = 0; i < map.value.length; i++) {
    createRectangle(map.value[i]);
  }
};

</script>

<template>
  <div class="map-select">
    <span>请选择一个机器人</span>
    <el-select v-model="robot" placeholder="请选择机器人" size="large">
      <el-option v-for="item in robots" :key="item.robotId" :label="item.robotName" :value="item.robotId"></el-option>
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