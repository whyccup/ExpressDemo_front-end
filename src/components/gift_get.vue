<template>
  <div id="getGift">
    <router-link to="/">回到首页</router-link>
    <br />
    <h1>在这里我们得到一个礼物</h1>
    <button class="goGet" @click="GetGift">获取礼物</button>
    <br />
    <br />
    <label>礼物名称</label>
    <div>{{oneGift.name}}</div>
    <br />
    <label>礼物价格</label>
    <div >{{oneGift.price}}</div>
    <br />
    <label>购买地址</label>
    <div><a :href="this.oneGift.buyUrl">{{oneGift.buyUrl}}</a></div>
    <br />
    <label>预览图片</label>
    <img :src="this.oneGift.preview" style="width: 173px;vertical-align: middle;">
    <br />
    <label>礼物备注</label>
    <div>{{oneGift.message}}</div>
  </div>
</template>
<script>
  import Axios from 'axios'

  export default{
    data () {
      return {
        name: '',
        price: '',
        buyUrl: '',
        message: '',
        preview: '',
        oneGift: {}
      }
    },
    methods: {
      GetGift: function () {
        let that = this
        Axios.get('http://localhost:3000/gift/get', {
          params: {
            giftPwd: 'whyccup'
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (res) {
            console.dir(res)
            let num = res.data.data.gift.length
            that.oneGift = res.data.data.gift[parseInt(num * Math.random())]
          })
      }
    }
  }
</script>
<style>
  #getGift div{
    width: 173px;
    height: 21px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
