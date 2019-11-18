<template>
    <div>
        <my-header-list>登录</my-header-list>
        <img src="../content/img/index/banner-img2.jpg" alt="" style="height: 3.7rem;width: 100%">
        <div style="height: 0.5rem"></div>
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
            </van-cell-group>
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="handleLogin"
            >登录</van-button>
            <router-link :to="{name:'register'}">
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">注册</van-button>
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
    import {login} from "../../api/users";
    import {SUCCESS} from "../../config/base";
    import {Toast} from 'vant';

    export default {
        name: "Login",
        data() {
            return {
                form:{
                    nickname: '',
                    password: '',
                }

            }
        },
        methods:{
            handleLogin(){
                login('api/loginfront',this.form).then(res=>{
                    let data = res.data;
                    Toast(data.msg);
                    if(data.code==SUCCESS){
                        let names = this.$route.query.redirect || 'index';
                        this.$store.dispatch('setCart');
                        this.$store.commit('changeToken',data.token);
                        this.$router.push({name:names})
                    }
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
    }

    .van-button {
        width: 2rem;
        border-radius: 0.33rem;
        margin-left: 0.9rem;
    }

    .icon {
        margin-top: 1.5rem;
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