<template>
    <div>
        <my-header></my-header>
        <van-swipe :autoplay="3000" indicator-color="#ff9201">
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img2.jpg" alt="">
                </a>
            </van-swipe-item>
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img3.jpg" alt="">
                </a>
            </van-swipe-item>
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img2.jpg" alt="">
                </a>
            </van-swipe-item>
            <van-swipe-item>
                <a href="">
                    <img src="./img/index/banner-img3.jpg" alt="">
                </a>
            </van-swipe-item>
        </van-swipe>
        <!-- 金刚区开始 -->
        <div class="jingang">
            <ul class="jingang-list">
                <li class="jingang-item">
                    <a href="sgth.html">
                        <div class="img">
                            <img src="./img/index/foot.png" alt="">
                        </div>
                        <div class="jingang-text">水果特惠</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="mrbq.html">
                        <div class="img" style="background-color: #E6C3BD">
                            <img src="./img/index/today.png" alt="">
                        </div>
                        <div class="jingang-text">每日必抢</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="hcfl.html">
                        <div class="img" style="background-color: #EED0B8">
                            <img src="./img/index/fuli.png" alt="">
                        </div>
                        <div class="jingang-text">嗨吃福利</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="fltj.html">
                        <div class="img" style="background-color: #8CB2C5">
                            <img src="./img/index/good.png" alt="">
                        </div>
                        <div class="jingang-text">鲜蜂力荐</div>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 金刚区结束 -->
        <!-- 酒水开始 -->
        <div v-if="cateGoods.length">
            <div class="youxuan" v-for="cate in cateGoods" :key="'cate'+cate.id">
                <div class="temai-text">
                    <span>{{cate.cname}}</span>
                    <router-link :to="{name:'list',query:{id:cate.id}}">
                        <i class="iconfont icon-rightarrow"></i>
                    </router-link>
                </div>
                <div class="temai-img">
                    <div class="img-item">
                        <img :src="imgHostName+cate.cthumb" :alt="cate.cname" :title="cate.cname">
                    </div>
                </div>
                <ul class="furit-list">
                    <li class="fruit-item" v-for="goods in cate.goods" :key="'good'+goods.id">
                        <router-link :to="{name:'goodsdetail',query:{id:goods.id}}">
                        <div class="fruit-img">
                                <img :src="imgHostName+goods.gthumb" :alt="goods.gname" :title="goods.gname">
                        </div></router-link>
                        <div class="fruit-title">{{goods.gname}}</div>
                        <div class="zeng"></div>
                        <div class="fruit-price">￥{{goods.nprice}}
                            <del style="font-size: 12px;color: #979797; margin-left:0.04rem;">￥{{goods.oprice}}</del>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 酒水结束 -->
        <my-footer :active="1"></my-footer>
    </div>
</template>

<script>
    import MyHeader from '../../components/header/my-header';
    import MyFooter from '../../components/footer/my-footer';
    import {IMGHOSTNAME} from "../../config/base";
    import {api} from "../../config/api";

    export default {
        name: "index",
        data() {
            return {
                cateGoods:[],
                imgHostName:IMGHOSTNAME,
            }
        },
        methods:{
            getCateGoods(){
                api('GET','/api/index').then(res=>{
                    let data = res.data;
                    this.cateGoods = data;
                })
            },
        },
        beforeMount(){
            this.getCateGoods();
        },
        components: {
            MyHeader, MyFooter
        }
    }

</script>

<style scoped>
    @import "http://at.alicdn.com/t/font_1390962_brph6ejz11c.css";
    body {
        background-color: #F7F7F7;
    }
    .van-swipe {
        height: 2.7rem;
        background-color: aquamarine;
    }

    .van-swipe, .van-swipe-item, .van-swipe-item a, .van-swipe-item img {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* 金刚区开始 */

    .jingang {
        width: 100%;
        height: 2.18rem;
        background-color: #fff;
        padding-bottom: 0.3rem;
    }

    .jingang > .jingang-list {
        display: flex;
        justify-content: space-around;
        overflow: hidden;
    }

    .jingang > .jingang-list > .jingang-item {
        width: 25%;
        color: black;
        text-align: center;
        margin-top: 0.3rem;
    }

    .jingang > .jingang-list > .jingang-item > a {
        color: black;
    }

    .jingang-item > a > .img {
        width: 50px;
        height: 50px;
        background-color: #9BCBB5;
        border-radius: 50%;
        margin: 0 auto;
    }

    .jingang-item > a > .jingang-text {
        margin-top: 0.2rem;
        font-size: 0.28rem;
    }

    .jingang-item > a > .img > img {
        width: 0.52rem;
        height: 0.52rem;
        margin-top: 0.24rem;
    }

    /* 金刚区结束 */
    /* 特卖开始 */

    .temai {
        width: 100%;
        height: 3.26rem;
        background-color: #fff;
        margin-top: 0.1rem;
    }

    .temai-text {
        width: 100%;
        height: 0.9rem;
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.9rem;
    }

    .temai-text>i {
        margin-left: 0.1rem;
    }

    .temai>.temai-img {
        width: 100%;
        height: 2.36rem;
        padding: 0 3% 0.2rem 3%;
        box-sizing: border-box;
    }

    .temai>.temai-img>.img-item {
        width: 33.3%;
        float: left;
    }

    .temai>.temai-img>.img-item>img {
        width: 93%;
        display: block;
        margin: 0 auto;
    }


    /* 特卖结束 */

    .youxuan {
        width: 100%;
        height: 7.14rem;
        background-color: #fff;
        margin-top: 0.1rem;
    }

    .youxuan > .temai-img {
        width: 100%;
        height: 2.36rem;
        padding: 0 3% 0.2rem 3%;
        box-sizing: border-box;
    }
    .youxuan > .temai-img > .img-item {
        height: 100%;
        width: 100%;
    }
    .img-item>a{
        width: 100%;
        height: 100%;
    }
    .youxuan > .temai-img > .img-item > img {
        height: 100%;
        width: 100%;
        border-radius: 1rem;
        display: block;
        margin: 0 auto;
    }

    .furit-list {
        width: 100%;
        height: 3.88rem;
        display: flex;
        justify-content: space-between;
    }

    .furit-list > .fruit-item {
        width: 33.333333%;
        height: 100%;
    }
    .fruit-item  .fruit-img{
        width: 100%;
    }
    .fruit-item  .fruit-img > img {
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin: 0 auto;
    }

    .fruit-item > .fruit-title {
        width: 100%;
        padding: 0 5%;
        box-sizing: border-box;
        height: 0.8rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        /* overflow: hidden; */
    }

    .fruit-item > .fruit-price {
        width: 100%;
        padding: 0 5%;
        box-sizing: border-box;
        font-size: 14px;
        color: #EA4D13;
        line-height: 0.36rem;
        height: 0.8rem;
        margin-top: 0.16rem;
    }

    .fruit-item > .zeng {
        width: 100%;
        height: 0.36rem;
        padding: 0 5%;
        box-sizing: border-box;
    }

    /* 优选结束 */
</style>