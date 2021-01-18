<template>
    <div v-if="visible" class="modal-mask modal-transition">

        <div class="modal-container">


            <h1>Custom GEO Settings</h1>

            <h1>Caps</h1>

            <h2>Clicks</h2>

            <p> CAP {{JSON.stringify(offerCap)}}</p>

            <b-row class="clicks-amount text-center">
                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount day </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].clickDay || 0"
                               @change="updateCap($event, `clickDay`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">


                    </div>
                    <div class="condition__controls">

                    </div>
                </b-col>
                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount week </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].clickWeek || 0"
                               @change="updateCap($event, `clickWeek`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">

                    </div>
                </b-col>

                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount Month </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].clickMonth || 0"
                               @change="updateCap($event, `clickMonth`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">

                    </div>
                </b-col>

                <b-col cols="4">
                    <div class="condition__controls">
                        <label>&nbsp;</label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Custom
                            </label>
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > 10
                            </label>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <b-row class="clicks-redirect text-center" style="margin-top: -20px">
                <b-col cols="4">
                    <div class="condition__controls">
                        <label for="label-period">Redirect</label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Default
                            </label>
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Custom
                            </label>
                        </div>
                    </div>
                </b-col>
                <b-col cols="8">
                    <div class="condition__controls">
                        <label>clicksRedirectOfferId </label>
                        <model-select
                                :options="getOffersList()"
                                placeholder="Search landing page..."
                                :value="offerCap && offerCap[0].clicksRedirectOfferId|| 0"
                                @input="updateCap($event,`clicksRedirectOfferId`)"
                        >
                        </model-select>
                    </div>
                </b-col>
            </b-row>

            <hr>
            <h2>Sales</h2>

            <b-row class="clicks-amount text-center">

                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount day </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].salesDay || 0"
                               @change="updateCap($event, `salesDay`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">


                    </div>
                    <div class="condition__controls">

                    </div>
                </b-col>
                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount week </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].salesWeek||0"
                               @change="updateCap($event, `salesWeek`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">

                    </div>
                </b-col>

                <b-col cols="3">
                    <div class="condition__controls">
                        <label>Amount Month </label>
                        <input type="number"
                               step=1
                               placeholder="1000"
                               min="1" max="99999"
                               :value="offerCap && offerCap[0].salesMonth|| 0"
                               @change="updateCap($event, `salesMonth`)"
                               class="condition__matches budgetTotal custom-input"
                               pattern="^\d+(?:\.\d{1,2})?$"
                               onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">

                    </div>
                </b-col>

                <b-col cols="4">
                    <div class="condition__controls">
                        <label>&nbsp;</label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Custom
                            </label>
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > 10
                            </label>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <b-row class="clicks-redirect text-center" style="margin-top: -20px">
                <b-col cols="4">
                    <div class="condition__controls">
                        <label for="label-period">Redirect</label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Default
                            </label>
                            <label class="btn btn-secondary-">
                                <input
                                        type="checkbox"
                                        autocomplete="off"
                                > Custom
                            </label>
                        </div>
                    </div>
                </b-col>
                <b-col cols="8">
                    <div class="condition__controls">
                        <label>salesRedirectOfferId </label>
                        <model-select
                                :options="offers"
                                placeholder="Search landing page..."
                                :value="offerCap && offerCap[0].salesRedirectOfferId|| 0"
                                @input="updateCap($event,`salesRedirectOfferId`)"
                        >
                        </model-select>

                    </div>
                </b-col>
            </b-row>


            <b-form-text>* Default redirect LP will be used for banned countries</b-form-text>


            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left" @click="saveLp()">
                        Save
                    </button>
                </b-col>
            </b-row>

            <div class="modal-footer">
            </div>

        </div>
    </div>

</template>

<script>
    import {ModelSelect} from 'vue-search-select'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                visible: false,
                editMode: false,
                segmentId: 0,
                weight: 0,
                lpId: 0,
                id: 0,
            }
        },
        props: ['offerId', 'offerCap','offers'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages']),
            ...mapGetters('countries', ['getCountries'])
        },
        // async mounted() {
        //    debugger
        //     let rule = this.geoRules
        //     debugger
        // },
        methods: {
            ...mapMutations('offer', ['changeGeo', 'allowAll', 'banAll','updOfferCap']),
            ...mapMutations('countries', ['filterCountry']),
            allowAllEvent() {
                this.allowAll()
            },
            getOffersList(){
                return this.offers
            },
            updateCap(event, field){
                let obj={}
                obj.fieldName = field
                if (field === `salesRedirectOfferId` || field === `clicksRedirectOfferId`){
                    obj.value = event
                } else {
                    obj.value = event.target.value
                }

                this.updOfferCap(obj)

            },
            banAllEvent() {
                this.banAll(this.getCountries)
            },
            searchCountry(event) {
                let searchValue = event.target.value
                this.filterCountry(searchValue)
            },
            changeCountry(event, code) {
                console.log(event.target.checked)
                console.log(code)
                let obj = {}
                obj.countryCode = code
                obj.checked = event.target.checked
                this.changeGeo(obj)
            },
            getClassActiveOrNotCountry(code) {
                let include = true
                let exclude = false

                if (this.geoRules) {
                    let rules = JSON.parse(this.geoRules)
                    let match = rules.geo.filter(item => {
                        return item.country === code
                    })
                    if (match.length !== 0) {
                        if (match[0].include === true) {
                            return include
                        } else {
                            return exclude
                        }

                    } else {
                        return exclude
                    }
                }

                return exclude

            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            show(id) {
                this.visible = true
            },
            saveLp(data) {
                this.visible = false
            },
            close() {
                this.visible = false

            },

        }
    }
</script>


<style lang="sass">


</style>
