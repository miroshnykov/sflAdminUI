import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import successLogin from '../components/successLogin'
import errorLogin from '../components/errorLogin'
import segments from '../components/segments/segments'
import editSegment from '../components/segments/editSegment.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/successLogin/:token',
            component: successLogin
        },
        {
            path: '/errorlogin/:email',
            component: errorLogin
        },
        {
            path: '/segments/:type',
            component: segments
        },
        {
            path: '/segment/:type/:id',
            name: 'segment',
            component: editSegment
        },
    ]
})
