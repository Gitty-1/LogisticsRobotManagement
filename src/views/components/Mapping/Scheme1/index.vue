<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import robotCar from '@/assets/robotCar.png'
import armsRobot from '@/assets/armsRobots.png'
import shelf from '@/assets/shelf.png'
import goods from '@/assets/goods.png'
import { getRobotCar, getArmsRobot, getArmsRobot2 } from './api';
import type { RobotType } from './type';

onBeforeMount(() => {
    initData()
})

const stageContainer = ref();

const currentPath = ref([])
const currentPath2 = ref([])
const currentPath3 = ref([])

const robot1 = ref<RobotType>()
const robot2 = ref<RobotType>()

const currentRobot = ref<RobotType>()

let stage: Stage, layer: Layer;
// 定义路径数组，每个路径包含一系列坐标点
let path = reactive([[]])
let path2 = reactive([[]])
let path3 = reactive([[]])

// 第一种方案
const isGetGoodsFinish = ref<Boolean>(false)
const isLoadFinish = ref<Boolean>(false)
const isShlefFinish = ref<Boolean>(false)

const step = ref<number>(0)
const imageSrc = ref()
const goodsIcon = ref()

const taskProgress = ref<string>()

type numStrKey = Record<number, string>
const robotsType: numStrKey = {
  1: '装载机器人',
  2: '带臂装载机器人',
  3: '机械臂'
}




watch(() => isGetGoodsFinish.value, (value) => {
  if(value) {
    // 货物搬运完成，返回
    animation(path.slice().reverse())
    goodsIcon.value = createGoods(path[path.length - 1][0], path[path.length - 1][1])
    // 开始装载
    imageSrc.value = armsRobot
    currentRobot.value = robot2.value
    animation(path2)
  }
})

watch(() => isLoadFinish.value, (value) => {
  if(value) {
    // 运输
    goodsIcon.value.remove()

    imageSrc.value = armsRobot
    animation(path3)
  }
})


watch(() => isShlefFinish.value, (value) => {
  if(value) {
    goodsIcon.value = createGoods(path3[path3.length - 1][0], path3[path3.length - 1][1])
    const reversePath = [...path3.slice().reverse(), ...path2.slice().reverse()]
    animation(reversePath)
  }
})

watch(() => step.value, (value) => {
  if(value === 1) {
    taskProgress.value = '货物搬运完成，准备装载'
  } else if(value === 3) {
    taskProgress.value = '货物运输中'
  } else if(value === 4) {
    taskProgress.value = '货物上架完成!!!'
  }
  console.log(value)
})


const initData = async () => {
  const data = await getRobotCar()
  // @ts-ignore
  currentPath.value = data.path
  robot1.value = {
    robotName: data.robotName,
    robotType: robotsType[data.robotType]
  }
  currentRobot.value = robot1.value
  

  console.log('path', currentPath.value)


  path.splice(0)

  // @ts-ignore
  currentPath.value.map((item: any, index: number) => {
      //@ts-ignore
      path.push([item.positionX * 1000, item.positionY * 500])
  })


  const data2 = await getArmsRobot()
  // @ts-ignore
  currentPath2.value = data2.path

  robot2.value = {
    robotName: data2.robotName,
    robotType: robotsType[data2.robotType]
  }

  path2.splice(0)

  // @ts-ignore
  currentPath2.value.map((item: any, index: number) => {
      //@ts-ignore
      path2.push([item.positionX * 1000, item.positionY * 500])

  })

  const data3 = await getArmsRobot2()
  // @ts-ignore
  currentPath3.value = data3.path

  path3.splice(0)

  // @ts-ignore
  currentPath3.value.map((item: any, index: number) => {
    //@ts-ignore
    path3.push([item.positionX * 1000, item.positionY * 500])
  })


  taskProgress.value = '货物搬运中'

  if(!stage && !layer) {
    init();
  }

  // 装载货物
  imageSrc.value = robotCar
  animation(path);

}

const init = async () => {
  stage = new Konva.Stage({
    container: stageContainer.value,
    width: 1300,
    height: 500,
    antialias: true,
  });
  layer = new Konva.Layer();
  stage.add(layer);

  createRectangle({positionX: 1.00, positionY: 0.93})

};

