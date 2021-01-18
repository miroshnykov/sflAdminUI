<template>
    <b-container fluid>
        <b-row class="text-center" align-v="center">
            <b-col cols="5">
                <div class="login_wrapper flex center v_center">
                    <a href="" class="logo animated fadeIn"></a>
                </div>
            </b-col>
            <b-col cols="7">
                <div class="login_wrapper flex center v_center">
                    <div class="wrap_for_form">
                        <form ref="login_form" action class="flex column login_form">
                            <a class="g-signin-button" @click="redirectToGoogleSignIn"><img
                                    src="https://s3.amazonaws.com/affiliate.ad-center.com/logo-google-g.svg"> Sign in
                                with Google
                            </a>
                        </form>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    // import {required, email, minLength} from 'vuelidate/lib/validators'
    import loginApi from '../api/login'
    // import {getCookie} from '../../helpers'
    import {mapGetters, mapState} from 'vuex'
    import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        data() {
            return {
                email: '',
                password: '',
                errorMessage: 'Min length of password is 5'
            }
        },
        computed: {
            ...mapGetters("user", ["getGoogleAuthUrlStore"]),
            ...mapState('user', ["googleAuthUrl","verifyTokenEmail"])
        },
        async mounted() {
            if (this.verifyTokenEmail) {
                this.$router.push("/segments/block")
            }
        },
        methods: {
            redirectToGoogleSignIn() {
                window.location.href = this.googleAuthUrl
            },
            async loginIn() {
                const login = this.email
                const password = this.password
                let loginRes = await loginApi.login(login, password)
                console.log(`>> TOKEN:${loginRes.accessToken}`)
                if (loginRes.accessToken) {
                    this.$router.push('/segments/block')
                    this.$cookies.set("accessToken", loginRes.accessToken)
                    this.$cookies.set("refreshToken", "refreshToken")

                    // setTimeout(() => { }, 2000)
                    location.reload()
                } else {
                    this.$refs.signInPassword.classList.add('error_input')
                    this.$refs.errPassword.classList.add('error_email')
                    this.errorMessage = 'Email or password is invalid.'
                }
            }
        }
    }
</script>

