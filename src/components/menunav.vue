<template>
    <div class="menu-nav">
        <b-nav vertical class="w-25">
            <a class="logo"></a>
            <span class="nav-active">
                <b-nav-item active class="nav-blockedSegments"><a @click="this.blockSegmentsPage"><i class="far fa-ban"></i> Blocked Segments</a></b-nav-item>
                <b-nav-item active class="nav-standardSegments"><a @click="this.standardSegmentsPage"><i class="far fa-project-diagram"></i> Standard Segments</a></b-nav-item>
                <b-nav-item active class="nav-customOffers"><a @click="this.offersPage"><i class="far fa-bullhorn"></i> Custom Offers Segments</a></b-nav-item>
            </span>

            <span class="nav-disabled" style="display: none;cursor: not-allowed;">
                <b-nav-item disabled><a><i class="far fa-ban"></i> Blocked Segments</a></b-nav-item>
                <b-nav-item disabled><a><i class="far fa-project-diagram"></i> Standard Segments</a></b-nav-item>
                <b-nav-item disabled><a><i class="far fa-bullhorn"></i> Custom Offers Segments</a></b-nav-item>
            </span>

            <!-- <hr class="nav">
            <b-nav-item active><a @click="this.sflAdvertisers"><i class="far fa-sign-in-alt"></i> Go to SFL Advertisers</a></b-nav-item> -->
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
            offersPage() {
                this.$router.push('/offers')
                location.reload()
            },
            standardSegmentsPage() {
                this.$router.push('/segments/standard')
                location.reload()
            },
            blockSegmentsPage() {
                this.$router.push('/segments/block')
                location.reload()
            },
            mainPage() {
                this.$router.push('/')
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
        padding: 30px
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
            padding: 1.5rem 0rem
            margin-left: 0px
            margin-right: -15px
            cursor: pointer

        a.nav-link.active
            font-size: 14px
            letter-spacing: 0.3px
            color: rgba(255, 255, 255, 0.9)
        //  background: rgba(255, 255, 255, 0.1)

        a.nav-link.disabled
            font-size: 14px
            font-weight: 400
            letter-spacing: 0.3px
            color: rgba(255, 255, 255, 0.2)
            pointer-events: none
            cursor: not-allowed

        li.nav-item a svg
            margin-right: 5px

        span.nav-space
            margin-left: 27px
</style>