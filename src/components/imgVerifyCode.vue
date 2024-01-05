<script setup lang="ts">
import { onMounted, reactive, ref, defineEmits, watchEffect } from 'vue'


const imgCode = ref('')
const width = 80
const height = 32
const allTexts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
const canvasState = reactive({
    canvas: null as unknown as HTMLCanvasElement,
    ctx: null as unknown as CanvasRenderingContext2D
})

const emit = defineEmits(['getImgCode'])

onMounted(() => {
    imgCode.value = draw()
})

const handleDraw = () => {
    imgCode.value = draw()
    emit('getImgCode', imgCode.value)
}

//产生随机数
const randomNum = (min: any, max: any) => {
    return parseInt(Math.random() * (max - min) + min);
}

//产生随机颜色
const randomColor = (min: any, max: any) => {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return `rgb(${r},${g},${b})`;
}

const draw = () => {
    canvasState.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const canvas = canvasState.canvas;
    // @ts-ignore
    canvasState.ctx = canvas.getContext('2d');
    const ctx = canvasState.ctx;
    //!! 1.填充背景颜色，背景颜色要浅一点
    ctx.fillStyle = randomColor(180, 230);
    // 填充的位置
    ctx.fillRect(0, 0, width, height);
    let imgCode = "";
    //!! 2.随机产生字符串，并且随机旋转
    for (let i = 0; i < 4; i++) {
        // 随机的四个字
        const text = allTexts[randomNum(0, allTexts.length)];
        imgCode += text;
        // 随机的字体大小
        const fontSize = randomNum(18, 40);
        // 字体随机的旋转角度
        const deg = randomNum(-30, 30);
        ctx.font = fontSize + "px Arial";
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        ctx.save();
        ctx.translate(15 * i + 15, 15);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(text, -15 + 5, -15);
        ctx.restore();
    }
    //!! 3.随机产生5条干扰线
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(
        randomNum(0, width),
        randomNum(0, height)
        );
        ctx.lineTo(
        randomNum(0, width),
        randomNum(0, height)
        );
        ctx.strokeStyle = randomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
    }
    //!! 4.随机产生20个干扰的小点
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(
        randomNum(0, width),
        randomNum(0, height),
        1,
        0,
        2 * Math.PI
        );
        ctx.closePath();
        ctx.fillStyle = randomColor(150, 200);
        ctx.fill();
    }
    return imgCode;
}
</script>
<template>
    <canvas
      class="img-canvas"  
      id="canvas"
      :width="width"
      :height="height"
      @click="handleDraw"
    ></canvas>
</template>
<style scoped>
.img-canvas {
    cursor: pointer;
}
</style>