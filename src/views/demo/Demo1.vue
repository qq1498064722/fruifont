<template>
    <div>
        <!--<h1>dome1</h1>-->
        <!--{{names}}{{sex1}}-->
        <!--<ul v-for="item in skill" :key="item">-->
            <!--<li>{{item}}</li>-->
        <!--</ul>-->
        <!--<ul v-for="item in skill1" :key="item">-->
            <!--<li>{{item}}</li>-->
        <!--</ul>-->
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Demo1",
        data(){
            return{
                count:0,
            }
        },
        computed: {
            //
            // names () {
            //     return this.$store.getters.resName
            // },
            // skill () {
            //     return this.$store.getters.filterSkill
            // },
            // skill1 () {
            //     return this.$store.getters.filterSkill1('h')
            // },
            //
            // ...mapState({
            //     sex1:'sex'
            // }),
            ...mapState(['skill'])
        }
    }
</script>

<style scoped>
    .van-button{
        width: 4rem;
        height: 1.5rem;
        font-size: 1rem;
    }
</style>