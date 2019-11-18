<template>
    <div class="all">
        <!-- 头开始 -->
        <div class="header">
            <div class="header-l">
                <span class="hedar-l-span">
                        派送至：北京石景山
                </span>
                <i class="iconfont iconxiangxia"></i>
            </div>
            <div class="header-r">
                <img src="../../views/content/img/class/ss.png" alt="">
            </div>
        </div>
        <!-- 头结束 -->
        <!-- content开始 -->
        <div class="kong"></div>
        <!-- 右边标题点击部分开始 -->
        <div class="title-fenlei">
            <div class="fenlei-list fenlei-list-text1">
                全部分类
            </div>
            <div class="fenlei-list">
                进口水果
            </div>
            <div class="fenlei-list">
                国产水果
            </div>
            <div class="fenlei-list">
                柑橘橙柚
            </div>
            <div class="fenlei-list">
                苹果/梨
            </div>
            <div class="fenlei-list">
                桃杏梅枣
            </div>
        </div>
        <!-- 右边标题点击部分结束 -->

        <div class="content">
            <!-- 左边列表开始 -->
            <div class="zuo-content">
                <div class="zuo">
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item v-for="item in category" :title="item.cname" @click="changeCate(item.id)"
                                          :key="item.id"/>
                    </van-sidebar>
                </div>
            </div>
            <!-- 左边列表结束 -->
            <!-- 右边开始 -->
            <div id="right" style="touch-action: none;">

                <!-- 右边商品开始 -->
                <div class="right-list">
                    <!-- 1   开始 -->
                    <div class="content-item shop-list1" ref="container">
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                            <van-list
                                    v-model="loading"
                                    :finished="finished"
                                    finished-text="没有更多了"
                                    @load="onLoad"
                                    :immediate-check="false"
                            >

                                <!-- 右边标题部分开始 -->
                                <div class="content-right-title">
                                    <span class="title-span zonghe">综合排序</span>
                                    <span class="title-span jiage" @click="getGoods(cid)">
                                    按价格
                                    <div class="price-i">
                                        <i class="iconfont iconzhcc_xiangshangjiantou"></i>
                                        <i class="iconfont iconxiangxia " style="font-size: 13px"></i>
                                    </div>
                                    </span>
                                    <span class="title-span fenleibian">分类</span>
                                </div>
                                <div style="height: 0.8rem;"></div>
                                <!-- 右边标题部分结束 -->
                                <div class="shop-box1" v-for="(good,index) in goods" :key="index">
                                    <router-link :to="{name:'goodsdetail',query:{id:good.id}}">
                                        <div class="shop-box-img">
                                            <img v-lazy="imgHostName+good.gthumb" :alt="good.gname" :title="good.gname">
                                        </div>
                                    </router-link>
                                    <div class="shop-box-font">
                                        <router-link :to="{name:'goodsdetail',query:{id:good.id}}">
                                            {{good.gname}}</router-link>
                                        <span>￥{{good.nprice}}</span>
                                        <div class="shop-cart" >
                                            <div class="jian" @click="handleReduce(good.id,good.nprice)" v-if="$store.getters.getGoodsNum(good.id)">
                                                <img src="../../views/content/img/class/jian.png" alt="">
                                            </div>
                                            <span class="count">{{$store.getters.getGoodsNum(good.id)}}</span>
                                            <div class="jia" @click="handleAddCart(good)">
                                                <img src="../../views/content/img/class/jia.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </van-list>
                        </van-pull-refresh>
                    </div>
                    <!-- 1   结束 -->
                </div>
                <!-- 右边商品结束 -->
            </div>
        </div>
        <!-- content结束 -->
        <div style="height: 1rem;"></div>
        <my-footer :active="2"></my-footer>
    </div>
