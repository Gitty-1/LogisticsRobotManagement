<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from "vue"
import { User, Lock, Key, Message } from "@element-plus/icons"
import type { FormInstance, FormRules } from "element-plus"
// @ts-ignore
import { v4 as uuidV4 } from 'uuid'
import router from "@/router"
import { login, getCaptcha, validateCode, register, getPublicKey } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { setTokenToCookie, deleteCookie, setUserMsgToCookie } from "@/utils/setCookie"
import { useUserStore } from '@/stores/user'
import { message } from '@/utils/message'
import { encrypt } from "@/utils/encrypt"
import type { LoginFormType, RegisterFormType } from "./type"

onBeforeMount(() => {
    getCaptchaImg()
})

// 登录注册菜单切换
const activeIndex = ref('1')
const handleChange = (index: string) => {
    activeIndex.value = index
}

watch(() => activeIndex.value, () => {
    onReset()
})

// 校验邮箱格式
const validateEmail = (rule: any, value: any, callback: any) => {
    var emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if ((!emailRegExp.test(value) && value != '') || (!emailRegExp1.test(value) && value != '')) {
    callback(new Error('请输入有效邮箱格式'));
    } else {
    callback();
    }
};

// 校验
const loginRuleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginFormType>({
    email: '',
    password: '',
    imgValidateCode: ''
})
// 校验规则
const loginFormRules = reactive<FormRules<LoginFormType>>({
    email: [
        {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'change'
        },
        {
            validator: validateEmail,
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'change'
        },
        {
            min: 6,
            max: 20,
            message: '密码长度为6-20',
            trigger: 'blur'
        }
    ],
    imgValidateCode: [
        {
            required: true,
            message: '请输入图形验证码',
            trigger: 'change'
        },
        {
            min: 4,
            max: 4,
            message: '请输入4位图形验证码',
            trigger: 'blur'
        }
    ]
})

// 注册相关
const registerRuleFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterFormType>({
    email: '',
    username: '',
    password: '',
    validateCode: '',
    userType: ''
})
const registerFormRules = reactive<FormRules<RegisterFormType>>({
    email: [
        {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'change'
        },
        {
            validator: validateEmail,
        }
    ],
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
        },
        {
            min: 6,
            max: 20,
            message: '用户名长度为6-20',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'change'
        },
        {
            min: 6,
            max: 20,
            message: '密码长度为6-20',
            trigger: 'blur'
        }
    ],
    validateCode: [
        {
            required: true,
            message: '请输入邮箱验证码',
            trigger: 'change'
        },
        {
            min: 6,
            max: 6,
            message: '请输入有效的验证码',
            trigger: 'blur'
        }
    ],
    userType: [
        {
            required: true,
            message: '请选择用户类型',
            trigger: 'change'
        }
    ]
})

// 获取图形验证码
const captchaKey = ref('')
const captcha = ref('')
const getCaptchaImg = async () => {
    captchaKey.value = uuidV4()
    const res = await getCaptcha(captchaKey.value)
    captcha.value = res.data.img
}
const updateImgCode = () => {
    getCaptchaImg()
}

// 发送邮箱验证码
const handleSendValidateCode = () => {
    handleCodeTime()
    const params = {
        email: registerForm.email
    }
    validateCode(params)
}

// 邮箱验证码发送时间间隔
const intervalId = ref(0)
const text = ref(60)
const isSendValidateCode = ref(true)
const intervalFn = () => {
    // @ts-ignore
    intervalId.value = setInterval(() => {
        if(text.value > 1) {
            text.value--
        } else if(text.value === 1) {
            isSendValidateCode.value = true
        }
    }, 1000)
}
const clearIntervalFn = () => {
    clearInterval(intervalId.value)
} 
const handleCodeTime = () => {
    text.value = 60
    isSendValidateCode.value = false
    clearIntervalFn()
    intervalFn()
}

