<script setup lang="ts">
import { ref, reactive } from "vue";
import { User, Lock, Message, Key } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from "element-plus";

// 登录注册菜单切换
const activeIndex = ref('1')
const handleChange = (index: string) => {
    activeIndex.value = index
}

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
// 登录表单类型
interface LoginFormType {
    username: string,
    password: string,
    imgValidateCode: string
}
const loginRuleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginFormType>({
    username: '',
    password: '',
    imgValidateCode: ''
})
// 校验规则
const loginFormRules = reactive<FormRules<LoginFormType>>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
        },
        {
            min: 3,
            max: 20,
            message: '用户名长度为3-20',
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

interface RegisterFormType {
    username: string,
    password: string,
    email: string,
    validateCode: string,
    userType: string,
}
const registerRuleFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterFormType>({
    username: '',
    password: '',
    email: '',
    validateCode: '',
    userType: ''
})
const registerFormRules = reactive<FormRules<RegisterFormType>>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
        },
        {
            min: 3,
            max: 20,
            message: '用户名长度为3-20',
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
    email: [
        {
            required: true,
            message: '请输入绑定邮箱',
            trigger: 'change'
        },
        {
            validator: validateEmail,
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

// 提交表单时校验
const onSubmit = (form: FormInstance | undefined) => {
    if(!form) return
    // @ts-ignore
    form.validate((valid, fields) => {
        if (valid) {
            // 提交
            
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 重置
const onReset = (form: FormInstance | undefined) => {
    if(!form) return
    form.resetFields()
}


</script>
<template>
    <div class="container">
        <div class="login-menu">
            <el-menu :default-active="activeIndex" mode="horizontal" class="el-menu" :ellipsis="false">
                <el-menu-item index="1" @click="handleChange('1')" class="menu-item">登录</el-menu-item>
                <el-menu-item index="2" @click="handleChange('2')" class="menu-item">注册</el-menu-item>
            </el-menu>
            <el-form v-show="activeIndex === '1'" :model="loginForm" class="login-form" label-width="100px" :rules="loginFormRules" ref="loginRuleFormRef" style="padding-top: 50px;">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username" :prefix-icon="User" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" :prefix-icon="Lock" show-password></el-input>
                </el-form-item>
                <el-form-item label="图形验证码" prop="imgValidateCode">
                    <div class="img-code">
                        <el-input placeholder="请输入验证码" v-model="loginForm.imgValidateCode" :prefix-icon="Key" clearable></el-input>
                        <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" style="width:80px; height: 30px;"></el-image>
                    </div>
                </el-form-item>
                <div class="form-button">
                    <el-button @click="onReset(loginRuleFormRef)">重置</el-button>
                    <el-button type="primary" @click="onSubmit(loginRuleFormRef)">确定</el-button>
                </div>
            </el-form>
            <el-form v-show="activeIndex === '2'" :model="registerForm" class="login-form" label-width="100px" :rules="registerFormRules" ref="registerRuleFormRef">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="registerForm.username" :prefix-icon="User" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" :prefix-icon="Lock" show-password></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" placeholder="请输入绑定邮箱" v-model="registerForm.email" :prefix-icon="Message"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-input placeholder="请输入邮箱验证码" v-model="registerForm.validateCode" :prefix-icon="Key"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="userType">
                    <el-radio-group v-model="registerForm.userType">
                        <el-radio label="1">普通用户</el-radio>
                        <el-radio label="2">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="form-button">
                    <el-button @click="onReset(registerRuleFormRef)">重置</el-button>
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
    background: url('../assets/robot.jpg') no-repeat left/60%;
}
.login-menu {
    width: 400px;
    height: 450px;
    position: absolute;
    top: 50px;
    right: 50px;
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
    margin-top: 20px;
}
.form-button {
    display: flex;
    justify-content: center;
}
.img-code {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>