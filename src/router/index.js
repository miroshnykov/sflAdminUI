import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import successLogin from '../components/successLogin'
import errorLogin from '../components/errorLogin'
import segments from '../components/segments/segments'
import offers from '../components/offers/offers'
import newOffer from '../components/offers/newOffer'
import editOffer from '../components/offers/editOffer'
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
        {
            path: '/offers',
            component: offers
        },
        {
            path: '/offer/new',
            name: 'newOffer',
            component: newOffer
        },
        {
            path: '/offer/:id',
            name: 'editoffer',
            component: editOffer
        },
    ]
})