// 提交表单时校验
const onSubmit = (form: FormInstance | undefined) => {
    if(!form) return
    // @ts-ignore
    form.validate(async (valid, _) => {
        // 请求公钥
        const res1 = await getPublicKey()
        const publicKey = res1.data.publicKey
        if (valid) {
            if(activeIndex.value === '1') {
                const params = {
                    email: loginForm.email,
                    password: encrypt(publicKey, loginForm.password),
                    captchaCode: loginForm.imgValidateCode,
                    captchaKey: captchaKey.value
                }
                const res = await login(params)
                const { data } = res
                deleteCookie()
                setTokenToCookie(data)
                message('登录成功', 'success')
            } else {
                // 注册
                registerForm.password = encrypt(publicKey, registerForm.password) as string
                const res = await register(registerForm)
                const { data } = res
                deleteCookie()
                setTokenToCookie(data)
                message('注册成功', 'success')
            }
            
            const res = await getUserInfo()
            const { data } = res

            // 更新用户信息
            const user = useUserStore()
            user.userName = data.username
            user.email = data.email
            user.userType = data.userType
            setUserMsgToCookie(data)

            console.log('res', res)
            router.push('/console')
        }
    })
}

// 重置
const onReset = () => {
    // @ts-ignore
    Object.keys(loginForm).forEach((item: string) => loginForm[item] = '')
    // @ts-ignore
    Object.keys(registerForm).forEach((item: string) => registerForm[item] = '')
    updateImgCode()
}


</script>
<template>
    <div class="container">
        <div class="login-menu">
            <el-menu :default-active="activeIndex" mode="horizontal" class="el-menu" :ellipsis="false">
                <el-menu-item index="1" @click="handleChange('1')" class="menu-item">登录</el-menu-item>
                <el-menu-item index="2" @click="handleChange('2')" class="menu-item">注册</el-menu-item>
            </el-menu>
            <el-form v-show="activeIndex === '1'" :model="loginForm" class="login-form" label-width="70px" :rules="loginFormRules" ref="loginRuleFormRef" style="padding-top: 30px;">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" placeholder="请输入邮箱地址" v-model="loginForm.email" :prefix-icon="Message" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" :prefix-icon="Lock" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="imgValidateCode">
                    <div class="img-code">
                        <el-input placeholder="请输入验证码" v-model="loginForm.imgValidateCode" :prefix-icon="Key" clearable></el-input>
                        <el-image class="captcha-image" :src="captcha" @click="updateImgCode" />
                    </div>
                </el-form-item>
                <div class="form-button">
                    <el-button @click="onReset">重置</el-button>
                    <el-button type="primary" @click="onSubmit(loginRuleFormRef)">确定</el-button>
                </div>
            </el-form>
            <el-form v-show="activeIndex === '2'" :model="registerForm" class="login-form" label-width="70px" :rules="registerFormRules" ref="registerRuleFormRef">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" placeholder="请输入邮箱地址" v-model="registerForm.email" :prefix-icon="Message" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入用户名" clearable :prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请设置密码" v-model="registerForm.password" :prefix-icon="Lock" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-input placeholder="请输入邮箱验证码" v-model="registerForm.validateCode" :prefix-icon="Key">
                        <template #append>
                            <span class="code-span" @click="handleSendValidateCode" v-if="isSendValidateCode">发送</span>
                            <span class="code-span-time" v-else>({{ text }}秒)</span>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="form-button">
                    <el-button @click="onReset">重置</el-button>
                    <el-button type="primary" @click="onSubmit(registerRuleFormRef)">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<style scoped>
.container {
    width: calc(100vw);
    height: calc(100vh);
    box-sizing: border-box;
    background: url('../../assets/robot.jpg') no-repeat left/60%;
}
.login-menu {
    width: 400px;
    height: 400px;
    position: absolute;
    top: calc(10vw);
    right: 100px;
    border: 1px solid #cfcfcf;
    padding: 50px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.el-menu {
    display: flex;
    justify-content: center;
    height: 40px;
}
.el-menu .menu-item {
    flex: 1;
}
.login-form {
    margin-top: 30px;
}
.form-button {
    display: flex;
    justify-content: center;
}
.img-code {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.code-span {
    font-size: 12px;
    width: 30px;
    color: rgb(15, 175, 238);
}
.code-span:hover {
    cursor: pointer;
    color: skyblue;
}

.code-span-time {
    font-size: 12px;
    width: 30px;
    color: skyblue;
}

.code-span-time:hover {
    cursor: not-allowed;
}

.captcha-image {
    cursor: pointer;
}

:deep(.el-form-item__label) {
    justify-content: flex-start;
}
</style>