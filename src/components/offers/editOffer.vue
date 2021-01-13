<template>
    <div id="edit-offer">
        <topbar></topbar>
        <menunav></menunav>

        <h2>Editing: {{getOffer.length !==0 && getOffer[0].name}}</h2>

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
                           :id="defineId(`offerName`,id)"
                           @change="updValue($event, `name`)"
                           :value="getOffer.length !==0 && getOffer[0].name"
                    >

                </div>
            </b-col>

            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status</label>
                    <select
                            :id="defineId(`offerStatus`,id)"
                            class="condition__dimension-name condition__matches custom-select"
                            @change="updValue($event, `status`)"
                    >
                        <option
                                id="filterType"
                                v-for="{id, name} in getStatusList()"
                                :selected="capitalizeFirstLetter(name) === capitalizeFirstLetter(getOffer.length !==0 && getOffer[0].status || '')"
                                :key="id"
                        >{{name}}
                        </option>

                    </select>
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Advertiser</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="advertiserType">{{getOffer.length !==0 && getOffer[0].advertiser}}</option>

                    </select>
                </div>
            </b-col>


            <b-col cols="3">
                <div class="campaign-block">
                    <label for="label-platform">Conversion type</label>
                    <label class="conversionType">CPI
                        <input
                                type="radio"
                                :checked="checkConversionType(`cpi`)"
                                name="radio"
                                @change="updValue(`cpi`, `conversionType`)"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>
                    <label class="conversionType">CPA
                        <input
                                type="radio"
                                :checked="checkConversionType(`cpa`)"
                                @change="updValue(`cpa`, `conversionType`)"
                                name="radio"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>
                    <label class="conversionType">CPL
                        <input
                                type="radio"
                                :checked="checkConversionType(`cpl`)"
                                @change="updValue(`cpl`, `conversionType`)"
                                name="radio"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>
                    <label class="conversionType">CPC
                        <input
                                type="radio"
                                :checked="checkConversionType(`cpc`)"
                                @change="updValue(`cpc`, `conversionType`)"
                                name="radio"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>
                    <label class="conversionType">CPM
                        <input
                                type="radio"
                                :checked="checkConversionType(`cpm`)"
                                @change="updValue(`cpm`, `conversionType`)"
                                name="radio"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>
                    <label class="conversionType">Hybrid/Multistep
                        <input
                                type="radio"
                                :checked="checkConversionType(`hybrid/multistep`)"
                                @change="updValue(`hybrid/multistep`, `conversionType`)"
                                name="radio"
                        >
                        <span class="conversionTypeCheckMark"></span>
                    </label>


                </div>
            </b-col>


            <!--            <b-col cols="3">-->
            <!--                <div class="campaign-block condition__controls">                    -->
            <!--                    <label for="label-platform"></label>-->
            <!--                    <label >DB {{getOffer.length !==0 && getOffer[0].conversionType}}</label>-->
            <!--                    <div class="btn-group btn-group-toggle" data-toggle="buttons">-->


            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > CPI-->
            <!--                        </label>-->
            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > CPA-->
            <!--                        </label>-->
            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > CPL-->
            <!--                        </label>-->
            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > CPC-->
            <!--                        </label>-->
            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > CPM-->
            <!--                        </label>-->
            <!--                        <label class="btn btn-secondary-">-->
            <!--                            <input-->
            <!--                                    type="checkbox"-->
            <!--                                    autocomplete="off"-->
            <!--                            > Hybrid/Multistep-->
            <!--                        </label>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </b-col>-->


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
                           :value="getOffer.length !==0 && getOffer[0].name"
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
                           :value="getOffer.length !==0 && getOffer[0].payIn"
                           min="1" max="1000"
                           @change="updValue($event, `payIn`)"
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
                           :value="getOffer.length !==0  && getOffer[0].payOut"
                           min="1" max="1000"
                           @change="updValue($event, `payOut`)"
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

            <b-col col lg="2">
                <b-button variant="primary btn-sm" v-b-modal.modal-scrollable
                          @click="showGeoRestrictionsModal(id)"
                >
                    <i class="far fa-layer-plus" data-fa-transform="shrink-1"></i> Customize
                </b-button>

                <GeoRestrictions :id="'modal_' + id" :ref="'modal_' + id"
                                 :geoId="id" :geoRules="getOffer.length !==0  && getOffer[0].geoRules">
                </GeoRestrictions>


            </b-col>

            <b-col cols="5">
            </b-col>

            <!--            <b-col cols="4">-->
            <!--                <h2>Restrictions</h2>-->
            <!--            </b-col>-->
            <!--            <b-col cols="2">-->
            <!--                <b-button variant="secondary" class="btn-add-line" @click="">-->
            <!--                    <i class="far fa-cog"></i> Customize-->
            <!--                </b-button>-->
            <!--            </b-col>-->
            <!--            <b-col cols="5">-->
            <!--            </b-col>-->

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
                        <option>No Caps</option>
                        <option>Capped</option>
                    </select>
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="4">
                <h2>Customize Landing pages per GEO</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="primary btn-sm" v-b-modal.modal-scrollable
                          @click="showCustomLPModal(id)"
                >
                    <i class="far fa-layer-plus" data-fa-transform="shrink-1"></i> Customize
                </b-button>

                <CustomLP :id="'modal_lp' + id" :ref="'modal_lp' + id"
                          :customLPId="id"
                          :customLPRules="getOffer.length !==0  && getOffer[0].customLPRules && JSON.parse(getOffer[0].customLPRules)">
                </CustomLP>

                <!--                <b-button variant="secondary" class="btn-add-line" @click="">-->
                <!--                    <i class="far fa-cog"></i> Customize-->
                <!--                </b-button>-->
            </b-col>
            <b-col cols="5">
            </b-col>


        </b-row>
        <hr>
        <b-row class="text-center">
            <b-col cols="4">
                <h2> Landing page</h2>

                <div class="condition__controls">
                    <label>Default LP</label>
                    <model-select
                            :options="getLpModify()"
                            :id="defineId(`lpsId`,id)"
                            placeholder="Search landing page..."
                            :value="getOffer.length !==0  && getOffer[0].defaultLp"
                            @input="updValue($event,`defaultLp`)"
                    >
                    </model-select>


                </div>

                <div class="condition__controls">
                    <label>Default Redirect</label>
                    <model-select
                            :options="getOffersModify()"
                            :id="defineId(`offerIdRedirect`,id)"
                            placeholder="Search landing page..."
                            :value="getOffer.length !==0  && getOffer[0].offerIdRedirect"
                            @input="updValue($event,`offerIdRedirect`)"
                    >
                    </model-select>
                </div>

            </b-col>
            <b-col cols="2">


                <b-button variant="primary btn-sm" v-b-modal.modal-scrollable
                          @click="showOfferAddLpModal(id)"
                >
                    <i class="far fa-layer-plus" data-fa-transform="shrink-1"></i> Add
                </b-button>

                <OfferLP :id="'modal_add_lp' + id" :ref="'modal_add_lp' + id"
                         :offerId="id"
                >
                </OfferLP>


            </b-col>


        </b-row>

        <b-button class="btn-save" @click="this.saveOffer">
            <i class="fad fa-save"></i> Save Changes
        </b-button>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import logo from '../logo.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'
    import {formatData} from '../../helpers'
    import GeoRestrictions from './geoRestrictions'
    import CustomLP from './customLP'
    import OfferLP from './offerLP'
    import {ModelSelect} from 'vue-search-select'

    export default {
        name: 'editOffer',
        components: {
            logo,
            menunav,
            topbar,
            GeoRestrictions,
            CustomLP,
            OfferLP,
            ModelSelect
        },
        computed: {
            ...mapGetters('offer', ['getOffer']),
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('lpOffers', ['getLpOffers'])
        },
        async mounted() {
            await this.$store.dispatch('offers/saveOffersStore')
            await this.$store.dispatch('offer/saveOfferStore', this.id)
            await this.$store.dispatch('lpOffers/saveLpOffersStore')

            // await store.dispatch('affiliates/saveAffiliatesStore')
            await this.$store.dispatch('countries/saveCountriesStore')
            // await store.dispatch('dimensions/saveDimensionsStore')
            // await store.dispatch('campaigns/saveCampaignsStore')
            await this.$store.dispatch('lp/saveLPStore')
            // await store.dispatch('prods/saveProdsStore')
            // await store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')
        },
        methods: {
            ...mapMutations('offer', ['updOffer']),
            getLpModify() {
                return this.getLpOffers.map(item => {
                    item.value = item.id
                    item.text = `${item.name} (offerId-${item.offerId}) ${item.url}`
                    return item
                })
            },
            getOffersModify() {
                return this.getOffers.map(item => {
                    item.value = item.id
                    item.text = `${item.name} `
                    return item
                })
            },
            updValue(event, name) {
                let obj = {}

                if (
                    name === 'conversionType'
                    || name === 'defaultLp'
                    || name === 'offerIdRedirect'
                ) {
                    obj.fieldName = name
                    obj.value = event
                } else if (name === 'status') {

                    obj.fieldName = name
                    obj.value = event.target.value.toLowerCase()
                } else {
                    obj.fieldName = name
                    obj.value = event.target.value
                }

                this.updOffer(obj)
            },
            async updateValue(conversionType) {
                console.log(conversionType)
                debugger
            },
            async saveOffer() {
                const {id} = await this.$store.dispatch('offer/saveOfferDb')
                if (id) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Offer updated`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
                    this.$swal.fire({
                        title: 'Offer save errors',
                        type: 'error',
                        text: 'Please check backend errors ',
                        confirmButtonColor: '#2ED47A',
                    })
                }


            },
            showGeoRestrictionsModal(id) {
                let modal_id = 'modal_' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            showCustomLPModal(id) {
                let modal_id = 'modal_lp' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            showOfferAddLpModal(id) {
                let modal_id = 'modal_add_lp' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            addClassActive(value) {
                return value && 'active' || ''
            },
            checkConversionType(str) {
                let offer = this.getOffer
                // debugger
                if (offer.length !== 0 && offer[0].conversionType === str) {
                    return `checked`
                }

            },
            formatDate_(date) {
                return formatData(date)
            },
            capitalizeFirstLetter(str) {
                return str && str.charAt(0).toUpperCase() + str.slice(1)
            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            getStatusList() {
                return [
                    {id: 0, name: 'Active'},
                    {id: 1, name: 'Inactive'},
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

        .conversionType
            display: table-cell
            position: relative
            padding-left: 35px
            margin-bottom: 12px
            cursor: pointer
            font-size: 22px
            -webkit-user-select: none
            -moz-user-select: none
            -ms-user-select: none
            user-select: none

        .conversionType input
            position: absolute
            opacity: 0
            cursor: pointer

        .conversionTypeCheckMark
            position: absolute
            top: 0
            left: 0
            height: 25px
            width: 25px
            background-color: #eee
            border-radius: 50%

        .conversionType:hover input ~ .conversionTypeCheckMark
            background-color: #ccc


        .conversionType input:checked ~ .conversionTypeCheckMark
            background-color: #2196F3

        .conversionTypeCheckMark:after
            content: ""
            position: absolute
            display: none

        .conversionType input:checked ~ .conversionTypeCheckMark:after
            display: block


        .conversionType .conversionTypeCheckMark:after
            top: 9px
            left: 9px
            width: 8px
            height: 8px
            border-radius: 50%
            background: white

</style>