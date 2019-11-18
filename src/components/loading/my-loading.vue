<template>
    <div class="loading" v-show="isShow">
        <div class="loading-box"></div>
    </div>
</template>

<script>
    export default {
        name: "my-loading",
        computed:{
            isShow(){
                return this.$store.state.isShow
            }
        }
    }
</script>

<style scoped>
    .loading {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: rgba(0,0,0,0.5);
    }
    .loading-box{

    }

</style>