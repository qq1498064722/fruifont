<template>
    <div>
        <!-- 头部导航栏开始 -->
        <my-header-list>{{cname}}</my-header-list>
        <!-- 头部导航栏结束 -->
        <!-- 轮播图 -->
        <van-pull-refresh v-model="isLoading" @refresh="getCateGoods">
            <div class="banner" style=" width: 100%;height: 3.2rem;">
                <img :src="imgHostName+cthumb" style="width: 100%;height: 100%;" alt="">
            </div>
            <!-- 轮播图 -->
            <van-sticky :offset-top="40">
                <div class="nav" style="background-color: #fff">
                    <div class="nav-list">
                        <div class="item">综合</div>
                        <div class="item">按价格</div>
                        <div class="item">分类</div>
                    </div>
                </div>
            </van-sticky>
            <!-- 产品开始 -->
            <div class="cp-box" v-for="(i,index) in goods" :key="'goodss'+index">
                <div class="cp-box-left">
                    <router-link :to="{name:'goodsdetail',query:{id:i.id}}">
                        <img :alt="i.gname" :title="i.gname" v-lazy="imgHostName+i.gthumb">
                    </router-link>
                </div>
                <div class="cp-box-right">
                    <div class="cp-box-right-top">
                        <span>{{i.gname}}</span>
                    </div>
                    <div class="cp-box-right-center">
                        ￥{{i.nprice}}
                        <i v-if="i.nprice !== i.oprice">￥{{i.oprice}}</i>
                    </div>
                    <router-link :to="{name:'goodsdetail',query:{id:i.id}}">
                        <button class="btn">立即购买</button>
                    </router-link>
                </div>
            </div>
        </van-pull-refresh>


        <!-- 产品结束 -->
    </div>

</template>

<script>
    import {api} from "../../config/api";
    import {IMGHOSTNAME} from "../../config/base";
    import MyHeaderList from '../../components/header/my-header-list';


    export default {
        name: "List",
        data: function () {
            return {
                imgHostName: IMGHOSTNAME,
                id: 0,
                category: null,
                cname: '',
                cthumb: '',
                goods: [],
                isLoading: false,
                limit: 2,
                current: 0,
                total: 0,
            }
        },
        methods: {
            getCate(id) {
                api('GET', '/api/categoryfront/' + id).then(res => {
                    this.category = res.data;
                    this.cname = res.data.cname;
                    this.cthumb = res.data.cthumb;
                })
            },
            getCateGoods() {
                this.isLoading = true;
                this.current++;
                if (this.current != 1 && this.current > this.total) {
                    this.isLoading = false;
                    return
                }
                api('GET', '/api/goodsfront', {
                    'cid': this.id,
                    'limit': this.limit,
                    'page': this.current,
                }).then(res => {
                    // this.category = res.cate;
                    let total = res.total;
                    let goods = res.data;
                    !this.total && (this.total = Math.ceil(total / this.limit));
                    // this.goods.push(...goods);
                    this.goods = this.goods.concat(goods);
                    this.$nextTick(() => {
                        this.isLoading = false;
                    });
                })
            },
        },
        beforeMount() {
            this.id = this.$route.query.id;
            this.getCate(this.id);
            this.getCateGoods();
        },
        components: {
            MyHeaderList
        }
    }
</script>

<style scoped>
    @import "css/sgth.css";

    .nav {
        margin-top: 0.1rem;
    }

    .nav-list {
        width: 100%;
        height: 0.8rem;
        padding: 0 0.24rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .nav-list .item {
        width: 1.7rem;
        height: 0.8rem;
        text-align: center;
        color: #f47c02;
        line-height: 0.8rem;
    }
</style>