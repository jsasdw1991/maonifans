<template>
  <div id="mainLayout">
    主要的mainLayout
    <router-link :to="{name: 'home'}">主页</router-link>
    <router-link :to="{ name: 'profile'}">个人中心</router-link>
    <router-link :to="{ name: 'login'}">登录</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "mainLayout",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="scss">
</style>
