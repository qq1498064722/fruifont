<template>
    <div>
        <!-- 购物车头部导航开始 -->

        <div class="big-box">
            <my-header-list>购物车</my-header-list>
            <!-- 购物车头部导航结束 -->
            <!-- 购物车中间部分开始 -->
            <div class="shop-box">
                <div class="cart-title">收货时间
                    <i>今天30分钟可送达(可预订)</i>
                </div>
                <div class="bao">
                    <div class="list-box-shop1" v-if="cart">
                        <!-- 第一个商品开始 -->
                        <div class="index-goods" v-for="good in cart.goods" :key="'goods'+good.gid">
                            <div class="span-shopthree">
                                <div class="zongtihezi-1">
                                    <div class="two-quan" @click="changeStatus(good)">
                                        <img :style="{display:good.status?'block':'none'}" src="./img/check4.png" alt=""
                                             style="width: 0.4rem">
                                    </div>
                                </div>
                            </div>
                            <div class="shop-img">
                                <img :src="imgHostName+good.gthumb" alt="">
                            </div>
                            <div class="bottom-goods-textbox">
                                <span class="onetext">{{good.gname}}</span>
                                <div class="price-text">
                                    ￥
                                    <i class="price-jine" id="one-money">{{good.nprice}}</i>
                                </div>
                                <div class="shop-cart-box4">
                                    <div class="left-tubiao" @click="handleReduce(good.gid,good.nprice)"
                                         v-if="$store.getters.getGoodsNum(good.gid)"></div>
                                    <div id="tb-count" class="numebr">{{$store.getters.getGoodsNum(good.gid)}}</div>
                                    <div class="right-tbiao" @click="handleAddCart(good)"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 本店总计部分开始 -->
                        <div class="totai">
                            本店总计: ￥
                            <span class="wenzidibu">{{cart.price}}</span>
                        </div>
                        <!-- 底部开始 -->
                        <div class="shop-bottom2">
                            <div class="four-quan">
                                <div style="width: 100%;" @click="changeStatus(good)" :style="{display:isFullStatus?'block':'none'}" >
                                    <img src="./img/check4.png" alt="" style="width: 0.4rem;">
                                </div>
                            </div>
                            <div style="line-height: 0.9rem">
                                <span>全选</span>
                                <span class="text3">合计:￥</span>
                                <span id="AllTotal" class="text4">{{cart.price}}</span>
                                <span style="margin-left: 0.5rem">共 &nbsp;{{cart.total}}&nbsp; 件商品</span>
                                <a class="scrart-totai-text6" @click="settlement" :class="{active:existSelectGoods}">
                                    <span>去结算</span>
                                </a>
                            </div>
                            <span class="delete"></span>
                        </div>
                    </div>
                </div>
                <div v-if="!cart" style="line-height: 3rem;text-align: center">
                    您的购物车还没有商品
                    <div class="gwc">
                        <i class="iconfont icon-gouwuche"></i>
                        <router-link to="/classes">
                            去逛逛
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <my-footer :active="3"></my-footer>
    </div>

</template>

<script>
    import MyFooter from '../../components/footer/my-footer';
    import MyHeaderList from '../../components/header/my-header-list';
    import {SUCCESS, IMGHOSTNAME} from "../../config/base";
    import {addCart, reduceCart, toggleGoodsStatus,insertOrder} from "../../api/cart";
    import {mapGetters} from "vuex";
    import {Toast} from 'vant';
    // import {getGoods} from "../../api/shop";
    export default {
        name: "shop",
        data() {
            return {
                imgHostName: IMGHOSTNAME,
                cart: null,
            }
        },
        methods: {
            // //获取购物车商品
            // getGood() {
            //     getGoods('/api/shopfront',this.gid).then(res => {
            //         let data = res.data;
            //         if(data.code ==SUCCESS){
            //             this.goods = data.data;
            //         }
            //     })
            // },
            // //拿到gid(数组)
            // getGid() {
            //     for (let i = 0; i <= this.cart.goods.length-1; i++) {
            //         this.gid.push(this.cart.goods[i].gid)
            //         // window.console.log(this.cart.goods[i].gid)
            //     }
            // },
            //点击添加商品到购物车
            handleAddCart(goods) {
                let {gid, nprice, gname, gthumb} = goods;
                addCart('/api/cartfront', {gid, nprice}).then(res => {
                    let data = res.data;
                    if (data.code == SUCCESS) {
                        let {uid, cid} = data.data;
                        this.$store.commit('incGoods', {uid, cid, gid, nprice, gname, gthumb});
                        this.$store.commit('calcTotal');
                        this.$store.commit('calcPrice');
                    }
                })
            },
            //点击减少商品
            handleReduce(gid, price) {
                reduceCart('api/shopfront', {gid, price}).then(res => {
                    let data = res.data;
                    this.$store.commit('reduceGoods', {gid, price});
                    window.console.log(data);
                })

            },
            //点击改变状态
            changeStatus(goods) {
                let {gid, nprice} = goods;
                toggleGoodsStatus('/api/cartfront/34', {gid, price: nprice}).then(res => {
                    window.console.log(res);
                    this.$store.commit('toggleGoodsStatus', {gid});
                    this.$store.commit('calcTotal');
                    this.$store.commit('calcPrice');
                })
            },
            //去结算
            settlement(){
                if(!this.existSelectGoods){
                    Toast('请至少选择一件商品');
                }
                insertOrder('api/ordersfront').then(res=>{
                    let data = res.data;
                    if(data.code ==SUCCESS){
                        this.$store.commit('ordersFinish');
                        this.$router.push({name:'orders',query:{ordernum:data.data}})
                    }
                })
            }
        },
        beforeMount() {
            this.cart = this.$store.state.cart;
            // this.getGid();
            // this.getGood();
        },
        computed: {
            ...mapGetters({
                isFullStatus: 'isFullStatus',
                existSelectGoods:'existSelectGoods',
            })
        },
        components: {
            MyFooter, MyHeaderList
        }
    }
</script>

<style scoped>
    @import url(http://at.alicdn.com/t/font_1512271_lothiz1hvkp.css);
    @import url(../../views/content/css/shop.css);
    .gwc >i{
        color: #747474;
        display: block;
        font-size: 2.5rem;
    }
</style>