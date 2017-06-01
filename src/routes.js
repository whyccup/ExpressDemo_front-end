import giftAdd from './components/gift_add.vue'
import giftGet from './components/gift_get.vue'
import hello from './components/hello.vue'
import luck from './components/luck.vue'

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
  },
  {
    name: 'Luck',
    path: '/luck',
    component: luck
  }
]
export default routes
