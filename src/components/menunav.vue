<template>
    <div class="menu-nav">
        <b-nav vertical class="w-25">
            <a @click="this.mainPage" class="logo"></a>
            <b-nav-item active><a @click="this.segmentsPage"><i class="far fa-ban"></i> Blocked Segments</a></b-nav-item>
            <b-nav-item disabled><i class="far fa-project-diagram"></i> Traditional Segments</b-nav-item>
            <b-nav-item disabled><i class="far fa-sitemap"></i> Custom Offers
            <br><span class="nav-space"></span> Segments</b-nav-item>
            <hr class="nav">
            <b-nav-item active><a @click="this.sflAdvertisers" target="_blank"><i class="far fa-sign-in-alt"></i> Go to SFL Advertisers</a></b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    import {deleteCookie} from '../helpers'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            sflAdvertisers() {
                this.$router.push('https://sfl-advertiser.surge.systems/')
            },
            segmentsPage() {
                this.$router.push('/segments')
                location.reload()
            },
            mainPage() {
                this.$router.push('/segments')
                location.reload()
            },
        },
    }
</script>

<style lang="sass">
    .menu-nav
        background: #3A3852
        height: 100%
        width: 250px
        padding: 25px
        position: fixed
        left: 0
        top: 0
        z-index: 99

        hr.nav
            border: 1px solid #DFE0EB
            opacity: 0.1
            width: 180px
            margin: 150px auto 40px

        .logo
            display: block
            width: 183px
            height: 32px
            margin: 20px 0px
            background: url('../assets/logo.svg')
            background-size: cover
            transition: all 0.5s ease
            margin-bottom: 50px

        .nav-link
            display: block
            padding: 0rem
            margin-left: 15px

        a.nav-link.active
            font-size: 14px
            letter-spacing: 0.3px
            color: rgba(255, 255, 255, 0.9)
        // background: rgba(255, 255, 255, 0.1)

        a.nav-link.disabled
            font-size: 14px
            letter-spacing: 0.5px
            color: rgba(255, 255, 255, 0.2)

        li.nav-item a svg
            margin-right: 5px

        span.nav-space
            margin-left: 27px
</style>