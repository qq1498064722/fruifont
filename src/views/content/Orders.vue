<template>
    <div>
        <my-header-list>确认订单</my-header-list>
        <!-- 黑色部分 -->
        <div style="height: 0.3rem;">
            <!--<span class="top-top"></span>-->
            <!--<span class="top-top1">已发货</span>-->
            <!--<span class="top-center">物流信息：客户签收人：邮件收发 已签收 感谢使用圆通快递，期待再次为您服务！</span>-->
            <!--<span class="top-down">2017-10-23 12:25:12</span>-->
        </div>
        <!-- 黑色部分结束 -->
        <!-- 信息开始 -->
        <div class="xx" v-if="address">
            <span class="xx-a1">{{address.names}}</span>
            <span class="xx-a2">{{address.tel}}</span>
            <span class="xx-a3">默认</span>
            <div class="xx-b">
                <span class="xx-img1"></span>
                <span class="xx-img2">{{address.address}}</span>
            </div>
        </div>
        <!-- 信息结束 -->
        <!-- 中部开始 -->
        <div class="center" v-if="orders">
            <div class="center-top">
            <span class="center-top-left">
                <i class="center-top-left-1"></i>
                确认订单
            </span>
                <span class="center-top-left-2">
                联系客服
            </span>

            </div>
            <div class="center-center" v-for="goods in orders.goods" :key="'goods'+goods.id">
                <img :src="imgHostName+goods.gthumb" alt="">
                <div class="center-center-center">
                    <span class="center-center-center-1">{{goods.gname}}</span>
                    <span class="center-center-center-3">
                <i class="center-center-center-2">
                    ￥{{goods.nprice}}
                </i>
                <i class="center-center-center-4">
                    X{{goods.num}}
                </i>
            </span>
                </div>
            </div>

        </div>

        <!-- 中部结束 -->
        <!-- 底部开始 -->

        <div class="down-box1" v-if="orders">
            <span class="down-box1-1">应付总额</span>
            <span class="down-box1-2">￥{{orders.price}}</span>
        </div>
        <div class="down-box2">
            <span class="down-box1-3">运费 </span>
            <span class="down-box1-4">￥0.00</span>
        </div>
        <div class="down-box2">
            <span class="down-box1-3">税费 </span>
            <span class="down-box1-4">￥0.00</span>
        </div>
        <div class="down-box2">
            <span class="down-box1-3">发票信息 </span>
            <span class="down-box1-4">不需要发票</span>
        </div>


        <div class="down-down" v-if="orders">
            <div style="line-height: 0.8rem">订单详情</div>
            <p>订单编号:{{orders.ordernum}}</p>
            <p>下单时间:{{orders.ctime}}</p>
        </div>
        <!-- 底部结束 -->
        <div style="height: 1.2rem;width: 100%;"></div>
        <div class="pay-box" style="line-height: 1.2rem" v-if="orders">合计:
            <span class="text3">￥</span>
            <span id="AllTotal" class="text4">{{orders.price}}</span>
            <a class="scrart-totai-text7" @click="goPay" >
                <span>去支付</span>
            </a>
        </div>
    </div>
</template>

<script>
    import MyHeaderList from '../../components/header/my-header-list';
    import {queryAddress} from "../../api/address";
    import {queryOrder, payOrder} from "../../api/orders";
    import {SUCCESS, IMGHOSTNAME} from "../../config/base";

    export default {
        name: "Orders",
        data() {
            return {
                imgHostName: IMGHOSTNAME,
                massage: '',
                address: null,
                orders: null,
                ordernum: 0,
                price:0,
            }
        },
        methods: {
            setAddress() {
                queryAddress('/api/address/3').then(res => {
                    if (res.data.code == SUCCESS && res.data.data) {
                        this.address = res.data.data;
                    }
                })
            },
            setOrders() {
                queryOrder('/api/ordersfront/' + this.ordernum).then(res => {
                    if (res.data.code == SUCCESS && res.data.data) {
                        this.orders = res.data.data;
                        this.price = res.data.data.price;
                    }
                })
            },
            goPay() {
                payOrder('/api/ordersfront/'+this.ordernum,{
                    aid:this.address.aid,
                    remark:this.orders.remark,
                }).then(res=>{
                    let data = res.data;
                    let ordernum = this.ordernum;
                    let price = this.price;
                    if(data.code == SUCCESS){
                        this.$router.push({name:'pay',query:{ordernum,price}})
                    }

                })
            }
        },

        beforeMount() {
            this.ordernum = this.$route.query.ordernum;
            this.setAddress();
            this.setOrders()

        },
        components: {
            MyHeaderList
        }
    }
</script>

<style scoped>
    @import url(../../views/content/css/ddxq.css);
    .pay-box{
        width: 100%;
        height: 1.2rem;
        clear: both;
        padding: 0 0.24rem;
        box-sizing: border-box;
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .text3 {
        font-size: 0.28rem;
        color: #a3a3a3;
    }

    .text4 {
        font-size: 0.32rem;
        font-weight: 600;
        color: #FF9201;
    }

    #ckAll {
        margin-top: 0.2rem;
        margin-right: 0.2rem;
    }

    .scrart-totai-text7 {
        width: 1.4rem;
        text-align: center;
        float: right;
        background: #FF9201;
        height: 0.8rem;
        margin-top: 0.14rem;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.28rem;
    }


</style>