<template>
    <div id="edit-offer">
        <topbar></topbar>
        <menunav></menunav>

        <h1>Editing: iPhone11</h1>

        <b-row class="text-center">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           :value="id"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="6">
                <div class="condition__controls">
                    <label>Offer Name</label>
                    <input type="text"
                           placeholder="ex: My First Segment"
                           class="condition__matches campaign custom-input"
                           :value="getSegmentStatus.length !==0 && getSegmentStatus[0].name"
                           :id="defineSegmentNameId(id)"
                    >
                    <b-form-text id="lastModified">
                        Last Modified: {{ getSegmentStatus.length !==0 && formatDate_(new
                        Date(getSegmentStatus[0].dateUpdated * 1000)) }}
                    </b-form-text>
                </div>
            </b-col>

            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status</label>
                    <select
                            :id="defineStatusId(id)"
                            class="condition__dimension-name condition__matches custom-select"
                            @change="handleChangeStatus($event, item)"
                    >
                        <option
                                id="filterType"
                                v-for="{id, name} in getStatusList()"
                                :value="id"
                                :selected="capitalizeFirstLetter(name) === capitalizeFirstLetter(getSegmentStatus.length !==0 && getSegmentStatus[0].status)"
                                :key="id"
                        >{{name}}
                        </option>

                    </select>
                </div>
            </b-col>
            <!-- <b-col cols="3">
                <div class="condition__controls">
                    <label>Last Modified</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           disabled
                    >
                </div>
            </b-col> -->
        </b-row>

        <hr>


    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from '../logo.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'
    import {formatData} from '../../helpers'

    export default {
        name: 'editOffer',
        components: {logo, menunav, topbar},
        computed: {
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('offer', ['getOfferFilter', 'getOfferStatus']),
        },
        offerFilter: [],
        // async mounted() {
        //     await this.$store.dispatch('offer/getOfferConditions', this.id)
        //     await this.$store.dispatch('offer/saveOfferStatusStore', this.id)
        // },
        methods: {
            formatDate_(date) {
                return formatData(date)
            },
            defineStatusId(id) {
                return `status-${id}`
            },
            defineOfferNameId(id) {
                return `offerName-${id}`
            },
            // capitalizeFirstLetter(str) {
            //     return str && str.charAt(0).toUpperCase() + str.slice(1)
            // },
            getStatusList() {
                return [
                    {id: 0, name: 'Public'},
                    {id: 1, name: 'Private'},
                    {id: 2, name: 'Apply to Run'},
                    {id: 3, name: 'Inactive'},
                ]
            },
        },
        data() {
            return {
                id: Number(this.$route.params.id)
            };
        }
    };
</script>

<style lang="sass">
    .container
        margin-left: 290px
</style>