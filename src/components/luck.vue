<template>
  <div id="luck">
    <router-link to="/">回到首页</router-link>
    <br>
    <br>
    <!-- 制作刮刮卡背景图开始 -->
    <canvas id="myCanvas" width="200" height="100" ref="myCanvas" v-show="false"></canvas>
    <!--刮刮卡代码开始-->
    <canvas id="canvas" ref="canvas" style="border: 1px solid #000"></canvas>
    <!--<img :src="_imgData">-->
  </div>
</template>
<script>
  export default{
    data () {
      return {
        _imgData: ''
      }
    },
    methods: {
      createImg: function () {
        // 获取canvas定义其是2d还是3d
        const c = this.$refs.myCanvas
        const ctx = c.getContext('2d')
        // 在canvas中写字
        // 只是对齐方式,依然要在其下写位置
        ctx.textAlign = 'center'
        // 字体，大小
        ctx.font = '20px Georgia'
        // 内容
        // context.fillText(text,x,y,maxWidth);
        // 参数值
        // 参数   描述
        // text 规定在画布上输出的文本。
        // x    开始绘制文本的 x 坐标位置（相对于画布）。
        // y    开始绘制文本的 y 坐标位置（相对于画布）。
        // maxWidth 可选。允许的最大文本宽度，以像素计。
        ctx.fillText('你没有中奖', 100, 35)
        // 字体，大小
        ctx.font = '20px Verdana'
        // 创建线性的渐变对象
        // context.createLinearGradient(x0,y0,x1,y1);
        // 参数值
        // 参数   描述
        // x0   渐变开始点的 x 坐标
        // y0   渐变开始点的 y 坐标
        // x1   渐变结束点的 x 坐标
        // y1   渐变结束点的 y 坐标
        let gradient = ctx.createLinearGradient(0, 0, c.width, 0)
        // gradient.addColorStop(stop,color);
        // 参数值
        // 参数   描述
        // stop 介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
        // color    在结束位置显示的 CSS 颜色值
        gradient.addColorStop('0', 'magenta')
        gradient.addColorStop('0.5', 'blue')
        gradient.addColorStop('1.0', 'red')
        // 使用渐变对象
        ctx.fillStyle = gradient
        ctx.fillText('恭喜你中奖了', 100, 75)
        this._imgData = c.toDataURL('image/png')
      },
      createGGcard: function () {
        const img = new Image()
        const canvas = this.$refs.canvas
        // 将canvas的背景颜色设为透明
        canvas.style.backgroundColor = 'transparent'
        // 添加多个事件且不会被覆盖 addEventListener
        // load事件图片加载完成时触发
        // e = window.event || e;
        // event代表事件的状态，例如触发event对象的元素、鼠标的位置及状态、按下的键等等
        img.addEventListener('load', function (e) {
          let ctx
          // 按照图片的宽高进行下一步
          let w = img.width
          let h = img.height
          // canvas元素对于版面的计算左侧位置, canvas元素对于版面的计算上侧位置
          // let offsetX = canvas.offsetLeft
          // let offsetY = canvas.offsetTop
          // mousedown有可能是一个事件，鼠标按下时隐藏或者显示元素
          // 与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。
          let mousedown = false
          // canvas的ctx属性，用来绘图
          function layer (ctx) {
            // canvas 的 fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式
            ctx.fillStyle = 'gray'
            // canvas 的 fillRect 属性设置已绘制的canvas图形
            // context.fillRect(x,y,width,height);
            // 参数值
            // 参数  描述
            // x   矩形左上角的 x 坐标
            // y   矩形左上角的 y 坐标
            // width   矩形的宽度，以像素计
            // height  矩形的高度，以像素计
            ctx.fillRect(0, 0, w, h)
          }

          function eventDown (e) {
            // 取消事件的默认动作。
            e.preventDefault()
            mousedown = true
          }

          function eventUp (e) {
            e.preventDefault()
            mousedown = false
          }
          // 在每次最后一个触摸点进行二次绘画，画一个透明的圆
          function eventMove (e) {
            e.preventDefault()
            // 判断是否处于按下鼠标的阶段
            if (mousedown) {
              // targetTouches: 绑定事件的那个结点上的触摸点的集合列表
              if (e.changedTouches) {
                console.log(e.changedTouches)
                // e.changedTouches 触摸点集合最后一个
                // 当按住时 接下来的每一次移动 都在最后的触摸点进行接下来的代码
                e = e.changedTouches[e.changedTouches.length - 1]
              }
              // clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标
              // ( ( (相对文档的水平座标 + 水平方向滚动的量) 或 相对于文档的左边缘的鼠标指针位) - 事件区域距离文档左边缘的水平距离) 或 为0
              // x即事件点击点距离事件区域左边缘的距离  ==？ e.offsetX
              // y
              // console.log(e.clientX)
              // console.log('--------e.clientX-------------')
              // console.log(document.body.scrollLeft )
              // console.log('--------document.body.scrollLeft-----------')
              // console.log(e.pageX)
              // console.log('--------e.pageX------------')
              // console.log(offsetX)
              // console.log('--------e.offsetX------------')
              let x = e.offsetX
              let y = e.offsetY
              // var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
              //     y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
              // with(obj) 用于将括号内的对象作为{}的缺省值
              // 例如其下代码等于
              // ctx.beginPath()

              // 在canvas中开启新的绘画的路径
              ctx.beginPath()
              // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
              // 参数值
              // 参数  描述
              // x   圆的中心的 x 坐标。
              // y   圆的中心的 y 坐标。
              // r   圆的半径。
              // sAngle  起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
              // eAngle  结束角，以弧度计。
              // counterclockwise    可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
              // Math.PI * 2结束角
              ctx.arc(x, y, 20, 0, Math.PI * 2)
              // fill() 方法使用 fillStyle 属性所指定的颜色、渐变和模式来填充当前路径。
              ctx.fill()
            }
          }
          // 画布的宽等于图片的宽度
          canvas.width = w
          // 画布的高度等于图片的高度
          canvas.height = h
          // 画布的背景图片，base64码图片
          canvas.style.backgroundImage = 'url(' + img.src + ')'
          // 设置画布为2d
          ctx = canvas.getContext('2d')
          // 第二次画图时的颜色
          ctx.fillStyle = 'transparent'
          // 画图的位置
          ctx.fillRect(0, 0, w, h)
          // 调用函数
          layer(ctx)
          // globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
          // 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
          ctx.globalCompositeOperation = 'destination-out'

          // 触摸开始 改变mousedown变量为true
          canvas.addEventListener('touchstart', eventDown)
          // 触摸结束 改变mousedown变量为false
          canvas.addEventListener('touchend', eventUp)
          // 触摸中
          canvas.addEventListener('touchmove', eventMove)
          // 鼠标按住 改变mousedown变量为true
          canvas.addEventListener('mousedown', eventDown)
          // 鼠标弹起 改变mousedown变量为false
          canvas.addEventListener('mouseup', eventUp)
          // 鼠标按住中
          canvas.addEventListener('mousemove', eventMove)
        })
        img.src = this._imgData
      }
    },
    mounted () {
      this.createImg()
      this.createGGcard()
    }
  }
</script>
