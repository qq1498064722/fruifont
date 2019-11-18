<template>
    <div>
        <my-header-list>请支付</my-header-list>
        <!-- 密码输入框 -->
        <van-password-input
                :value="value"
                info="密码为 6 位数字"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
        />
    </div>
</template>

<script>
    import MyHeaderList from '../../components/header/my-header-list';
    import {payOrder} from "../../api/orders";
    import {SUCCESS} from "../../config/base";

    export default {
        name: "Pay",
        data() {
            return {
                value: '',
                showKeyboard: true
            }
        },
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 6);
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            payOrders() {
                let {ordernum} = this.$route.query;
                //支付完成
                payOrder('/api/ordersfront/' + ordernum, {'status': 1}).then(res => {
                    let data = res.data;
                    if (data.code == SUCCESS) {
                        window.console.log(data);
                    }
                })
            }
        },
        components: {
            MyHeaderList
        },
        beforeMount(){
            let {ordernum} = this.$route.query;
            window.console.log(ordernum);
        },
        watch: {
            value() {
                if (this.value == 123456) {
                    this.payOrders();
                }
            }
        }
    }
</script>

<style scoped>

</style>