const animation = async (path: any) => {
  // 绘制路径线
  drawPath(path);

  // 创建图标
  const icon = createNode(path[0][0], path[0][1]);

  // 在路径上的每个转折点显示小圆圈和坐标信息
  for (let i = 0; i < path.length; i++) {
    createPointCircle(path[i][0], path[i][1], i + 1);
  }

  // 开始动画，按路径上的每个点移动
  await animateIcon(icon, path);
};
// 创建图标
const createNode = (x: number, y: number) => {
  const group = new Konva.Group({
    x: x,
    y: y,
  });

  // 创建图片节点
  const image = new Image();
  image.onload = () => {
    const konvaImage = new Konva.Image({
      x: -image.width / 30,
      y: -image.height / 30,
      image: image,
      width: image.width / 15,
      height: image.height / 15,
    });
    group.add(konvaImage);
    layer.batchDraw(); // 更新画布
  };
  // @ts-ignore
  image.src = imageSrc.value

  // 创建提示信息
  const tooltip = new Konva.Label({
    x: -image.width / 30 + 130,
    y: -image.height / 30 + 50,
    opacity: 0.75,
    visible: false,
  });
  tooltip.add(new Konva.Tag({
    fill: 'black',
    pointerDirection: 'down',
    pointerWidth: 10,
    pointerHeight: 10,
    lineJoin: 'round',
  }));

  const tooltipText = `机器人名称：${currentRobot.value?.robotName}\n机器人类型：${currentRobot.value?.robotType}`
  tooltip.add(new Konva.Text({
    text: tooltipText,
    fontFamily: 'Arial',
    fontSize: 12,
    padding: 5,
    fill: 'white',
  }));
  group.add(tooltip);

  group.on('mouseover', () => {
    tooltip.visible(true);
    layer.batchDraw();
  });

  group.on('mouseout', () => {
    tooltip.visible(false);
    layer.batchDraw();
  });

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
    text: `(${x.toFixed(0)},${y.toFixed(0)})`,
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
        if(!isGetGoodsFinish.value && step.value === 0) {
            isGetGoodsFinish.value = true
            step.value = 1
            icon.remove()
        } else if(isGetGoodsFinish.value && step.value === 1) {
            step.value = 2
        } else if(!isLoadFinish.value && step.value === 2) {
            isLoadFinish.value = true
            step.value = 3
            icon.remove()
        } else if(!isShlefFinish.value && step.value === 3) {
            isShlefFinish.value = true
            step.value = 4
            icon.remove()
        }
        return;
    }

    const [x, y] = path[currentIndex];
    const tween = new Konva.Tween({
      node: icon,
      x: x,
      y: y,
      duration: 0.5, // 增加持续时间以减慢动画速度
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
    x: item.positionX * 1000,
    y: item.positionY * 500,
  });

  // 创建图片节点
  const image = new Image();
  image.onload = () => {
    const konvaImage = new Konva.Image({
      x: -image.width / 6,
      y: -image.height / 6,
      image: image,
      width: image.width / 3,
      height: image.height / 3,
    });
    group.add(konvaImage);
    layer.batchDraw(); // 更新画布
  };
  image.src = shelf;

  // 创建文本并添加到组中
  const text = new Konva.Text({
    text: item.name,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'black', // 确保文本颜色对比度足够高
    x: -image.width / 6 + 20, // 调整文本位置，可能需要根据图片大小和文本长度进行调整
    y: -image.height / 6 + 100, // 调整文本位置，确保位于图片上方
  });
  group.add(text);

  // 将组添加到舞台
  layer.add(group);
};

const createGoods = (x: number, y: number) => {
    // 创建一个组
  const group = new Konva.Group({
    x: x,
    y: y,
  });

  // 创建图片节点
  const image = new Image();
  image.onload = () => {
    const konvaImage = new Konva.Image({
      x: -image.width / 6 + 20,
      y: -image.height / 6 + 10,
      image: image,
      width: image.width / 6,
      height: image.height / 6,
    });
    group.add(konvaImage);
    layer.batchDraw(); // 更新画布
  };
  image.src = goods;

  // 将组添加到舞台
  layer.add(group);

  return group;
}

</script>

<template>
  <div id="stage" ref="stageContainer"></div>
  <div class="map-select">
    <span>当前任务进度</span>
    <el-tag>{{ taskProgress }}</el-tag>
  </div>
</template>

<style scoped>
#stage {
  border: 1px solid black;
}
.map-select {
  height: calc(7vh);
  padding: 20px;
}
.map-select span {
  font-weight: bold;
  margin-right: 20px;
}
</style>