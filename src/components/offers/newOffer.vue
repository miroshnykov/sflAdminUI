<template>
    <div id="create-offer">
        <topbar></topbar>
        <menunav></menunav>

        <h1>Create New Offer</h1>

        <b-row class="text-center">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           placeholder="1"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Advertiser</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="advertiserType">FFM Online</option>

                    </select>
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Vertical</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="verticalType">Sweeps</option>
                        <option id="verticalType">Movies</option>
                        <option id="verticalType">TV</option>
                        <option id="verticalType">Books</option>
                    </select>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status Type</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="statusType">Public</option>
                        <option id="statusType">Private</option>
                        <option id="statusType">Apply To Run</option>
                        <option id="statusType">Inactive</option>

                    </select>
                </div>
            </b-col>

            <b-col cols="2">
            </b-col>

            <b-col cols="3">
                <div class="campaign-block condition__controls">
                    <label for="label-platform">Conversion Flow Type</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPI
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPA
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPL
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPC
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPM
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > Hybrid/Multistep
                        </label>
                    </div>
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="4">
                <h2>Custom Pay-in/Pay-out</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="secondary" class="btn-add-line" @click="">
                    <i class="far fa-cog"></i> Customize
                </b-button>
            </b-col>
            <b-col cols="5">
            </b-col>

            <b-col cols="4">
                <div class="condition__controls">
                    <label>Offer Name</label>
                    <input type="text"
                           placeholder="ex: iPhone 11"
                           class="condition__matches campaign custom-input"
                    >
                </div>
            </b-col>
            <b-col cols="1">
                <div class="condition__controls">
                    <label>Pay-in</label>
                    <input type="number"
                           step=1
                           placeholder="10"
                           min="1" max="1000"
                           class="condition__matches budgetTotal custom-input"
                           pattern="^\d+(?:\.\d{1,2})?$"
                           onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                    ">
                </div>
            </b-col>
            <b-col cols="1">
                <div class="condition__controls">
                    <label>Pay-out</label>
                    <input type="number"
                           step=1
                           placeholder="10"
                           min="1" max="1000"
                           class="condition__matches budgetTotal custom-input"
                           pattern="^\d+(?:\.\d{1,2})?$"
                           onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                    ">
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="4">
                <h2>Restrictions</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="secondary" class="btn-add-line" @click="">
                    <i class="far fa-cog"></i> Customize
                </b-button>
            </b-col>
            <b-col cols="5">
            </b-col>

            <b-col cols="3">
                <div class="condition__controls">
                    <label>GEO Settings</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           value="Custom (hover for allowed/banned)"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Caps</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="capControl">No Caps</option>
                        <option id="capControl">Capped</option>
                    </select>
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="4">
                <h2>Default Settings</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="secondary" class="btn-add-line" @click="">
                    <i class="far fa-cog"></i> Customize
                </b-button>
            </b-col>
            <b-col cols="5">
            </b-col>

            <b-col cols="3">
                <div class="condition__controls">
                    <label>Default LP</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="defaultLP">1015 (www.ffmoffers.co...)</option>
                        <option id="defaultLP">1018 (www.ffmoffers.co...)</option>
                    </select>
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Default Redirect</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="defaultRedirect">Offer 77 - Hyuna, iPhone 11</option>
                        <option id="defaultRedirect">Offer 92 - Hyuna, Samsung Galaxy S9</option>
                    </select>
                </div>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from '../logo.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'
    import {formatData} from '../../helpers'
    // import {formatData, timeSince} from '../../helpers'

    export default {
        name: 'newOffer',
        components: {logo, menunav, topbar},
        computed: {
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('offer', ['getOfferFilter', 'getOfferStatus']),
        },
        // offerFilter: [],
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
            // defineOfferNameId(id) {
            //     return `offerName-${id}`
            // },
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