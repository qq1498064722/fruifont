<template>
    <div>
        <div class="big-box" v-if="users">
            <!-- 头部的开始 -->
            <div class="big-banner">
                <img src="./img/my/大banner.jpg" alt="">
                <div class="banner-box">
                    <div class="banner-box1">
                        <img :src="imgHostName+users.avatar" alt="">
                    </div>
                    <div class="banner-box2">
                        <span>{{users.nickname}}</span>

                    </div>
                    <div style="color: #747474;float: right;margin-bottom: 0.5rem">
                        <van-icon name="setting-o" size="28px"/>
                    </div>
                </div>

            </div>
            <!-- 头部的结束 -->
            <!-- 待付款部分开始 -->
            <div class="pay-box">
                <a href="buylist.html" class="pay-box1">
                    <img src="./img/my/personal-center-img1.png" alt="">
                    <span>待付款</span>
                </a>
                <a href="buylist.html" class="pay-box1">
                    <img src="./img/my/personal-center-img2.png" alt="">
                    <span>待发货</span>
                </a>
                <a href="buylist.html" class="pay-box1">
                    <img src="./img/my/personal-center-img3.png" alt="">
                    <span>待收货</span>
                </a>
                <a href="buylist.html" class="pay-box1">
                    <img src="./img/my/personal-center-img4.png" alt="">
                    <span>待评价</span>
                </a>
                <a href="buylist.html" class="pay-box1">
                    <img src="./img/my/personal-center-img5.png" alt="">
                    <span>全部订单</span>
                </a>
            </div>
            <!-- 待付款部分结束 -->
            <!-- 优惠卷的开始 -->
            <div class="person-juan">
                <a href="yhj.html" class="juan-box1">
                    <img src="./img/my/personal-center-img10.png" alt="">
                    <span>我的优惠券</span>
                </a>
            </div>
            <!-- 优惠卷的结束 -->
            <!-- 收获地址的开始 -->
            <div class="person-juan">
                <a href="Receiving address.html" class="juan-box1">
                    <img src="./img/my/personal-center-img11.png" alt="">
                    <span>收货地址</span>
                </a>
            </div>
            <!-- 收获地址的结束 -->
            <!-- 售后服务的开始 -->
            <div class="person-juan">
                <a href="afterSale.html" class="juan-box1">
                    <img src="./img/my/personal-center-img12.png" alt="">
                    <span>售后服务</span>
                </a>
            </div>
            <!-- 售后服务的结束 -->
            <!-- 退出登录的开始 -->
            <div class="person-last">
                <span>退出登录</span>
            </div>
            <!-- 退出登录的结束 -->
        </div>
        <my-footer :active="4"></my-footer>
    </div>
</template>

<script>
    import MyFooter from '../../components/footer/my-footer';
    import {IMGHOSTNAME,SUCCESS} from "../../config/base";
    // import {Toast} from 'vant';
    import {info} from "../../api/users";

    export default {
        name: "my",
        data(){
          return{
              imgHostName:IMGHOSTNAME,
              users:[],
          }
        },
        methods:{
            getUser(){
                info('api/usersfront/2').then(res=>{
                    let data = res.data;
                    window.console.log(data);
                    if(data.code==SUCCESS){
                        this.users = data.data;
                    }
                })
            }
        },
        computed:{
            name(){
                 return this.$store.state.nickname
            }
        },
        beforeMount(){
            this.getUser();
        },
        components: {
            MyFooter
        }
    }
</script>

<style scoped>
    @import url(./css/my.css);

</style>