import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import successLogin from '../components/successLogin'
import errorLogin from '../components/errorLogin'
import segments from '../components/segments'
import editSegment from '../components/editSegment.vue'

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
            path: '/segments',
            component: segments
        },
        {
            path: '/segment/:id',
            name: 'segment',
            component: editSegment
        },
    ]
})
