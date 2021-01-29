<template>
    <div id="edit-offer">
        <TopBar></TopBar>
        <MenuNav></MenuNav>

        <h2>Editing: {{getOffer.length !==0 && getOffer[0].name}}</h2>

        <label class="editMode" v-show="checkEditMode()">Edit MODE </label>

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
            <!-- <b-col cols="6">
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
            </b-col> -->

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
                <div class="condition__controls">
                    <label>Vertical</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="advertiserType">{{getOffer.length !==0 && getOffer[0].advertiser}}</option>
                        <!-- TODO: Need to add Vertical field, like the mock -->
                    </select>
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
                                :selected="formatStr(name) === formatStr(getOffer.length !==0 && getOffer[0].status || '')"
                                :key="id"
                        >{{name}}
                        </option>

                        <!-- TODO: Replace with the 4 status types (Public, Private, Apply to Run, Inactive) like the mock -->

                    </select>
                </div>
            </b-col>

            <b-col cols="2">
            </b-col>


            <b-col cols="3">
                <div class="campaign-block condition__controls">
                    <label for="label-platform">Conversion Flow Type</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">

                        <!-- <label class="btn btn-secondary-" :class="addClassActive(item.platformAndroid)">
                        <input
                                type="checkbox"
                                autocomplete="off"
                                @change="updateValue(item,`platformAndroid`)"
                        > Android
                        </label> -->

                        <label class="conversionType btn btn-secondary-">CPI
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`cpi`)"
                                    name="radio"
                                    @change="updValue(`cpi`, `conversionType`)"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                        <label class="conversionType btn btn-secondary-">CPA
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`cpa`)"
                                    @change="updValue(`cpa`, `conversionType`)"
                                    name="radio"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                        <label class="conversionType btn btn-secondary-">CPL
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`cpl`)"
                                    @change="updValue(`cpl`, `conversionType`)"
                                    name="radio"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                        <label class="conversionType btn btn-secondary-">CPC
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`cpc`)"
                                    @change="updValue(`cpc`, `conversionType`)"
                                    name="radio"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                        <label class="conversionType btn btn-secondary-">CPM
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`cpm`)"
                                    @change="updValue(`cpm`, `conversionType`)"
                                    name="radio"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                        <label class="conversionType btn btn-secondary-">Hybrid/Multistep
                            <input
                                    type="radio"
                                    :checked="checkConversionType(`hybrid/multistep`)"
                                    @change="updValue(`hybrid/multistep`, `conversionType`)"
                                    name="radio"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                    </div>

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
                <b-button variant="light" class="btn-add-line" @click="">
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
                           :id="defineId(`offerName`,id)"
                           @change="updValue($event, `name`)"
                           maxlength="25"
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

            <b-col cols="12">
                <h2>Restrictions</h2>
            </b-col>

            <b-col cols="3">
                <!-- TODO: Add a preview list (that looks cleaner) to show which countries are banned -->
                <div class="condition__controls"
                     v-b-popover.hover.focus.right.html="getBannedCountries()"
                     title="Banned Countries"
                >
                    <label class="pull-left">GEO Settings</label>
                    <b-button variant="light" class="btn-add-line" v-b-modal.modal
                              @click="showGeoRestrictionsModal(id)"
                    >
                        <i class="far fa-cog"></i> Customize
                    </b-button>

                    <GeoRestrictions :id="'modal_' + id" :ref="'modal_' + id"
                                     :geoId="id"
                                     :geoRules="getOffer.length !==0  && getOffer[0].geoRules && getOffer[0].geoRules"
                                     :offerDefaultLPInfo="getDefaultLPInfo(getOffer.length !==0 && getOffer[0].defaultLp)"
                    >
                    </GeoRestrictions>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           value="Custom (hover for list)"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label class="pull-left">Caps</label>


                    <b-button variant="light" class="btn-add-line" v-b-modal.modal-scrollable
                              @click="showCapsModal(id)"
                    >
                        <i class="far fa-cog"></i> Customize
                    </b-button>

                    <Caps :id="'modal_caps' + id" :ref="'modal_caps' + id"
                          :offerId="id"
                          :offerCap="getOfferCap.length !==0 && getOfferCap"
                          :offers="getOffersModify()"
                    >
                    </Caps>

                    <input type="text"
                           class="condition__matches campaign custom-input"
                           :value="getCapsStatus(getOfferCap)"
                           disabled
                    >


                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="4">
                <h2>Default Settings</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="light" class="btn-add-line" v-b-modal.modal-scrollable
                          @click="showCustomLPModal(id)"
                >
                    <i class="far fa-cog"></i> Customize
                </b-button>

                <CustomLP :id="'modal_lp' + id" :ref="'modal_lp' + id"
                          :customLPId="id"
                          :defaultLp="getLpDefault"
                          :customLPRules="getOffer.length !==0  && getOffer[0].customLPRules && JSON.parse(getOffer[0].customLPRules)">
                </CustomLP>
            </b-col>

            <b-col cols="6">
            </b-col>

            <b-col cols="3">
                <div class="condition__controls">
                    <div class="pull-right">
