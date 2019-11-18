<template>
    <div>
        <my-header-list>注册</my-header-list>
        <!--<img src="../content/img/index/banner-img2.jpg" alt="" style="height: 3.7rem;width: 100%">-->
        <div style="height: 3.5rem"></div>
        <div class="content">
            <van-cell-group>
                <van-field
                        v-model="form.nickname"
                        required
                        clearable
                        label="用户名"
                        right-icon="question-o"
                        placeholder="请输入用户名"
                >
                    <!--@click-right-icon="$toast('question')"-->
                </van-field>

                <van-field
                        v-model="form.password"
                        type="password"
                        clearable
                        label="密码"
                        placeholder="请输入密码"
                        required>
                </van-field>
                <van-field
                        v-model="form.tel"
                        label="手机号"
                        placeholder="请输入手机号"
                        required
                ></van-field>
            </van-cell-group>
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="henRegister">注册</van-button>
            <router-link :to="{name:'login'}">
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">去登录</van-button>
            </router-link>
        </div>
        <div class="icon">
            <div class="item">
                <img src="../content/img/icon_qq.png" alt="">
            </div>
            <div class="item">
                <img src="../content/img/微信.png" alt="">
            </div>
            <div class="item">
                <img src="../content/img/微博.png" alt="">
            </div>
        </div>
    </div>
    
</template>

<script>
    import MyHeaderList from '../../components/header/my-header-list'
    import {register} from "../../api/users";
    import {Toast} from 'vant';
    export default {
        name: "Register",
        data() {
            return {
                form:{
                    nickname: '',
                    password: '',
                    tel:'',
                }
            }
        },
        methods:{
            henRegister(){
                register('api/usersfront',this.form)
                    .then(res=>{
                        let data = res.data;
                        Toast(data.msg);
                        // window.console.log(res)
                    })
            },
        },
        components: {
            MyHeaderList
        }
    }
</script>

<style scoped>
    .content {
        padding: 0.24rem;
        box-sizing: border-box;
    }

    .van-cell {
        border: 1px solid #d5d5d5;
        margin-bottom: 0.5rem;
        border-radius: 0.2rem;
        /*margin: 0.5rem;*/
    }

    .van-button {
        width: 2rem;
        border-radius: 0.33rem;
        margin-left: 0.9rem;
    }

    .icon {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item {
        width: 2rem;
        height: 1rem;
    }

    .item img {
        display: block;
        margin: 0 auto;
        width: 1rem;
        height: 1rem;
    }

</style>