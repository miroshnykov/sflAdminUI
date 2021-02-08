<template>
    <div id="editRules">

        <b-row class="editRules">
            <b-col cols="10">
                <h1>editRules</h1>
            </b-col>
            <b-col cols="2">
                <div class="action-buttons">
                    <b-button variant="link"
                              @click="closeEdit"
                              v-b-tooltip.hover.right="'Back to Fraud Review'">
                        <i class="far fa-times"></i>
                    </b-button>
                </div>
            </b-col>

            <b-col cols="12">
                <p>Edit rule</p>
            </b-col>

            PARAMS {{JSON.stringify(this.$route.params)}}
            EDIT RULES {{JSON.stringify(this.editRule)}}

        </b-row>

        <transition name="expand-down">

 <span
         :id="defineId(`condition`,this.editRule.position)"
         :ref="defineId(`condition`,this.editRule.position)"
         class="condition__controls" :class="getEditingClass(this.editRule)"
 >
                            <div class="condition-line">
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`filtertype`,this.editRule.position)"
                                        :ref="defineId(`filtertype`,this.editRule.position)"
                                        @change="handleFilterType($event, this.editRule)"
                                >

                                  <!-- <option :value="null">-- Select Filter --</option> -->
                                  <option
                                          id="filterType"
                                          v-for="{id, name} in getFilterList()"
                                          :selected="id === getRules(`filterTypeId`)"
                                          :value="id"
                                          :key="id"
                                  >{{name}}
                                  </option>

                                </select>
                            </div>

                            <div class="condition-line">
                                  <select
                                          :id="defineId(`dimension`,this.editRule.position)"
                                          :ref="defineId(`dimension`,this.editRule.position)"
                                          class="condition__dimension-name condition__matches custom-select"
                                          @change="handleChangeDimension($event, this.editRule)"
                                          :disabled="this.editRule.disabled"
                                  >
                                      <option :value="null">-- Select Dimension --</option>

                                      <option
                                              v-for="{id, name, displayedName} in getDimensions"
                                              :value="id"
                                              :selected="id === getRules(`dimensionId`)"
                                              :key="id"

                                      >{{name}}

                                      </option>
                                  </select>
                                  <label for="label-dimension">Dimension Filter
                                  </label>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getAffiliatesModify(this.editRule)"
                                        @input="handleChangeAff($event, this.editRule)"
                                        :id="defineId(`aff`,this.editRule.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(this.editRule)
                                        v-show="checkAff(this.editRule)"
                                >
                                </model-select>
                                <label v-show="checkAff(this.editRule)" for="label-affiliate">Affiliate ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getProdsModify(this.editRule)"
                                        @input="handleChangeProd($event, this.editRule)"
                                        :id="defineId(`prod`,this.editRule.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(this.editRule)
                                        v-show="checkProd(this.editRule)"
                                >
                                </model-select>
                                <label v-show="checkProd(this.editRule)" for="label-prod">Prods ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`matchtype`,this.editRule.position)"
                                        :ref="defineId(`matchtype`,this.editRule.position)"
                                        @change="handleMatchType($event, this.editRule)"
                                        v-show="this.editRule.dimensionName === 'affiliate_sub_campaign'"
                                >
                                    <!-- <option :value="null">-- Match type --</option> -->
                                    <option
                                            v-for="{id, name} in getMatchList()"
                                            :value="id"
                                            :selected="id === getRules(`matchTypeId`)"
                                            :key="id"
                                    >{{name}}

                                    </option>

                                </select>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getCountriesModify(this.editRule)"
                                        @input="handleChangeCountry($event, this.editRule)"
                                        :id="defineId(`country`,this.editRule.position)"
                                        :ref="defineId(`country`,this.editRule.position)"
                                        class="condition__country condition__matches custom-select "
                                        :class="getClassDisabled(this.editRule)"
                                        :value="this.editRule.value.substr(this.editRule.value.indexOf('/')+1)"
                                        v-show="checkCountry(this.editRule)"
                                >
                                </model-select>
                                <label v-show="checkCountry(this.editRule)" for="label-country">Country</label>

                            </div>


                            <div class="condition-line">
                                <select
                                        :ref="defineId(`campaign`,this.editRule.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeCampaign($event, this.editRule)"
                                        v-show="checkCampaign(this.editRule)"
                                >
                                    <option :value="null">-- Select Campaign --</option>
                                    <option
                                            v-for="{id, name} in getAffiliateCampaigns(this.editRule)"
                                            :value="id"
                                            :selected="id === this.editRule.value || id === Number(this.editRule.value.substr(this.editRule.value.indexOf('/')+1))"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkCampaign(this.editRule)" for="label-campaign">Campaign
                                </label>
                            </div>

                            <div class="condition-line">
                                <input type="text"
                                       :id="defineId(`subcampaign`,this.editRule.position)"
                                       :ref="defineId(`subcampaign`,this.editRule.position)"
                                       placeholder="Sub Campaign Name"
                                       class="condition__matches custom-input"
                                       :value="(this.editRule.dimensionName === 'affiliate_sub_campaign') && this.editRule.value.substr(this.editRule.value.indexOf('/')+1, 40) || ''"
                                       v-show="checkSubCampaign(this.editRule)"
                                       @change="handleChangeSubCampaign($event, this.editRule)"
                                >
                                <label v-show="checkSubCampaign(this.editRule)"
                                       for="label-sub-campaign">Sub Campaign</label>
                            </div>

                            <div class="condition-line">

                                <input type="text"
                                       :id="defineId(`website`,this.editRule.position)"
                                       :ref="defineId(`website`,this.editRule.position)"
                                       placeholder="Website"
                                       class="condition__matches custom-input"
                                       :value="(this.editRule.dimensionName === 'website') && this.editRule.value||''"
                                       v-show="checkWebsite(this.editRule)"
                                       @change="handleChangeWebsite($event, this.editRule)"
                                >

                                <!--                                <model-select-->
                                <!--                                        :options="getWebsitesModify()"-->
                                <!--                                        @input="handleChangeWebsite($event, this.editRule)"-->
                                <!--                                        :id="defineId(`website`,this.editRule.position)"-->
                                <!--                                        :ref="defineId(`website`,this.editRule.position)"-->
                                <!--                                        class="condition__country condition__matches custom-select "-->
                                <!--                                        v-show="checkWebsite(this.editRule)"-->
                                <!--                                        :value="this.editRule.value"-->

                                <!--                                >-->
                                <!--                                </model-select>-->
                                <label v-show="checkWebsite(this.editRule)" for="label-website">Website</label>


                            </div>

                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          @click="removeCondition(this.editRule.position)"
                                          class="remove_condition"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete Rule'"
                                  >
                                    <i class="far fa-trash" data-fa-transform="shrink-1"></i>
                                  </button>
                            </div>



                        </span>

        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import 'bootstrap/dist/css/bootstrap.css'
    import {ModelSelect} from 'vue-search-select'

    export default {
        name: 'edit-rules',
        computed: {
            ...mapGetters('segment', ['getSegmentFilter']),
            ...mapGetters('segments', ['getSegments']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('affiliates', ['getAffiliates']),
            ...mapGetters('prods', ['getProds']),
            ...mapGetters('dimensions', ['getDimensions']),
            ...mapGetters('campaigns', ['getAffiliateCampaigns']),
        },
        components: {ModelSelect},
        async mounted() {
            await this.$store.dispatch('segment/saveSegmentConditionsStore', this.$route.params.id)
            await this.$store.dispatch('affiliates/saveAffiliatesStore')
            await this.$store.dispatch('countries/saveCountriesStore')
            await this.$store.dispatch('dimensions/saveDimensionsStore')
            await this.$store.dispatch('campaigns/saveCampaignsStore')
            // await this.$store.dispatch('lp/saveLPStore')
            await this.$store.dispatch('prods/saveProdsStore')
            await this.$store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')

            let arr = this.getSegmentFilter.filter(item=>{
                return item.position === Number(this.$route.params.position)
            })

            this.editRule = arr[0]

        },
        methods: {
            ...mapMutations('segments', ['searchFilter']),
            closeEdit(){
                this.$router.push(`/segmentView/${this.$route.params.type}/${this.$route.params.id}/${this.$route.params.position}`)
            },
            getRules(field){

                // let dim = this.editRule[field]
                // if (field === 'dimensionId'){
                //     debugger
                // }
                return this.editRule[field]
            },
            getCountriesModify(item) {

                // console.log(`Country:${JSON.stringify(item)}`)
                if (item.dimensionId === 0) {
                    let obj = []
                    obj.push({value: 0, text: '*** Add more items ***'})
                    return obj
                    // return this.getCountries.map(item => {
                    //     item.value = item.code
                    //     item.text = item.name + ' (' + item.code + ') '
                    //     return item
                    // })
                }
                return this.getCountries.map(item => {
                    item.value = item.code
                    item.text = item.name + ' (' + item.code + ') '
                    return item
                })
                return
                const value = this.getValue(item)
                let refCountry = `country-${item.position}`
                let countryEl = document.querySelector(`#${refCountry}`) && document.querySelector(`#${refCountry}`).parentNode || null
                if (value === '' || Number(value) === 0) {

                    if (countryEl) {
                        let listMenu = countryEl.querySelector('.menu')
                        if (listMenu) {
                            listMenu.style.display = 'block'
                        }

                    }

                    let self = this
                    self.countryEl = countryEl
                    setTimeout(() => {
                        if (self.countryEl) {
                            let listMenu = self.countryEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'block'
                            }
                        }
                    }, 200)

                    return this.getCountries.map(item => {
                        item.value = item.code
                        item.text = item.name + ' (' + item.code + ') '
                        return item
                    })
                } else {
                    let obj = this.getCountries.filter(item => item.value === value)
                    obj.push({value: 0, text: '*** Add more items ***'})

                    let self = this
                    self.countryEl = countryEl
                    setTimeout(() => {
                        if (self.countryEl) {
                            let listMenu = self.countryEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'none'
                            }

                        }

                    }, 200)

                    return obj.map(item => {
                        item.value = item.code
                        item.text = item.name + ' (' + item.code + ') '
                        return item
                    })
                }

            },
            getAffiliatesModify(item) {

                // console.log(`Affiliates:${JSON.stringify(item)}`)
                if (item.dimensionId === 0) {
                    let obj = []
                    obj.push({id: 0, name: '*** Add more items ***'})
                    console.log('Empty affiliate')
                    return obj
                    //
                    // return this.getAffiliates.map(item => {
                    //     item.value = item.id.toString()
                    //     item.text = item.name + ' (' + item.id + ') '
                    //     return item
                    // })
                }
                const value = this.getValue(item)
                let refAffiliate = `aff-${item.position}`
                let affiliateEl = document.querySelector(`#${refAffiliate}`) && document.querySelector(`#${refAffiliate}`).parentNode || null
                if (value === '' || Number(value) === 0) {

                    console.log(`Affiliates value:${value} :${JSON.stringify(item)}`)

                    if (affiliateEl) {
                        let listMenu = affiliateEl.querySelector('.menu')
                        if (listMenu) {
                            listMenu.style.display = 'block'
                        }

                    }

                    let self = this
                    self.affiliateEl = affiliateEl
                    setTimeout(() => {
                        if (self.affiliateEl) {
                            let listMenu = self.affiliateEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'block'
                            }
                        }
                    }, 200)

                    return this.getAffiliates.map(item => {
                        item.value = item.id.toString()
                        item.text = item.name + ' (' + item.id + ') '
                        return item
                    })
                } else {
                    let obj = this.getAffiliates.filter(item => item.id === Number(value))
                    obj.push({id: 0, name: '*** Add more items ***'})

                    // console.log(`Affiliates value:${value}:${JSON.stringify(item)}`)
                    let self = this
                    self.affiliateEl = affiliateEl
                    setTimeout(() => {
                        if (self.affiliateEl) {
                            let listMenu = self.affiliateEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'none'
                            }

                        }

                    }, 200)

                    return obj.map(item => {
                        item.value = item.id.toString()
                        item.text = item.name + ' (' + item.id + ') '
                        return item
                    })
                }

            },
            getProdsModify(item) {

                // console.log(`Prods:${JSON.stringify(item)}`)

                if (item.dimensionId === 0) {
                    let obj = []
                    obj.push({id: 0, name: '*** Add more items ***'})
                    console.log('Empty prods')
                    return obj
                    // return this.getProds.map(item => {
                    //     item.value = item.id.toString()
                    //     item.text = item.name + ' (' + item.id + ') '
                    //     return item
                    // })
                }

                let refProd = `prod-${item.position}`
                let prodEl = document.querySelector(`#${refProd}`) && document.querySelector(`#${refProd}`).parentNode || null

                // const {value} = item
                const value = this.getValue(item)

                if (value === '' || Number(value) === 0) {
                    // console.log(`prod value:${value} :${JSON.stringify(item)}`)

                    let refProd = `prod-${item.position}`
                    let prodEl = document.querySelector(`#${refProd}`) && document.querySelector(`#${refProd}`).parentNode || null
                    if (prodEl) {
                        let listMenu = prodEl.querySelector('.menu')
                        if (listMenu) {
                            listMenu.style.display = 'block'
                        }
                    }

                    let self = this
                    self.prodEl = prodEl
                    setTimeout(() => {
                        if (self.prodEl) {
                            let listMenu = self.prodEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'block'
                            }
                        }
                    }, 200)

                    return this.getProds.map(item => {
                        item.value = item.id.toString()
                        item.text = item.name + ' (' + item.id + ') '
                        return item
                    })
                } else {
                    let obj = this.getProds.filter(item => item.id === Number(value))
                    obj.push({id: 0, name: '*** Add more items ***'})
                    // console.log(`prod value:${value} :${JSON.stringify(item)}`)
                    let self = this
                    self.prodEl = prodEl
                    setTimeout(() => {
                        if (self.prodEl) {
                            let listMenu = self.prodEl.querySelector('.menu')
                            if (listMenu) {
                                listMenu.style.display = 'none'
                            }

                        }

                    }, 200)

                    return obj.map(item => {
                        item.value = item.id.toString()
                        item.text = item.name + ' (' + item.id + ') '
                        return item
                    })
                }
            },
            getClassDisabled(item) {
                if (this.checkCountryDisabled(item)) {
                    return 'disabled'
                }
            },
            getValue(item) {
                return item.value.substr(0, item.value.indexOf('/')) || item.value
            },
            getEditingClass(item) {
                // console.log(' >>>  getEditingClass item:')
                // console.table(reFormatJSON(item))
                if (item.value.substr(item.value.indexOf('/') + 1, item.value.length) === ''
                    || item.value === ''
                    || item.dimensionId === 0
                ) {
                    return 'condition-editing'
                }
            },
            getFilterList() {
                return [
                    {id: 0, name: 'Include'},
                    {id: 1, name: 'Exclude'}
                ]
            },
            getMatchList() {
                return [
                    {id: 0, name: 'equals'},
                    {id: 1, name: 'does not equal'},
                    {id: 2, name: 'contains'},
                    {id: 3, name: 'does not contain'}
                ]
            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            validateValue: (data, value) => {
                return data.filter(item => {
                    if (item.value.substr(item.value.indexOf('/') + 1, item.value.length - 1) === value
                        || item.value === value
                    ) {
                        return item
                    }
                })
            },
            getDimensionId: (data, dimensionName) => {
                let dimension = data.filter(({name}) => (name === dimensionName))
                return dimension.length > 0 && dimension[0].id
            },
            checkAff(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate`)
                    || item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_country`)
                    || item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_campaign`)
                    || item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_sub_campaign`)
            },
            checkProd(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `prod`)
            },
            checkCountry(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `country`)
                    || item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_country`)
            },
            checkCountryDisabled(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_country`)
            },
            checkCampaign(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_campaign`)
            },
            checkWebsite(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `website`)
            },
            checkSubCampaign(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_sub_campaign`)
            },
            getCurrentDate() {
                let date = new Date()
                return ~~(date.getTime() / 1000)
            },
            hideLabels(data) {
                [].forEach.call(data, (data) => {
                    data.style.display = 'none'
                })
            },
            showLabels(data) {
                [].forEach.call(data, (data) => {
                    data.style.display = 'block'
                })
            },
            changeDimension(value, item) {
                let refCountry = `country-${item.position}`
                let refCampaign = `campaign-${item.position}`
                let refAffiliate = `aff-${item.position}`
                let refProd = `prod-${item.position}`
                let refSubCampaign = `subcampaign-${item.position}`
                let refCondition = `condition-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`
                let websiteRef = `website-${item.position}`

                let countryEl = document.querySelector(`#${refCountry}`).parentNode || null
                let campaignEl = this.$refs[refCampaign][0] || null
                let subCampaignEl = this.$refs[refSubCampaign][0] || null
                let matchTypeEl = this.$refs[matchTypeRef][0] || null
                let affiliateEl = document.querySelector(`#${refAffiliate}`).parentNode || null
                let prodEl = document.querySelector(`#${refProd}`).parentNode || null

                let websiteEl = document.querySelector(`#${websiteRef}`).parentNode || null

                countryEl.classList.add("disabled")
                let conditionEl = document.querySelector(`#${refCondition}`)
                switch (value) {
                    case `affiliate`:
                        affiliateEl ? affiliateEl.style.display = 'block' : ''
                        countryEl.style.display = 'none'
                        prodEl ? prodEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        item.value = ''
                        item.dimensionId = 1
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-country], label[for=label-campaign], label[for=label-prod]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate]`)
                        )
                        break
                    case `country`:
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        countryEl.style.display = 'block'
                        countryEl.disabled = true
                        countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 2
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-prod]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-country]`)
                        )
                        break
                    case `affiliate_campaign`:
                        affiliateEl ? affiliateEl.style.display = 'block' : ''
                        countryEl.style.display = 'none'
                        campaignEl ? campaignEl.style.display = 'initial' : ''
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        item.value = ''
                        item.dimensionId = 5
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-country], label[for=label-sub-campaign]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign]`)
                        )
                        break
                    case `affiliate_country`:
                        affiliateEl ? affiliateEl.style.display = 'block' : ''
                        countryEl.style.display = 'block'
                        prodEl ? prodEl.style.display = 'none' : ''
                        item.value = ''
                        item.dimensionId = 3
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-country], label[for=label-campaign], label[for=label-prod]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-country]`)
                        )
                        break
                    case `prod`:
                        prodEl ? prodEl.style.display = 'block' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 4
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-prod]`)
                        )
                        break
                    case `website`:
                        websiteEl ? websiteEl.style.display = 'block' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 6
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-website]`)
                        )
                        break
                    // case `affiliate_sub_campaign`:
                    //     affiliateEl ? affiliateEl.style.display = 'block' : ''
                    //     countryEl.style.display = 'none'
                    //     campaignEl ? campaignEl.style.display = 'none' : ''
                    //     subCampaignEl ? subCampaignEl.style.display = 'initial' : ''
                    //     matchTypeEl ? matchTypeEl.style.display = 'initial' : ''
                    //     item.value = ''
                    //     item.dimensionId = 5
                    //     this.hideLabels(
                    //         conditionEl.querySelectorAll(`label[for=label-country], label[for=label-campaign]`)
                    //     )
                    //     this.showLabels(
                    //         conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-sub-campaign]`)
                    //     )
                    //     break
                    default:
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        countryEl.style.display = 'none'
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''

                }
                this.$refs[refCondition][0].style.background = null

            },
            handleChangeDimension(event, item) {
                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                console.log(`dimensionName:${dimensionName}`)
                this.changeDimension(dimensionName, item)
                // console.log('handleChangeDimension event:', event.target.value)
                // console.log('handleChangeDimension item:', item)
            },
            getDimensionName(ref) {
                return ref.options[ref.selectedIndex].text
            },
            handleFilterType(event, item) {
                let matchTypeRef = `matchtype-${item.position}`
                item.filterTypeId = Number(event.target.value)
                item.matchTypeId = this.$refs[matchTypeRef] && Number(this.$refs[matchTypeRef][0].value)
            },
            handleMatchType(event, item) {
                let filterTypeRef = `filtertype-${item.position}`
                item.matchTypeId = Number(event.target.value)
                item.filterTypeId = this.$refs[filterTypeRef] && Number(this.$refs[filterTypeRef][0].value)
            },
            handleDimAff(event, item, self) {

                let affRef = `aff-${item.position}`
                let dimensionRef = `dimension-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let recCheck = self.validateValue(self.segmentFilter, event)
                if (recCheck.length > 0) {
                    self.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })
                    self.$refs[affRef][0].value = ``
                    self.$refs[dimensionRef][0].value = recCheck[0].dimensionId
                    item.value = ``
                    item.dimensionName = ``
                    item.dimensionId = null
                    return
                }
                let refCondition = `condition-${item.position}`
                self.$refs[refCondition][0].style.background = null

                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = event.toString()
                item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate`
                item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate`)

                // self.$refs[dimensionRef][0].disabled = true
                // console.log(' !!!!!!!!!!!!!1 dimensionRef ',self.$refs[dimensionRef])
                // console.log('disabled:', self.$refs[dimensionRef][0].disabled)
                // self.$refs[dimensionRef][0].disabled = true
                // if (document.querySelector(`#dimension-${item.position}`)) {
                //     document.querySelector(`#dimension-${item.position}`).disabled = true
                // }

            },
            handleDimAffCountry(event, item, self) {

                let affRef = `aff-${item.position}`
                let dimensionRef = `dimension-${item.position}`
                let refCondition = `condition-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                self.$refs[refCondition][0].style.background = null

                let affCountry = self.affiliates.filter(item => (item.id === Number(event)))


                let itemValue = affCountry.length !== 0 && `${event}/${affCountry[0].countryCode}` || `0/0`


                // let recCheck = self.validateValue(self.segmentFilter, itemValue)
                // if (recCheck.length > 0) {
                //     self.$swal.fire({
                //         type: `warning`,
                //         title: `record exists: ${recCheck[0].value}  `,
                //         text: ` dimension: ${recCheck[0].dimensionName}`,
                //         footer: ``
                //     })
                //
                //     self.$refs[affRef][0].value = ``
                //     self.$refs[dimensionRef][0].value = recCheck[0].dimensionId
                //
                //     item.value = ``
                //     item.dimensionName = ``
                //     item.dimensionId = null
                //     return
                // }
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = itemValue
                item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate_country`
                item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate_country`)

            },
            handleDimAffCampaign(event, item, self) {

                if (event === '' || event === '/') return
                let recCheck = self.validateValue(self.segmentFilter, event)
                if (recCheck.length > 0) {
                    self.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    self.$refs[affRef][0].value = ``
                    self.$refs[dimensionRef][0].value = recCheck[0].dimensionId

                    item.value = ``
                    item.dimensionName = ``
                    item.dimensionId = null
                    return
                }

                let affRef = `aff-${item.position}`
                let dimensionRef = `dimension-${item.position}`
                let refCondition = `condition-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`
                self.$refs[refCondition][0].style.background = null

                // let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                // console.log(' dimensionName', dimensionName)

                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = event + '/'
                item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate_campaign`
                item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate_campaign`)

                // this.$store.dispatch('campaigns/saveCampaignsAffiliateStore', event).then(res => {
                //     item.user = this.verifyTokenEmail
                //     item.dateAdded = this.getCurrentDate()
                //     item.value = event + '/'
                //     item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                //     item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                //     item.dimensionName = `affiliate_campaign`
                //     item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate_campaign`)
                // })

            },
            handleDimAffSubCampaign(event, item, self) {

                if (event === '' || event === '/') return
                let recCheck = self.validateValue(self.segmentFilter, event)
                if (recCheck.length > 0) {
                    self.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    self.$refs[affRef][0].value = ``
                    self.$refs[dimensionRef][0].value = recCheck[0].dimensionId

                    item.value = ``
                    item.dimensionName = ``
                    item.dimensionId = null
                    return
                }

                let affRef = `aff-${item.position}`
                let dimensionRef = `dimension-${item.position}`
                let refCondition = `condition-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                self.$refs[refCondition][0].style.background = null

                // let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                // console.log(' dimensionName', dimensionName)
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = event + '/'
                item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate_sub_campaign`
                item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate_sub_campaign`)
            },
            handleChangeAff(event, item) {
                let dimensionRef = `dimension-${item.position}`

                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                // console.log(' dimensionName', dimensionName)

                let self = this
                switch (dimensionName) {
                    case `affiliate`:
                        this.handleDimAff(event, item, self)
                        break
                    case `affiliate_country`:
                        this.handleDimAffCountry(event, item, self)
                        break
                    case `affiliate_campaign`:
                        this.handleDimAffCampaign(event, item, self)
                        break
                    case `affiliate_sub_campaign`:
                        this.handleDimAffSubCampaign(event, item, self)
                        break
                    default:
                }


            },
            handleChangeProd(event, item) {

                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let refCondition = `condition-${item.position}`
                let refCountry = `country-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let recCheck = this.validateValue(this.segmentFilter, event)
                if (recCheck.length > 0) {
                    this.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    this.$refs[refCountry][0].value = ``
                    this.$refs[dimensionRef][0].value = recCheck[0].dimensionId

                    item.value = ``
                    item.dimensionName = ``
                    item.dimensionId = null
                    return
                }

                this.$refs[refCondition][0].style.background = null
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = event
                item.filterTypeId = Number(this.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(this.$refs[matchTypeRef][0].value)
                item.dimensionName = `prod`
                item.dimensionId = this.getDimensionId(this.getDimensions, `prod`)
            },
            handleChangeCountry(event, item) {

                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let refCondition = `condition-${item.position}`
                let refCountry = `country-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let self = this
                switch (dimensionName) {
                    case `country`:
                        let recCheck = this.validateValue(this.segmentFilter, event)
                        if (recCheck.length > 0) {
                            this.$swal.fire({
                                type: `warning`,
                                title: `record exists: ${recCheck[0].value}  `,
                                text: ` dimension: ${recCheck[0].dimensionName}`,
                                footer: ``
                            })

                            this.$refs[refCountry][0].value = ``
                            this.$refs[dimensionRef][0].value = recCheck[0].dimensionId

                            item.value = ``
                            item.dimensionName = ``
                            item.dimensionId = null
                            return
                        }

                        this.$refs[refCondition][0].style.background = null
                        item.user = this.verifyTokenEmail
                        item.dateAdded = this.getCurrentDate()
                        item.value = event
                        item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                        item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                        item.dimensionName = `country`
                        item.dimensionId = this.getDimensionId(this.getDimensions, `country`)
                        break
                    case `affiliate_country`:
                        this.$refs[refCondition][0].style.background = null
                        item.user = this.verifyTokenEmail
                        item.dateAdded = this.getCurrentDate()
                        item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                        item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                        item.value = item.value.substr(0, item.value.indexOf('/') + 1) + event
                        // item.dimensionName = `affiliate_country`
                        // item.dimensionId = this.getDimensionId(this.getDimensions, `country`)
                        break
                    default:
                }

            },
            handleChangeCampaign(event, item) {
                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let recCheck = this.validateValue(this.segmentFilter, event.target.value)

                if (recCheck.length > 0) {
                    this.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    let refCampaign = `campaign-${item.position}`
                    let dimensionRef = `dimension-${item.position}`
                    this.$refs[refCampaign][0].value = ``
                    this.$refs[dimensionRef][0].value = recCheck[0].dimensionId
                    return
                }
                let refCondition = `condition-${item.position}`
                this.$refs[refCondition][0].style.background = null
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.filterTypeId = Number(this.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(this.$refs[matchTypeRef][0].value)
                item.value = item.value.substr(0, item.value.indexOf('/') + 1) + event.target.value
                item.dimensionName = `affiliate_campaign`
                item.dimensionId = this.getDimensionId(this.getDimensions, `affiliate_campaign`)

            },
            handleChangeWebsite(event, item) {
                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let recCheck = this.validateValue(this.segmentFilter, event.target.value)

                if (recCheck.length > 0) {
                    this.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    let refCampaign = `campaign-${item.position}`
                    let dimensionRef = `dimension-${item.position}`
                    this.$refs[refCampaign][0].value = ``
                    this.$refs[dimensionRef][0].value = recCheck[0].dimensionId
                    return
                }
                let refCondition = `condition-${item.position}`
                this.$refs[refCondition][0].style.background = null
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.filterTypeId = Number(this.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(this.$refs[matchTypeRef][0].value)
                item.value = event.target.value
                item.dimensionName = `website`
                item.dimensionId = this.getDimensionId(this.getDimensions, `website`)

            },
            handleChangeSubCampaign(event, item) {
                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`
                let refCondition = `condition-${item.position}`
                this.$refs[refCondition][0].style.background = null
                let itemValue = item.value.substr(0, item.value.indexOf('/') + 1) + event.target.value
                let recCheck = this.validateValue(this.segmentFilter, itemValue)

                if (recCheck.length > 0) {
                    this.$swal.fire({
                        type: `warning`,
                        title: `record exists: ${recCheck[0].value}  `,
                        text: ` dimension: ${recCheck[0].dimensionName}`,
                        footer: ``
                    })

                    let refCampaign = `campaign-${item.position}`
                    let dimensionRef = `dimension-${item.position}`
                    this.$refs[refCampaign][0].value = ``
                    this.$refs[dimensionRef][0].value = recCheck[0].dimensionId
                    return
                }
                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = itemValue
                item.filterTypeId = Number(this.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(this.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate_sub_campaign`
                item.dimensionId = this.getDimensionId(this.getDimensions, `affiliate_sub_campaign`)

            },
        },

        data() {
            return {
                editRule:[]
            }
        },
    }
</script>