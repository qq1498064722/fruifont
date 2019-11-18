<template>
    <div>
        <div class="hd">
            <span><slot></slot></span>
            <router-link :to="{name:'index'}">
                <div class="hd-left">
                    <img src="../../views/content/img/index/arrow-left.png" style="width: 50%" alt="">
                </div>
            </router-link>
        </div>
        <div class="kong"></div>
    </div>
</template>

<script>
    export default {
        name: "my-header-list",

    }
</script>

<style scoped>

    .kong {
        width: 100%;
        height: 0.88rem;
    }

    .hd {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
        text-align: center;
        z-index: 666;
        background-color: #fff;
        border-bottom: 1px solid #F6F6F4;
    }

    .hd-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 0.8rem;
        height: 0.88rem;
        /* float: left; */
    }

    .hd-left img {
        float: left;
        margin-left: 0.2rem;
        margin-top: 0.24rem;
    }

</style>