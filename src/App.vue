<template>
  <div id="app">
    <my-loading></my-loading>
    <router-view/>
  </div>
</template>
<script>
  import MyLoading from './components/loading/my-loading';
  export default {
    name: "app",
    components: {
      MyLoading
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
