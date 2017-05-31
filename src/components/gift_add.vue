<template>
  <div id="addGift">
    <router-link to="/">回到首页</router-link>
    <br />
    <h1>在这里我们添加礼物</h1>
    <label for="name">礼物名称</label>
    <input type="text" id="name" v-model="name"/>
    <br />
    <label for="price" >礼物价格</label>
    <input type="text" id="price" v-model="price"/>
    <br />
    <label for="buyUrl">购买地址</label>
    <input type="text" id="buyUrl" v-model="buyUrl" @change="httpURL"/>
    <span v-if="URLalert !== ''" style="color: red;">{{URLalert}}</span>
    <br />
    <label for="preview">添加图片</label>
    <input type="file" id="preview" ref="file" @change="fileChange" style="width: 173px;"/>
    <br />
    <label>预览图片</label>
    <div style="width: 173px;height: 21px;display: inline-block;vertical-align: middle;" v-if="preview == ''"></div>
    <img :src="preview" v-if="preview != ''" style="width: 173px;vertical-align: middle;">
    <br />
    <label>添加备注</label>
    <textarea placeholder="在这里写下你想说的话" v-model="message" style="width: 173px;vertical-align: middle;box-sizing: border-box;"></textarea>
    <br />
    <br />
    <button class="goAdd" @click="AddGift">添加礼物</button>
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
        URLalert: ''
      }
    },
    methods: {
      httpURL: function () {
//        let that = this
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)/.test(this.buyUrl)) {
          this.URLalert = ''
        } else {
          this.URLalert = '请输入正确的网址'
        }
      },
      AddGift: function () {
        let that = this
        Axios.post('http://localhost:3000/gift/add', {
          token: 'whyccup',
          name: that.name,
          price: that.price,
          buyUrl: that.buyUrl,
          preview: that.preview,
          message: that.message
        },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function (res) {
            if (res.status === 200) {
              alert('添加礼物成功')
            }
          })
      },
      fileChange: function () {
        let files = this.$refs.file.files[0]
        this.imgPreview(files)
      },
      imgPreview (files) {
        let that = this
        // 判断文件格式
        if (/^image/.test(files.type)) {
          // 创建一个reader
          let reader = new FileReader()
          // 将图片将转成 base64 格式
          reader.readAsDataURL(files)
          // 读取成功后的回调
          reader.onloadend = function () {
            that.preview = this.result
          }
        } else {
          alert('请不要上传其他文件')
        }
      }
    }
  }
</script>