<!--                        <b-button variant="light" class="btn-add-line" v-b-modal.modal-scrollable-->
<!--                                  @click="showOfferAddLpModal(id)"-->
<!--                        >-->
<!--                            <i class="far fa-plus" data-fa-transform="shrink-1"></i> Add LP-->
<!--                        </b-button>-->

<!--                        <OfferLP :id="'modal_add_lp' + id" :ref="'modal_add_lp' + id"-->
<!--                                 :offerId="id"-->
<!--                        >-->
<!--                        </OfferLP>-->
                    </div>

                    <label>Default LP {{getLPValue()}}</label>
                    <model-select
                            :options="getLpModify()"
                            :id="defineId(`lpsId`,id)"
                            placeholder="Search landing page..."
                            :value="getLPValue()"
                            @input="updValue($event,`defaultLp`)"
                            v-b-popover.hover.focus.right.html="getLpURL()"
                    >
                    </model-select>

                    <!-- <span class="landing-page-box">
                        <span class="landing-page-name" v-if="props.row.landingPage.length<=14" @click="copyText(props.row.landingPage)">
                            {{ props.row.landingPage }}
                        </span>
                        <span class="landing-page-name" v-if="props.row.landingPage.length>=15" @click="copyText(props.row.landingPage)" v-b-tooltip.hover.html.right="props.row.landingPage">
                            {{ props.row.landingPage.substring(0,15)+"..." }}
                        </span>
                    </span> -->

                </div>
            </b-col>
            <b-col cols="3">
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


        </b-row>

        <b-button class="btn-save" @click="this.saveOffer">
            <i class="fad fa-save"></i> Save Changes
        </b-button>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import logo from '../logo.vue'
    import TopBar from '../topbar.vue'
    import MenuNav from '../menunav.vue'
    import {formatData} from '../../helpers'
    import GeoRestrictions from './geoRestrictions'
    import Caps from './caps'
    import CustomLP from './customLP'
    import OfferLP from './offerLP'
    import {ModelSelect} from 'vue-search-select'

    export default {
        name: 'editOffer',
        components: {
            logo,
            MenuNav,
            TopBar,
            GeoRestrictions,
            Caps,
            CustomLP,
            OfferLP,
            ModelSelect
        },
        computed: {
            ...mapGetters('offer', [
                'getOffer',
                'getOfferOrigin',
                'getOfferCap',
                'getOfferCapOrigin',
                'getOfferGeo',
                'getOfferGeoOrigin',
                'getCustomLPRules',
                'getCustomLPRulesOrigin',
            ]),
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('lpOffers', ['getLpOffers','getCheckSumLpOffer'])
        },
        async mounted() {
            await this.$store.dispatch('offers/saveOffersStore')
            await this.$store.dispatch('offer/saveOfferStore', this.id)
            await this.$store.dispatch('offer/saveOfferCapStore', this.id)
            await this.$store.dispatch('lpOffers/saveLpOffersStore', this.id)

            // await store.dispatch('affiliates/saveAffiliatesStore')
            await this.$store.dispatch('countries/saveCountriesStore')
            // await store.dispatch('dimensions/saveDimensionsStore')
            // await store.dispatch('campaigns/saveCampaignsStore')
            await this.$store.dispatch('lp/saveLPStore')

            // menuOffersId  disabled
            // let el = document.querySelector(`#menuOffersId`)
            // el.setAttribute("disabled","disabled")
            // el.addClass("disabled")
            // el.classList.add("disabled")
            // el.disabled=""
            // debugger

            // await store.dispatch('prods/saveProdsStore')
            // await store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')
        },
        methods: {
            ...mapMutations('offer', ['updOffer']),
            // getLpModify() {
            //     return this.getLpOffers.map(item => {
            //         item.value = item.id
            //         item.text = `${item.name} (offerId-${item.offerId}) ${item.url}`
            //         return item
            //     })
            // },
            // getLpURL() {
            //     return this.getLpOffers.map(item => {
            //         item.value = item.id
            //         item.text = `${item.url}`
            //         return item.url
            //     })
            // },
            checkEditMode(){

                if  (JSON.stringify(this.getOfferOrigin) !==JSON.stringify(this.getOffer)
                    || JSON.stringify(this.getOfferCapOrigin) !==JSON.stringify(this.getOfferCap)
                    || JSON.stringify(this.getCheckSumLpOffer) !==JSON.stringify(this.getLpOffers)
                    || JSON.stringify(this.getOfferGeoOrigin) !==JSON.stringify(this.getOfferGeo)
                    || JSON.stringify(this.getCustomLPRulesOrigin) !==JSON.stringify(this.getCustomLPRules)
                ){
                    return true
                }
            },
            getBannedCountries() {
                if (this.getOffer.length !== 0 && this.getOffer[0].geoRules) {
                    let geoR = JSON.parse(this.getOffer[0].geoRules)
                    let geoCountry = geoR.geo.map(item => item.country)
                    return geoCountry.join(',')
                }
            },
            getLpURL() {

                if (this.getOffer.length !== 0) {

                    let obj = this.getLpOffers.filter(item => (item.id === this.getOffer[0].defaultLp))
                    return obj.length !== 0 && obj[0].url
                }
            },
            getLpDefault() {
                if (this.getOffer.length !== 0) {
                    return this.getOffer[0].defaultLp
                }
            },
            getLpModify() {
                return this.getLpOffers.map(item => {
                    item.value = item.id
                    item.text = `${item.name} (ID: ${item.id})`
                    return item
                })
            },
            getDefaultLPInfo(defaultLp) {
                if (!defaultLp) return
                return this.getLpOffers.filter(item => {
                    return item.id === defaultLp
                })
            },
            getOffersModify() {
                return this.getOffers.map(item => {
                    item.value = item.id
                    item.text = `${item.name} (OfferId-${item.id})`
                    return item
                })
            },
            getLPValue() {
                if (this.getOffer.length !== 0) {
                    return this.getOffer[0].defaultLp
                }
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
                    if (event.target.value.toLowerCase() === 'apply to run') {
                        obj.value = `apply_to_run`
                    } else {
                        obj.value = event.target.value.toLowerCase()
                    }

                } else {
                    obj.fieldName = name
                    obj.value = event.target.value
                }

                this.updOffer(obj)
            },
            getCapsStatus(caps) {
                return caps.length !== 0 && `Caps defined` || `No caps`
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
            showCapsModal(id) {
                let modal_id = 'modal_caps' + id

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
            formatStr(str) {
                return str && str.toLowerCase().replace(/_/g, '').replace(/\s/g, '')
            },
            defineId(name, id) {
                return `${name}-${id}`
            },
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

        .conversionType
            display: table-cell
            position: relative
            padding-left: 35px
            margin-bottom: 12px
            cursor: pointer
            font-size: 16px
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
            top: 15px
            left: 15px
            height: 10px
            width: 10px
            background-color: #eee
            border-radius: 50%

        .conversionType:hover input ~ .conversionTypeCheckMark
            background-color: #ccc


        .conversionType input:checked ~ .conversionTypeCheckMark
            background-color: #36B8E1

        .conversionTypeCheckMark:after
            content: ""
            position: absolute
            display: none

        .conversionType input:checked ~ .conversionTypeCheckMark:after
            display: block

        .conversionType .conversionTypeCheckMark:after
            // top: 6px
            // left: 6px
            // width: 8px
            // height: 8px
            // border-radius: 50%
            background: transparent

        .conversionType:active
            color: #36B8E1
            border-color: #36B8E1
            z-index: 2

        .conversionType.btn.btn-secondary-:focus-within
            color: #36B8E1
            border-color: #36B8E1
            z-index: 2

</style>