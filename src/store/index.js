import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import {SUCCESS} from "../config/base";
import {getCart} from "../api/cart";
import createPersistedState from 'vuex-persistedstate'

let store = new Vuex.Store({
    //state是数据的唯一来源
    //mutations 状态修改的唯一方法
    state: {
        token: '',
        isShow: false,
        cart: null,
    },
    getters: {
        getGoodsNum: function (state) {
            return function (gid) {
                let num = 0;
                if (!state.cart) {
                    return num
                }
                let goods = state.cart.goods.filter(ele => ele.gid == gid)[0];
                if (goods) {
                    num = goods.num;
                }
                return num;
            }
        },
        goodsTotal(state) {
            if (!state.cart) {
                return
            }
            return state.cart.total;
        },
        cartPrice(state) {
            if (!state.cart) {
                return
            }
            return state.cart.price;
        },
        isFullStatus(state) {
            return state.cart && state.cart.goods.every(ele => ele.status);
        },

        existSelectGoods(state){
            let flag = false;
            if(state.cart){
                 flag = state.cart.goods.some(ele => ele.status);
            }
            return flag;
        }
    },
    mutations: {
        changeToken(state, token) {
            state.token = token
        },
        toggleIsShow(state) {
            state.isShow = !state.isShow;
        },
        setCart(state, data) {
            state.cart = data;
        },
        //商品累加  //添加商品到购物车
        incGoods(state, payload) {
            //先判断是否存在购物车
            let {gid, gname, gthumb, nprice, uid, cid} = payload;
            if (!state.cart) {
                //初始化购物车
                state.cart = {
                    cid, uid, total: 1, price: nprice, goods: []
                };
            }
            //购物车中是否存在这件商品
            let goods = state.cart.goods.filter(ele => ele.gid == gid)[0];
            if (goods) {
                goods.num++//有  num+1
            } else {
                state.cart.goods.push({'gid': gid, num: 1, status: 1, gname, gthumb, nprice}) //push追加一条商品
            }
        },
        //加时商品的总数
        calcTotal(state) {
            let total = 0;
            let goods = state.cart.goods.filter(ele => ele.status);
            if (goods.length) {
                total = goods.reduce((prev, current) => {
                    return prev + current.num;
                }, 0);
            }
            state.cart.total = total;
        },
        //加时商品的总价钱
        calcPrice(state) {
            let price = 0;
            let goods = state.cart.goods.filter(ele => ele.status);
            if (goods.length) {
                price = goods.reduce(function (prev, current) {
                    return prev + current.num * current.nprice;
                }, 0);
            }
            state.cart.price = price;
        },
        //-------------------------------------
        //商品点击减1
        reduceGoods(state, payload) {
            let {gid, price} = payload;
            let goods = state.cart.goods.filter(ele => ele.gid == gid)[0];
            if (goods) {
                goods.num--;
                state.cart.total--;
                state.cart.price = state.cart.price - price;
            }
        },
        //改变状态
        toggleGoodsStatus(state, payload) {
            let gid = payload.gid;
            let goods = state.cart.goods.filter(ele => ele.gid == gid)[0];
            goods.status = goods.status ? 0 : 1;
        },
        //下单成功后做的事情
        ordersFinish(state){
            state.cart.goods = state.cart.goods.filter(ele=>!ele.status);
            if(state.cart.goods.length){
                state.cart.total = 0;
                state.cart.price = 0;
            }else{
                state.cart = null;
            }
        }
    },
    actions: {
        setCart(content) {
            getCart('api/cartfront/31').then(res => {
                let data = res.data;
                window.console.log(data);
                if (data.code == SUCCESS && data.data) {
                    let datas = data.data ? data.data : null;
                    content.commit('setCart', datas)
                }
            })
        },
    },
    plugins: [createPersistedState()]
});

export default store