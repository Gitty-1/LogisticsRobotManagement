<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getCookie, setUserMsgToCookie } from '@/utils/setCookie';
import { updateUsername } from '@/api/user'
import { message } from '@/utils/message'

// 数据
const userName = ref<string>()
const email = ref<string>()
const userType = ref<number>(0)
const isEnableEdit = ref(false)

const emits = defineEmits(['updateUsername'])

// 方法
onBeforeMount(() => {
    userName.value = getCookie('username')
    email.value = getCookie('email')
    userType.value = Number(getCookie('userType'))
})
const handleEdit = async (isEdit: boolean) => {
    if(!isEdit) {
        await updateUsername({username: userName.value})
        message('修改成功', 'success')
        setUserMsgToCookie({
            username: userName.value,
            userType: userType.value,
            email: email.value
        })
        emits('updateUsername')
    }
    isEnableEdit.value = isEdit
}

// 用户类型
const userTypeArray = ['', '普通用户', '管理员']

</script>
<template>
  <div class="info">
    <div class="info-item">
        <el-text>用户名称：</el-text>
        <el-text style="display: flex;">
            <el-input v-model="userName" style="width: 50%;" :disabled="!isEnableEdit" @keyup.enter="handleEdit(false)"/>
            <el-button v-show="!isEnableEdit" link type="primary" :underline="false" icon="Edit" @click="handleEdit(true)"></el-button>
            <el-button v-show="isEnableEdit" link type="primary" :underline="false" @click="handleEdit(false)">确定</el-button>
        </el-text>
    </div>
    <div class="info-item">
        <el-text>邮箱：</el-text>
        <el-text type="primary">{{ email }}</el-text>
    </div>
    <div class="info-item">
        <el-text>用户类型：</el-text>
        <el-text>{{ userTypeArray[userType] }}</el-text>
    </div>
  </div>
</template>
<style scoped>
.info-item {
    display: flex;
    width: 100%;
}
.info-item span:first-child {
    width: 20%;
    font-size: 16px;
    font-weight: bold;
}
</style>
