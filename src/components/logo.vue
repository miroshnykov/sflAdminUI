<template>
    <div class="header">
        <div class="header-container">
            <b-row class="text-center" align-v="center">
                <b-col col lg="7">
                </b-col>
                <b-col col lg="5">
                    <b-row align-v="center">
                        <b-col cols="7">
                            <!-- Hide for now -->
                            <!-- <div class="header-icons">
                                <span class="search"><i class="fas fa-search"></i></span>
                                <span class="notification"><i class="fas fa-bell"></i></span>
                            </div> -->
                        </b-col>

                        <b-col cols="5">
                            <img class="user-avatar" :src="getUrlAvatar()" />
                            <b-nav>
                                <b-nav-item-dropdown
                                        id="my-nav-dropdown"
                                        toggle-class="nav-link-custom"
                                        right
                                >
                                    <template v-slot:button-content>
                                        <span class="username">{{getUserName()}}</span>
                                    </template>
                                    <b-dropdown-item>
                                        You are currently signed in as<br>
                                        <strong>{{getUserEmail()}}</strong>
                                    </b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item>
                                        <router-link class="sign-out" exact to="/logout">
                                            <span @click="loginOut">Sign Out <i class="fad fa-sign-out"></i></span>
                                        </router-link>
                                    </b-dropdown-item>
                                </b-nav-item-dropdown>
                            </b-nav>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import {deleteCookie} from '../helpers'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState('user', ['user']),
        },
        methods: {
            getUrlAvatar() {
                return this.user.length > 0 && this.user[0].picture
            },
            getUserEmail() {
                return this.user.length > 0 && this.user[0].email
            },
            getUserName() {
                return this.user.length > 0 && this.user[0].name
            },
            getUserFirstName() {
                return this.user.length > 0 && this.user[0].given_name
            },
            loginOut() {
                deleteCookie('accessToken')
                this.$router.push(`/`)
                location.reload()
            }
        },
    }
</script>

<style lang="sass">
    .header
        background: transparent
        // background: #fff
        height: 80px
        width: 100%
        position: absolute
        left: 0
        top: 0
        z-index: 98
        margin-top: 20px

        .header-container
            width: 100%
            padding-right: 30px
            padding-left: 15px
            margin-right: auto
            margin-left: auto
            margin: auto

        .logo
            display: block
            width: 183px
            height: 32px
            margin: 20px 0px
            background: url('../assets/logo.svg')
            background-size: cover
            transition: all 0.5s ease

            &:hover
                cursor: pointer

        .user-avatar
            float: right
            border-radius: 100%
            width: 2.5em
            height: 2.5em
            margin-left: 10px

        .header-icons
            color: #ACC3CF
            float: right

            span
                margin-left: 10px
                cursor: pointer

                &:hover
                    color: #7F98A5


        .nav
            display: block
            margin-top: 3px
            text-align: right


        .nav-item
            li
                .nav-item a svg
                    margin-right: 5px

                span.nav-space
                    margin-left: 27px

            .dropdown-toggle
                white-space: nowrap
                padding: 0
                transition: all 0.5s ease

                span
                    color: #3A3852
                    font-size: 12px
                    font-weight: 700
                    letter-spacing: 0.5px
                    text-decoration: none
                    line-height: 1rem
                    text-align: right

                    &:hover
                        color: #67E6F5
                        cursor: pointer

                &::after
                    display: inline-block
                    margin-left: 0.255em
                    vertical-align: middle
                    content: ""
                    border-top: 0.2em solid
                    border-right: 0.2em solid transparent
                    border-bottom: 0
                    border-left: 0.2em solid transparent
                    color: rgba(0,0,0,.5)

        span.user
            float: right

        .dropdown-menu
            text-align: right

        .dropdown-menu.dropdown-menu-right.show
            top: 5px !important

        .dropdown-item
            display: block
            width: 100%
            padding: 0.1rem 1rem
            clear: both
            font-size: 14px
            font-weight: 400
            color: #5c6489
            text-align: inherit
            white-space: nowrap
            background-color: transparent
            border: 0

            strong
                color: #3a3852
                font-size: 14px
                font-weight: 700

            &:hover, &:focus
                background-color: transparent

            a
                text-decoration: none

                span
                    color: #3a3852
                    font-size: 12px
                    font-weight: 700
                    letter-spacing: 1px
                    text-decoration: none
                    text-transform: uppercase

                    &:hover
                        color: #36b8e1
                        cursor: pointer


</style>