<style lang="sass">
    body
        background-image: -webkit-gradient(linear, right top, left top, from(#67E6F5), to(#2294D0))
        background-image: linear-gradient(to left, #67E6F5, #2294D0)
        padding: 50px

        .container
            margin-left: auto !important

        .container-fluid
            background: #fff
            border-radius: 20px

            .col-7
                background: #F7F8FC
                border-radius: 0px 20px 20px 0px

        .g-signin-button
            display: inline-block
            padding: 15px
            border-radius: 10px
            background-color: #fff
            color: #3A3852
            font-size: 14px
            font-weight: 600
            letter-spacing: 0px
            // box-shadow: 0 3px 0 #3A3852
            border: 2px solid #f4f4f4
            text-align: center
            width: 300px
            margin: auto
            transition: all 0.5s ease

            &:hover
                color: #36B8E1
                background-color: #fff
                cursor: pointer

            img
                width: 14px
                margin-left: -5px
                margin-right: 10px

        .fa-user-circle
            color: #ffffff
            background: linear-gradient(to right, #28cde1 0%, #5883e2 100%)
            -webkit-background-clip: text
            -webkit-text-fill-color: transparent

        .logo
            display: block
            width: 268px
            height: 217.66px
            margin: 0px auto 0px
            //background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAnCAYAAABKSgfJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5WSURBVHgB7Vxfb9vWFT+XpGwlC1p3bdL1qXTXtG7QJMpmp2k2rPLDHtoVqLMPsMifoM72tCcpH2CI+wkiPxV7svsw9NEKBrTZksJKXCROCyzsgHVIiyZOHP8TyXt3zhUpUeSlRFnyH3X8AYKoS/KSvLy/e87vnHsFsAs4N3/XPP/374uQIsWAQ4NdgKvrRc0Ymjn3+SMTUqQYYPSdIBPzX+VANwrAYERnempFUgw0+k4QDu48y2TkNgNR+PXnj/KQIsWAoq8E+cX83QJ+mfrwULMwtSIpBhh9IwgJcwYgyaDpRmCPyP/qH08uQooUA4i+EcQGMYNfJtM0YIbRso9xMZtfejQCKVIMGPpCELIeSIMPaZsZmegBKNidmvYhpEgxYDCgD7A914rgC/QghBAgXD6Fm5dhnzGWO2cGf29BdtWqVlY7nWfm8iNZ2GprBZPWlQT16z2ZAq697JcxYKtCE7dWqjcrSeoIP2s7hO+923ZStY9/TpK2U2Glet1S3Us7dHqOdtdRoWeCeMK84P/2BXqdFC4IzjG0xUEwNgsHAZwv4t2Z/s+seFrBr8lOp2Vd7KxMv9r2GFiHN05NrAomqiC0MmjatXaNr8JYbjyPjVUEvp7H1mzZJ+T9Mxg7ddbCjTnQjHLb+rmLzwomJECWrZfxa7p+D9ipuHu/ZT9sWPg1Gnu+WL+CN1hoPWeNfs8laTsV3jhz3ry79Nk32JGuYt35JOdE3mfoOVQYOzWBTQ5VJtgn+M5a2rRnF4sFrIckheOCu70NHD/CcSQ5ENb1d47NwT5j7OREIUgOCcbyx3MTOegTsBOPYGvncassuLs0dmq8lOQ8GmXxRZWRAIudOwM9A5GIL7528pdTsCcQJj7LjzYiyQRgHxCyTY+faPaHnggyPn9HCnPaJkthrz0F+/HjOjGCF9ekgN9/aKCMpulcfAC7AEZkwY7ciSQ0Ymf5xhJudhntE6bGtPmkJOwVAthMN+7OYALb1IBF/zl3TBAS5sIT5q5tS3J41gK316R7JS8HUP7sNz/7BPYZ8oFjRmZ68WYut4tRNlZ8/dR47CCBg8t8xLJ1Wf9eWBJJeNfp2lUaNASfc8caxBPmprO1BXxr26uZ1b+lNVmDzLPP4g+x78JcQrix7gE1yGHXeAc3uyIykn+VgWhoKzLTqLXIPJvRa7AraLorX9+5UQ2Wo54oYU1KFw891lm8twXmZCzG7Oe47ua8xKsZqZ9pV5HkFataXe1wz1iniBzDubgFSYAu6dib4/mVL5MFCgiaq1e5IUqBOsywXvHurhT8tSk2HkMcBJSxwa1IuaoscmqzDbx3Fh1c8DlRA728I4KQ9agJUXDW16XmaNbJmgchSZwna6WbHxy34CCgrgtid6PtoxG+K4Lg066u3L4ZGQDG3jxbBK31ZRO0jKDOfaFxXF0Mq4hraY594c6dapBM3+CnmsvlFrZd42r4pRLJs9wgi952QNL0zKwUvr1Ak2Q804mMPu7UB4XGs3iBiEL4OFVbtkEZj78GO0C4DU6g5uAGLIWPE+52fkcu1rbjXiWXKkgOAiUJG5XjS3Y2nH0X5gSVOBeBFyaBI0a/3KyVL/95GS9QiewQrddg3FVqHwx2zITI0UAVO+Ww7lC0yYqct+uuYuNK5iFu/GgEuyQwQ4sUATO7tiDH//K3wuaDB3lN1zHKaESy5j403ShrI4Y5/ul9M64uw8jC9d++VIHdBonzkPHA7P4l0NhisCzJCJwYAl1LRlYrcE0a5R2D3KmKV1RQnFe5t3yzrSUjkqCbM431F0P1Q3aLAgMQO7Izp5bDEVwRrjWsbkLSREZ0GecaLqMg14bBXgHDsvQcigt29xw+0NVaVfkXXRPEXXtadEmQe6DolXH4MGRffJFMb70MR7fMkHGNM22xXV3asAH5pc3JyplDFdgleG5MPliGI/TCPfShZc5CRpq8cnzp0CeCrCjql9fQ2GnwCIL7otqDiTIkrB9AYaU6gDO2AFy1xy6AwioFYOENW8iBvF+g6+IKJMgh7QaQGbOUE4rCKcEO3iERLjyIagKqXblYrxT/WoKAQKRwLukQZInMgTTKQZu6/u5oBYVpJa4uaX0w6y7Qn4XdhEKcMyYWvM1ySzl2ZhKg0D9Y4QIUh5IwseFSoVlwQKG5cKmlAC1ku+jcoEAGShQRTm47txITxCx+bOLbbXQ2SgRKcqAFYUND8jeJdORJeen3r8uIyLZwp5GZEXPP0D2TH2lxmJm/Ze+ePyta3RyJmivFneAi6soEnrH3S0PX006YkbHggIJ8dXRFZltLWXFvdE//IHitPHZ6fJE+aOUfyQRh5CAMAqxUrcQE0bx1HWQp3I0NcDG8K8uRHJIYmAuhDs9rTfNWfXfUkqYwADqW9Is8t+GSiZn8kuh7Iysz5+jj04PTZtZwqizsr/dRrGNniq0nC1tK8pBGgAOMYd2m92v5v8nqDpxgp0HT+4RdYA8W2PI5k2kQaT1AFEhvOEgOcJvRK214WH5zxwZ3e6t0++JpK3hubYh/lKlpM35n0Wgyox8O1htzjUa4Lq3IJegnFOJckA/uQYrdkxPVoF9N6IdYx3DsyBZXaAyox+nltU9N0LYZ3OvWhX3HcHPcBMBOAhVbfkYAj5LTs6qd0AgQBAIcUrvhwLOHGh3BSthaVrhUc9xk+Zw40HPYzrQ/iCYiiIZiW+oNIodo7XG6RxCE9eRf334UPrc6Obo68en9S2herpLugECuhDUJQqMtWpHNT/ol2FXi3LvO1Njp5lwbIdgIC7GoH2J9y81MqTqM62jNF8hQZEcTZgW0YJc75RhUkwMJY2O5Uf/lKqFnFlZ6zIPIAMTJ8YWWXAxTuLK7CfIElr/YUR5EWR3QZEWYWVluza10dLFeKX5cQHfKrIvxaCBMG8r4FyhZly8oX+qNd0fL6FZVWgihtV5aTnQE1j9THZc5J2tBHcv7MEUWu1exLsnJlM9itWTSXTGnunbWNeahXf3kOgp1iLgtOfoIYTuXGHSvsQ4Cwm6/BxM9msjA0ZYgI1NF09nYLJIAV0FGouqd3vrqj++1TwoaesuIHCQLgTQMkiyfvy2moB8QPY5oXYp1ORsXiUEREUwALoFqbhVvDeHKUK0qoUjTOU6OL4YjXfUZvxhxYaCO/CUMEfcDRER+UKYRdQvMpIfbXc6/4nwxrD/bulgb//66MPzTI2bmyJFIhyZo/r+XbG93jIVfn3ypcn7xQRntRKF+cpObnGb/knVCbcOG4QoK9krlDNvx6KQU593CE+sdXB0kxETdrPL1RmHMhBYLHMXMAtueZkOZpYhYJJeFu/cx0lIR3kit8fU4UVmPuix/0X6QosNc26L1DxFgJnnl1o1p6AL3bt+cxbb+IKzh9gToniqfQ7peNzvnZpTtLkzPejfOj7cgY1MmulZFd3MTth8+bMzODYIEOrpG5ZU/X7AgAThwHHHqHd93sWS9rXWbGOLpbXmuelq7JSe4xX0U8MR6z6CJcTS3SuX+UBmODfHBCbSETLAp+sSSA59ta83ub4AjISK5kQGBbHcuLkR2kPUOLB+IJYhmN3MT1Im3vv8e7KdPW49B/aHVaonNLFoRS2h1/49Cvf6qw8Z1aLo8ljGOgv3uzixA/LR2XlpZvjEd91G5Op5Y7xUWc5zJuLlVBLx+mQlOL8uCboEj5tYT+4xlVfdFD6hzI4MBcnHV995cPqAmyM/fp9GqENYeDhKkRguiPLGOCcJSUuvhI8uHKNJlUYiXdEdY+Mu6GYxosMOEXZw47xDGxODaQqSsB7Eup1NzUaLO244cPu4uf7EANXsyzpqp6hdcRl0m94gcZtyOcG5kkBB377R8gAZbpQbBxr8SVyG5XLxWg+zRo9ZXf/pd1yKtMvnc6tuLDy7JRUKKqJhcdIXuF+4q5JfFXOVk/HQV9Q1inoGxcrAI66re6xDdGdbsOQzNRiJaaEW8uVP6/U6dl7SCxly0GPq1O3dudiRFGJ4LNo2h2ssik/kQCZpjTOTwHnzXymJCYN6GVzaf8LlOxKA5Z6x5bgfwir9FScwtkSlDQlBu5MSJiQtcD7nGgsWEkw10d90yJASO8gtCJCRg+DjFOwuuM4m7dxmhd5yL0Uj9K+8VMNvdiJI8f/atyCGkHyiDfmR0FPRDh6Ad6E8c6gunAveMuuWZV1/DsJqW10Lin3SNL/6xw1UqJ1hnwZUixS6h1cVCYc5Ym1wE+iFyDhWGd0kv1FZXpUVpB6GwErYQl13bvUwulvyDBwrxescJ3pxqyijs++UBWc+e4v8SLQTxhLkZLPP/gEFajWbeQ4KW1VJ2Xa5BFzHBTR7WGDC7Mv22dX3yaEUmbDyhTnrHRddN6pIAkJPF3ZinlSJFEjQJgtZDKBbwUOf1rUZwmgiBtAgRiL5ttCaqUHCIOJYteGM6SsY1SMM0/Wi0HtyzKo3zULD3HPZNkWKHaBCE2U5EmOvZbL3Tx1kHhE3zs8D72x+McJEVaIMSWQ//Bwl2NE2ts31pjQiSjmYLN6JlPYR9U6ToBXWTEBLmRAwS1vTtwzj8E9Axox6YnFivAF2v4WPHWv6wgVYYBsV79thR+rJuX3xrVHUT5699d5/+6UJOhQ9ck0CCnQICqWBPsR+QFsQX5kQIWjpLHz3UUZ2Nddj+7gFsfvsfcNafNrSJnAIfSiCSLpH/eBJcZcii/2Lhg3NWn+KgWN/uu1xYWR7DvnlIkWIPoWmvvl9CMphxxAiDXK7aw4ew+d9vofbDD7LzqiJZ5CL5usTlvLz8h7OxiToS7GQhNMV8L3lNz+UC5lyBFCn2EIZx5HB1+PmjhaQncE0fYa4jo0pkVehjows0/MILjRWCzYO5nJ5iP/tMx0l0wxlj2mHaxfgLC3A2a3Du803z+tuHLEiRYg/wP7h6/jGrpDSTAAAAAElFTkSuQmCC') no-repeat center center
            background: url('../assets/logo-login.svg')
            background-size: cover

        .login_wrapper
            width: 100%
            height: 100%
            min-height: 100vh
            //background: url('../../assets/bg.png')

            .wrap_for_form
                form.login_form
                    width: 100%
                    margin: 0 auto
                    padding: 40px
                    color: #7F98A5
                    background: rgba(255, 255, 255, 0.05)
                    border-radius: 20px

                    h2
                        font-weight: 400
                        color: #36B8E1
                        font-size: 18px
                        text-transform: uppercase
                        text-align: center
                        letter-spacing: 2px
                        margin-bottom: 40px

                    input
                        margin-top: 0px
                        margin-bottom: 30px
                        font-size: 14px
                        letter-spacing: 0.5px
                        border: 0
                        outline: 0
                        color: #7F98A5
                        font-weight: 500
                        background: #fff

                        &::placeholder
                            color: #ACC3CF
                            font-size: 14px
                            letter-spacing: 0.5px

                        &.user_email,
                        &.password
                            width: 100%
                            padding: 15px 25px
                            border-radius: 10px

                        &.error_input
                            border: 2px solid #FE5D65

                    .error
                        display: none
                        font-size: 0.9rem
                        font-weight: 500
                        margin-bottom: 1rem
                        margin-top: 0px
                        letter-spacing: 0.5px
                        color: #fff
                        background: #fe5d65
                        padding: 10px
                        border-radius: 4px

                        &.error_email
                            display: block

                        &.error_password
                            display: block

                    .rememberme
                        margin: 20px 0 0 -10px

                        label
                            color: rgba(255, 255, 255, 0.5)
                            cursor: pointer
                            font-size: 12px
                            font-weight: 500

                            input
                                visibility: hidden

                                &:checked + i
                                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgB7ZU9TsMwGIbf71MFKxdAJTcAqUWMzQJi5AZwAzhBcgO4AeUEbERiAVZgyA0SbpANqQh/2JYi0ipu7P5NfZfIP3oe24o/A9t0hJqNYVZcgvmWBHtYLKUmpu9n/Ye6g6dsxMkScJMDUbhrdvDsBCwZoukFMtacVQhKYR6Z7zoE5URU/HG6/8airlYtsPD8PCqHz8XhL/NjkEAIFTzgJ1kxgvCL6+9rFQho/KPUEdrP9X/l+t4ocsOdAiJ5NQADmpHkTbi+N/foSPsRCcaDp+LaSnb1Tgi5hX+Hwd0CM6BLxiD7SvM4qiY7Krbwi6g61n2+cJPevEEmJFqCz7ifmraB690kCEiva0ItsVsNhHsJagkWzGZrUcfl8k3pFECpGziKlk/sAvWDg21C8gesNoO20KGVbgAAAABJRU5ErkJggg==') no-repeat center center

                            i
                                display: block
                                width: 18px
                                height: 18px
                                border: 2px solid #36B8E1
                                border-radius: 2px
                                margin-right: 10px

                        a
                            cursor: pointer
                            font-size: 12px
                            font-weight: 500
                            text-decoration: none
                            color: #36B8E1
                            transition: all 0.3s ease

                            &:hover
                                color: #67E6F5

                    a.sign_me_in
                        display: block
                        text-align: center
                        background: linear-gradient(90deg, #28CDE1 0%, #2294D0 100%)
                        background-size: 100%
                        text-transform: uppercase
                        font-weight: 600
                        letter-spacing: 2px
                        width: 100%
                        max-width: 300px
                        padding: 10px
                        margin: 0 auto
                        color: #FFF
                        font-size: 16px
                        cursor: pointer
                        border-radius: 10px
                        border: 0
                        transition: all 0.5s ease

                        &:hover
                            background-size: 150%
                            transform: scale(1.05)

                    div
                        p
                            text-align: center
                            margin-top: 25px
                            font-size: 11px
                            letter-spacing: 0.5px
                            opacity: 0.87
                            color: #7F98A5

                            a
                                cursor: pointer
                                text-decoration: none
                                color: #36B8E1
                                font-size: 11px

                h3
                    font-weight: 300
                    font-size: 14px
                    color: #36B8E1
                    padding-top: 40px
                    text-align: center
</style>