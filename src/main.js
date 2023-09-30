import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

import HomeScreen from './pages/HomeScreen.vue'
import NewsScreen from './pages/NewsScreen.vue'
import LikeNewsScreen from './pages/LikeNewsScreen.vue'

const routes = [
    { path: '/', component: HomeScreen },
    { path: '/news', component: NewsScreen },
    { path: '/like-news', component: LikeNewsScreen },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