</template>
<script>
    import MyFooter from '../../components/footer/my-footer';
    import {IMGHOSTNAME, HOSTNAME, SUCCESS} from "../../config/base";
    import axios from 'axios';
    import {api} from "../../config/api";
    import {addCart,reduceCart} from "../../api/cart";

    export default {
        name: "class",
        data() {
            return {
                imgHostName: IMGHOSTNAME,
                activeKey: 0,
                category: [],
                isLoading: false,
                cid: 0,
                goods: [],
                loading: false,
                finished: false,
                current: 0,
                limit: 10,
                total: 0,
                container: null,
                sort: 'asc'
            }
        },
        methods: {
            //点击获取分类的id
            changeCate(id) {
                this.cid = id;
            },
            //获取分类名称cname
            getCate() {
                axios.get(HOSTNAME + '/api/categoryfront')
                    .then(res => {
                        this.category = res.data.data;
                        this.cid = res.data.data[0].id;
                        // this.onLoad();
                    })
                    .catch(error => window.console.log(error))
            },
            //下拉刷新
            onRefresh() {
                // setTimeout(() => {
                this.isLoading = true;
                this.current++;
                this.finished = true;
                this.$toast('刷新成功');
                if (this.current != 1 && this.current > this.total) {
                    this.isLoading = false;
                    return
                }
                api('GET', '/api/goodsfront', {
                    'cid': this.cid,
                    'limit': this.limit,
                    'page': this.current,
                }).then(res => {
                    // this.category = res.cate;
                    let total = res.total;
                    let goods = res.data;
                    !this.total && (this.total = Math.ceil(total / this.limit));
                    // this.goods.push(...goods);
                    this.goods = goods;
                    this.$nextTick(() => {
                        this.finished = true;
                        this.isLoading = false;
                    });
                })
                // }, 500);
            },
            //上拉加载
            onLoad() {
                setTimeout(() => {
                    this.current++;
                    axios.get(HOSTNAME + '/api/goodsfront', {
                        params: {
                            cid: this.cid,
                            page: this.current,
                            limit: this.limit,
                        }
                    }).then(res => {
                        let data = res.data;
                        if (data.code === SUCCESS) {
                            window.console.log(data.data);
                            !this.total && (this.total = Math.ceil(data.total / this.limit));
                            this.goods.push(...data.data);
                        }
                        this.$nextTick(() => {
                            this.isLoading = false;
                            this.loading = false;
                        });
                        if (this.current >= this.total) {
                            this.finished = true
                        }
                        window.console.log(this.finished);
                    }).catch(error => window.console.log(error))
                }, 500);
            },
            getGoods(id) {
                axios.get(HOSTNAME + '/api/index/' + id, {
                    params: {
                        sort: this.sort
                    }
                })
                    .then(res => {
                        // this.goods=res.data.data;
                        this.goods = res.data.data;
                    })
                    .catch(error => window.console.log(error))
            },
            //点击添加商品到购物车
            handleAddCart(goods) {
                let {id,nprice,gname,gthumb} = goods;
                addCart('/api/cartfront', {gid:id, nprice}).then(res => {
                    let data = res.data;
                    if(data.code == SUCCESS){
                        let{uid,cid} = data.data;
                        this.$store.commit('incGoods',{uid,cid,gid:id,nprice,gname,gthumb});
                        this.$store.commit('calcTotal');
                        this.$store.commit('calcPrice');
                    }
                })
            },
            //点击减少商品
            handleReduce(gid,price){
                reduceCart('api/shopfront',{gid,price}).then(res=>{
                    let data = res.data;
                    this.$store.commit('reduceGoods',{gid,price});
                    window.console.log(data);
                })

            }
        },
        mounted() {
            this.container = this.$refs.container;
        },
        beforeMount() {
            this.getCate();
        },
        watch: {
            cid() {
                //点击分类获取新的分类页面的第一页商品
                this.current = 0;
                this.finished = false;
                this.total = 0;
                this.goods = [];
                this.onLoad();
            }
        },
        components: {
            MyFooter
        }
    }
</script>
<style>
    .van-sidebar-item--select {
        border-color: #ff9201;
    }

    .van-sidebar-item {
        display: block;
        box-sizing: border-box;
        padding: 20px 12px 20px 8px;
        line-height: 20px;
        background-color: #fff;
        border-bottom: 1px solid #efeaee;
    }

    .van-sidebar {
        width: 100%;
    }

    .van-sidebar-item {
        text-align: center;
        padding: 15px 12px 15px 12px;
    }
</style>
<style scoped>
    @import "css/class.css";
    @import "http://at.alicdn.com/t/font_1342888_z8owbg6st07.css";

</style>