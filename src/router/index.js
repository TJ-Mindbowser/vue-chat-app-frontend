import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../components/Chat.vue'
import OtherUserChat from '../components/OtherUserChat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat
    },
    {
      path: '/chat/:userId',
      name: 'otherUserChat',
      component: OtherUserChat
    }
  ]
})

export default router
