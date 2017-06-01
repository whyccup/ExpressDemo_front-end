<template>
  <div id="hello">
    <h1>一个抽选礼物的App</h1>
    <button class="goAdd" @click="goAdd">添加礼物</button>
    <button class="goGet" @click="goGet">获取礼物</button>
    <br>
    <br>
    <button class="goLuck" @click="goLuck">抽奖</button>
  </div>
</template>

<script>
  import Axios from 'axios'
  Axios.default.baseURL = 'http://localhost:3000/'

  export default{
    data () {
      return {
      }
    },
    methods: {
      goAdd: function () {
        this.$router.push('/gift/add')
      },
      goGet: function () {
        this.$router.push('/gift/get')
      },
      goLuck: function () {
        this.$router.push('/luck')
      }
    }
  }
</script>
