<template>
        <div class="beijing">
            <!-- 头部开始 -->
            <div class="toubu">
                <router-link :to="{name:'list',query:{id:goods.cid}}">
                    <div class="toubuleft"></div>
                </router-link>
                <div class="center">
                    商品详情
                </div>
                <div class="touburight">
                </div>
            </div>
            <!-- 头部结束 -->
            <!-- 分享点击页面 -->
        <div class="fenxiang">
            <div class="huise"></div>
            <div class="fx">
                <div class="fx-1">分享</div>
                <div class="hehe">
                    <div class="weixin">
                        <div class="tu"></div>
                        <div class="zi">QQ</div>
                    </div>
                    <div class="weixin">
                        <div class="tu">
                            <img src="img/class/微信.png">
                        </div>
                        <div class="zi">微信</div>
                    </div>
                    <div class="weixin">
                        <div class="tu">
                            <img src="img/class/QQ空间.png">
                        </div>
                        <div class="zi">QQ空间</div>
                    </div>
                    <div class="weixin">
                        <div class="tu">
                            <img src="img/class/微博.png">
                        </div>
                        <div class="zi">新浪微博</div>
                    </div>
                    <div class="weixin-1">
                        <div class="tu">
                            <img src="img/class/豆.png">
                        </div>
                        <div class="zi">豆瓣网</div>
                    </div>
                    <div class="weixin-2">
                        <div class="tu">
                            <img src="img/class/支付宝.png">
                        </div>
                        <div class="zi">支付宝</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="neirong">
            <!--&lt;!&ndash;轮播点&ndash;&gt;-->
            <van-swipe :autoplay="3000" indicator-color="#ff9201">
                <van-swipe-item v-for="(item,index) in (goods.gbanner).split(',')" :key="index">
                    <a href="">
                        <img :src="imgHost+item"  alt="">
                    </a>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 第一块 -->
        <div class="kuaiyi">
            <div class="shang">
                <div class="yi">￥{{goods.nprice}}</div>
                <div class="er">原价￥{{goods.oprice}}</div>
                <div class="san" v-if="goods.oprice>goods.nprice">特价</div>
            </div>
            <div class="xia">
                {{goods.gname}}
            </div>
        </div>
        <!-- 第二块 -->
        <div class="kuaire">商品详情</div>
        <div class="kuaisan">
            <div class="aa"><i>品牌： </i> {{goods.gbrand}}
            </div>
            <div class="bb">
                <div class="aa"><i>产品规格：  </i> {{goods.gnorms}}</div>
            </div>
        </div>
        <div class="kuaisi">图文详情</div>
        <div  v-for="(i,index) in (goods.gdetail).split(',')" :key="index" v-lazy="i">
            <img :src="imgHost+i"  alt="" width="100%">
        </div>
        <!-- 内容结束 -->
        <!-- 底部开始 -->

        <div class="dibu">
            <a href="index.html">
                <div class="dibu-1">
                    <div class="dibu1-img"></div>
                    <div class="wemzi">首页</div>
                </div>
            </a>
            <a href="shopping cart.html">
                <div class="dibu-2">
                    <div class="dibu2-img"></div>
                    <div class="wemzi">购物车</div>
                </div>
            </a>
            <div class="dibu-3">加入购物车</div>
            <div class="dibu-4">立即购买</div>
        </div>
        <!-- 底部结束 -->
    </div>
</template>

<script>
    import {api} from "../../config/api";
    import {IMGHOSTNAME} from "../../config/base";

    export default {
        name: "goodsDetail",
        data: function () {
            return {
                id: 0,
                imgHost:IMGHOSTNAME,
                goods:[],
            }
        },
        methods:{
            getGoods(){
                api('get','/api/goodsfront/'+this.id).then(res => {
                    this.goods = res.data;
                })
            }
        },
        beforeMount() {
            this.id = this.$route.query.id;
            this.getGoods();
        }
    }
</script>

<style>
    .van-swipe__indicator--active{
        background-color: #666666;
        width: 0.25rem
    }
    .van-swipe__indicator{
        width: 0.1rem;
        height: 0.1rem;
        background-color: #dddddd;
    }
</style>
<style scoped>
    @import "css/class-in.css";
    .van-swipe {
        height: 7.5rem;
        background-color: #fff;
    }

    .van-swipe, .van-swipe-item, .van-swipe-item a, .van-swipe-item img {
        width: 100%;
        height: 100%;
        display: block;
    }
    .van-swipe__indicator--active{
        background-color: #666666;
        width: 0.25rem
    }
    .van-swipe__indicator{
        width: 0.1rem;
        height: 0.1rem;
        background-color: #dddddd;
    }
</style>