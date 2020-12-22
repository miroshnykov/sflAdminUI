<template>
    <div id="campaigns">
        <menunav></menunav>
        <logo></logo>
        <h1>Manage offers</h1>

        <div class="segment-panel">
            <input type="text" class="search-box"  placeholder="Search offers..."/>

            <b-button variant="primary">
                Create Offer
            </b-button>
            <b-button variant="success margin-right-10" >
                Save offer
            </b-button>
            <div class="offers">

                <label> List of offers</label>
                <tr scope="row" v-for="offer in getOffers">
                    <td>{{ offer.id }}</td>
                    <td>{{ offer.name }}</td>
                </tr>

            </div>
        </div>


    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
    import logo from '../logo.vue'
    import menunav from '../menunav.vue'
    import {formatData, timeSince} from '../../helpers'
    import {getCookie} from '../../helpers'

    export default {
        components: {logo, menunav},
        computed: {
            ...mapGetters('offers', ['getOffers'])
        },
        async mounted() {

            let token = getCookie('accessToken')
            if (token) {
                this.saveOffersStore()
            }

        },
        methods: {
            ...mapActions("offers", ["saveOffersStore"]),
        },
        data() {
            return {
                isModalVisible: false,
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 290px
</style>