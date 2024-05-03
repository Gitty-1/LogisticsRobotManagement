<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue';
import Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';
import { isTemplate } from 'element-plus/es/utils/index.mjs';

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
      {"positionX": 1, "positionY": 1}, {"positionX": 0.987611, "positionY": 0.987479}, {"positionX": 0.978803, "positionY": 0.978608}, {"positionX": 0.970008, "positionY": 0.969724}, {"positionX": 0.961189, "positionY": 0.960868}, {"positionX": 0.952369, "positionY": 0.952009}, {"positionX": 0.943555, "positionY": 0.943147}, {"positionX": 0.934733, "positionY": 0.93429}, {"positionX": 0.925916, "positionY": 0.925431}, {"positionX": 0.917097, "positionY": 0.916572}, {"positionX": 0.908277, "positionY": 0.907713}, {"positionX": 0.899458, "positionY": 0.898856}, {"positionX": 0.890641, "positionY": 0.889997}, {"positionX": 0.881818, "positionY": 0.881138}, {"positionX": 0.872999, "positionY": 0.872279}, {"positionX": 0.864182, "positionY": 0.863419}, {"positionX": 0.855363, "positionY": 0.854563}, {"positionX": 0.846543, "positionY": 0.845704}, {"positionX": 0.837724, "positionY": 0.836848}, {"positionX": 0.828901, "positionY": 0.827991}, {"positionX": 0.820081, "positionY": 0.819132}, {"positionX": 0.811259, "positionY": 0.810279}, {"positionX": 0.802436, "positionY": 0.801423}, {"positionX": 0.79361, "positionY": 0.79257}, {"positionX": 0.784785, "positionY": 0.78372}, {"positionX": 0.775956, "positionY": 0.77487}, {"positionX": 0.767127, "positionY": 0.766022}, {"positionX": 0.758295, "positionY": 0.757175}, {"positionX": 0.749467, "positionY": 0.748328}, {"positionX": 0.740635, "positionY": 0.739481}, {"positionX": 0.7318, "positionY": 0.730637}, {"positionX": 0.722965, "positionY": 0.721793}, {"positionX": 0.71413, "positionY": 0.712949}, {"positionX": 0.705296, "positionY": 0.704108}, {"positionX": 0.696461, "positionY": 0.695267}, {"positionX": 0.687623, "positionY": 0.686427}, {"positionX": 0.678785, "positionY": 0.677589}, {"positionX": 0.669947, "positionY": 0.668748}, {"positionX": 0.661106, "positionY": 0.65991}, {"positionX": 0.652268, "positionY": 0.651072}, {"positionX": 0.643427, "positionY": 0.642234}, {"positionX": 0.634586, "positionY": 0.633396}, {"positionX": 0.625745, "positionY": 0.624561}, {"positionX": 0.616904, "positionY": 0.615723}, {"positionX": 0.608063, "positionY": 0.606889}, {"positionX": 0.59922, "positionY": 0.598051}, {"positionX": 0.590379, "positionY": 0.589216}, {"positionX": 0.581535, "positionY": 0.580381}, {"positionX": 0.572694, "positionY": 0.571546}, {"positionX": 0.56385, "positionY": 0.562714}, {"positionX": 0.555006, "positionY": 0.55388}, {"positionX": 0.546162, "positionY": 0.545045}, {"positionX": 0.537318, "positionY": 0.536213}, {"positionX": 0.528471, "positionY": 0.527378}, {"positionX": 0.519627, "positionY": 0.518546}, {"positionX": 0.510783, "positionY": 0.509714}, {"positionX": 0.501936, "positionY": 0.500883}, {"positionX": 0.493092, "positionY": 0.492051}, {"positionX": 0.484245, "positionY": 0.483219}, {"positionX": 0.475397, "positionY": 0.474387}, {"positionX": 0.46655, "positionY": 0.465556}, {"positionX": 0.457703, "positionY": 0.456724}, {"positionX": 0.448856, "positionY": 0.447895}, {"positionX": 0.440009, "positionY": 0.439063}, {"positionX": 0.431162, "positionY": 0.430235}, {"positionX": 0.422315, "positionY": 0.421403}, {"positionX": 0.413468, "positionY": 0.412574}, {"positionX": 0.404618, "positionY": 0.403745}, {"positionX": 0.395771, "positionY": 0.394917}, {"positionX": 0.386921, "positionY": 0.386088}, {"positionX": 0.378074, "positionY": 0.377259}, {"positionX": 0.369224, "positionY": 0.36843}, {"positionX": 0.360374, "positionY": 0.359602}, {"positionX": 0.351524, "positionY": 0.350773}, {"positionX": 0.342673, "positionY": 0.341947}, {"positionX": 0.333823, "positionY": 0.333118}, {"positionX": 0.324973, "positionY": 0.324293}, {"positionX": 0.316123, "positionY": 0.315464}, {"positionX": 0.307273, "positionY": 0.306638}, {"positionX": 0.29842, "positionY": 0.29781}, {"positionX": 0.28957, "positionY": 0.288984}, {"positionX": 0.28072, "positionY": 0.280158}, {"positionX": 0.271867, "positionY": 0.271333}, {"positionX": 0.263013, "positionY": 0.262507}, {"positionX": 0.254163, "positionY": 0.253681}, {"positionX": 0.24531, "positionY": 0.244855}, {"positionX": 0.236457, "positionY": 0.23603}, {"positionX": 0.227604, "positionY": 0.227207}, {"positionX": 0.218751, "positionY": 0.218381}, {"positionX": 0.209898, "positionY": 0.209556}, {"positionX": 0.201044, "positionY": 0.200733}, {"positionX": 0.192191, "positionY": 0.191907}, {"positionX": 0.183338, "positionY": 0.183085}, {"positionX": 0.174485, "positionY": 0.174262}, {"positionX": 0.165629, "positionY": 0.165437}, {"positionX": 0.156776, "positionY": 0.156614}, {"positionX": 0.147923, "positionY": 0.147791}, {"positionX": 0.139066, "positionY": 0.138969}, {"positionX": 0.13021, "positionY": 0.130146}, {"positionX": 0.121357, "positionY": 0.121323}, {"positionX": 0.112501, "positionY": 0.112501}, {"positionX": 0.100001, "positionY": 0.100001}, {"positionX": 0.1, "positionY": 0.1}

  ],
  // '机器人2': [
  //     { positionX: 100, positionY: 100 },
  //     { positionX: 200, positionY: 100 },
  //     { positionX: 300, positionY: 400 },
  //     { positionX: 550, positionY: 120 },
  //     { positionX: 600, positionY: 100 },
  //     { positionX: 730, positionY: 130 },
  //     { positionX: 800, positionY: 120 },
  //     { positionX: 1000, positionY: 60 }
  // ],
  // '机器人3': [
  //     { positionX: 100, positionY: 100 },
  //     { positionX: 200, positionY: 100 },
  //     { positionX: 300, positionY: 400 },
  //     { positionX: 550, positionY: 120 },
  //     { positionX: 600, positionY: 100 },
  //     { positionX: 730, positionY: 130 },
  //     { positionX: 800, positionY: 120 },
  //     { positionX: 1000, positionY: 60 }
  // ],
}

watch(() => robot.value, () => {
  // @ts-ignore
  let currentPath = paths[robot.value]
  currentPath = currentPath.reverse()
  currentPath.map((item: any, index: number) => {
    if(index % 5 === 0) {
      item.positionX *= 500
      item.positionY *= 300
      item.positionX += 5*index
      //@ts-ignore
      path.push([item.positionX, item.positionY])
      if(index === currentPath.length - 1 && index % 5 !==0){
        //@ts-ignore
        path.push([item.positionX, item.positionY])
      }
    }
  })
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