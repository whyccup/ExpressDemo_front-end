import giftAdd from './components/gift_add.vue'
import giftGet from './components/gift_get.vue'
import hello from './components/hello.vue'

const routes = [
  {
    name: 'hello',
    path: '/',
    component: hello
  },
  {
    name: 'giftAdd',
    path: '/gift/add',
    component: giftAdd
  },
  {
    name: 'giftGet',
    path: '/gift/get',
    component: giftGet
  }
]
export default routes
