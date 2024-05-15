<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import robotCar from '@/assets/robotCar.png'
import armsRobot from '@/assets/armsRobots.png'
import robotCarReverse from '@/assets/robotCarReverse.png'
import arms from '@/assets/arms.png'
import shelf from '@/assets/shelf.png'
import goods from '@/assets/goods.png'
import { getMap } from '@/api/map';
import type { RobotType } from './type';

const props = defineProps({
  goodsId: {
    type: Number,
    default: 0
  },
  scheme: {
    type: Number,
    default: 0
  }
})

onBeforeMount(async () => {
  const res = await getMap(props.goodsId)
  const { data } = res
  const { pathList, shelfPosition } = data
  currentPath.value = pathList[0].path
  robot1.value = {
    robotName: pathList[0].robotName,
    robotType: '装载机器人'
  }
  currentPath2.value = pathList[1].path
  initData()
})

const stageContainer = ref();

const currentPath = ref([])
const currentPath2 = ref([])

const robot1 = ref<RobotType>()

const currentRobot = ref<RobotType>()

let stage: Stage, layer: Layer;
// 定义路径数组，每个路径包含一系列坐标点
let path = reactive([[]])
let path2 = reactive([[]])

// 第一种方案
const isGetGoodsFinish = ref<Boolean>(false)
const isLoadFinish = ref<Boolean>(false)

const step = ref<number>(0)
const imageSrc = ref()
const goodsIcon = ref()
const robotIcon = ref()

const taskProgress = ref<string>()

type numStrKey = Record<number, string>
const robotsType: numStrKey = {
  1: '装载机器人',
  2: '带臂装载机器人',
  3: '机械臂'
}

watch(() => isGetGoodsFinish.value, (value) => {
  if(value) {
    goodsIcon.value.remove()
    animation(path2)

    if(props.scheme === 1) {
      imageSrc.value = armsRobot
    } else {
      imageSrc.value = arms
    }
    robotIcon.value = createNode(path2[path2.length-1][0], path2[path2.length-1][1])
  }
})

watch(() => isLoadFinish.value, (value) => {
  if(value) {
    imageSrc.value = robotCarReverse
    const reversePath = [...path2.slice().reverse(), ...path.slice().reverse()]
    animation(reversePath)

  }
})


watch(() => step.value, (value) => {
  if(value === 1) {
    taskProgress.value = '货物获取完成'
  } else if(value === 2) {
    taskProgress.value = '货物运输中'
  }
  console.log(value)
})


const initData = async () => {
  currentRobot.value = robot1.value
  
  path.splice(0)

  currentPath.value.map((item: any, index: number) => {
    if(index === 0) {
      //@ts-ignore
      path.push([item.positionX * 300, item.positionY * 100 + 200])
    }
    if(index % 10 === 0) {
      //@ts-ignore
      path.push([item.positionX * 300, item.positionY * 100 + 200])
    }
    if(index % 10 !== 0 && index === currentPath.value.length) {
      //@ts-ignore
      path.push([item.positionX * 300, item.positionY * 100 + 200])
    }
  })

  path2.splice(0)

  // @ts-ignore
  currentPath2.value.map((item: any, index: number) => {
    if(index === 0) {
      //@ts-ignore
      path2.push([item.positionX * 300, item.positionY * 100 + 200])
    }
    if(index % 10 === 0) {
      //@ts-ignore
      path2.push([item.positionX * 300, item.positionY * 100 + 200])
    }
    if(index % 10 !== 0 && index === currentPath.value.length) {
      //@ts-ignore
      path2.push([item.positionX * 300, item.positionY * 100 + 200])
    }
  })


  taskProgress.value = '货物获取中'

  if(!stage && !layer) {
    init();
  }

  goodsIcon.value = createGoods(path[path.length - 1][0], path[path.length - 1][1])


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
        } else if(!isLoadFinish.value && step.value === 1) {
            isLoadFinish.value = true
            step.value = 2
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