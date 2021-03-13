<template>
    <transition name="expand-down">
        <section :id="defineId(`filter`,indexFilters)" :ref="defineId(`filter`,indexFilters)" class="filter">
            <p class="filter__title">Rule: <b>{{indexFilters+1}}</b></p>
            <div class="filter__controls">
                <div class="error" style="display:none">Error validation message</div>
                <div v-show="Number(indexFilters) !== 0" class="_and"><span>and</span></div>

                <button
                        class="filter__remove"
                        type="button"
                        v-b-tooltip.hover.bottomright="'Delete Condition'"
                        @click="deleteFilter(indexFilters)"
                >
                    <i class="far fa-trash-alt"></i>
                </button>

                <template v-for="item in this.segmentFilter">
                    <template v-if="item.segmentRuleIndex === indexFilters">
                        <span
                                :id="defineId(`condition`,item.position)"
                                :ref="defineId(`condition`,item.position)"
                                class="condition__controls" :class="getEditingClass(item)"
                        >
                            <div class="condition-line">
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`filtertype`,item.position)"
                                        :ref="defineId(`filtertype`,item.position)"
                                        @change="handleFilterType($event, item)"
                                >

                                  <!-- <option :value="null">-- Select Filter --</option> -->
                                  <option
                                          id="filterType"
                                          v-for="{id, name} in getFilterList()"
                                          :value="id"
                                          :selected="id === item.filterTypeId"
                                          :key="id"
                                  >{{name}}
                                  </option>

                                </select>
                            </div>

                            <div class="condition-line">
                                  <select
                                          :id="defineId(`dimension`,item.position)"
                                          :ref="defineId(`dimension`,item.position)"
                                          class="condition__dimension-name condition__matches custom-select"
                                          @change="handleChangeDimension($event, item)"
                                          :disabled="item.disabled"
                                  >
                                      <option :value="null">-- Select Dimension --</option>

                                      <option
                                              v-for="{id, name, displayedName} in getDimensions"
                                              :value="id"
                                              :selected="id === item.dimensionId"
                                              :key="id"

                                      >{{name}}

                                      </option>
                                  </select>
                                  <label for="label-dimension">Dimension Filter
                                  </label>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getAffiliatesModify(item)"
                                        @input="handleChangeAff($event, item)"
                                        :id="defineId(`aff`,item.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(item)
                                        v-show="checkAff(item)"
                                >
                                </model-select>
                                <label v-show="checkAff(item)" for="label-affiliate">Affiliate ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">
                                <select
                                        :id="defineId(`affiliate-status`,item.position)"
                                        :ref="defineId(`affiliate-status`,item.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeAffiliateStatus($event, item)"
                                        v-show="checkAffiliateStatus(item)"
                                >
                                    <option :value="null">-- Select Affiliate Status --</option>
                                    <option
                                            v-for="{id, name} in getAffiliateStatusList()"
                                            :value="id"
                                            :selected="id === item.value"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkAffiliateStatus(item)" for="label-affiliate-status">Affiliate status
                                </label>
                            </div>

                            <div class="condition-line">
                                <select
                                        :id="defineId(`affiliate-type`,item.position)"
                                        :ref="defineId(`affiliate-type`,item.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeAffiliateType($event, item)"
                                        v-show="checkAffiliateType(item)"
                                >
                                    <option :value="null">-- Select Affiliate Type --</option>
                                    <option
                                            v-for="{id, name} in getAffiliateTypesList()"
                                            :value="id"
                                            :selected="id === item.value"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkAffiliateType(item)" for="label-affiliate-type">Affiliate type
                                </label>
                            </div>


                            <div class="condition-line">
                                <select
                                        :id="defineId(`os`,item.position)"
                                        :ref="defineId(`os`,item.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeOS($event, item)"
                                        v-show="checkOS(item)"
                                >
                                    <option :value="null">-- Select OS --</option>
                                    <option
                                            v-for="{id, name} in getOSList()"
                                            :value="id"
                                            :selected="id === item.value"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkOS(item)" for="label-os">OS
                                </label>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getProdsModify(item)"
                                        @input="handleChangeProd($event, item)"
                                        :id="defineId(`prod`,item.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(item)
                                        v-show="checkProd(item)"
                                >
                                </model-select>
                                <label v-show="checkProd(item)" for="label-prod">Prods ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`matchtype`,item.position)"
                                        :ref="defineId(`matchtype`,item.position)"
                                        @change="handleMatchType($event, item)"
                                        v-show="item.dimensionName === 'affiliate_sub_campaign'"
                                >
                                    <!-- <option :value="null">-- Match type --</option> -->
                                    <option
                                            v-for="{id, name} in getMatchList()"
                                            :value="id"
                                            :selected="id === item.matchTypeId"
                                            :key="id"
                                    >{{name}}

                                    </option>

                                </select>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getCountriesModify(item)"
                                        @input="handleChangeCountry($event, item)"
                                        :id="defineId(`country`,item.position)"
                                        :ref="defineId(`country`,item.position)"
                                        class="condition__country condition__matches custom-select "
                                        :class="getClassDisabled(item)"
                                        :value="item.value.substr(item.value.indexOf('/')+1)"
                                        v-show="checkCountry(item)"
                                >
                                </model-select>
                                <label v-show="checkCountry(item)" for="label-country">Country</label>

                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getAdvertisersModify(item)"
                                        @input="handleChangeAdvertisers($event, item)"
                                        :id="defineId(`advertisers`,item.position)"
                                        :ref="defineId(`advertisers`,item.position)"
                                        class="condition__country condition__matches custom-select "
                                        :value="getValue(item)"
                                        v-show="checkAdvertisers(item)"
                                >
                                </model-select>
                                <label v-show="checkAdvertisers(item)" for="label-advertisers">Advertisers</label>

                            </div>

                            <div class="condition-line">
                                <select
                                        :ref="defineId(`campaign`,item.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeCampaign($event, item)"
                                        v-show="checkCampaign(item)"
                                >
                                    <option :value="null">-- Select Campaign --</option>
                                    <option
                                            v-for="{id, name} in getAffiliateCampaigns(item)"
                                            :value="id"
                                            :selected="id === item.value || id === Number(item.value.substr(item.value.indexOf('/')+1))"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkCampaign(item)" for="label-campaign">Campaign
                                </label>
                            </div>

                            <div class="condition-line">
                                <input type="text"
                                       :id="defineId(`subcampaign`,item.position)"
                                       :ref="defineId(`subcampaign`,item.position)"
                                       placeholder="Sub Campaign Name"
                                       class="condition__matches custom-input"
                                       :value="(item.dimensionName === 'affiliate_sub_campaign') && item.value.substr(item.value.indexOf('/')+1, 40) || ''"
                                       v-show="checkSubCampaign(item)"
                                       @change="handleChangeSubCampaign($event, item)"
                                >
                                <label v-show="checkSubCampaign(item)"
                                       for="label-sub-campaign">Sub Campaign</label>
                            </div>

                            <div class="condition-line">

                                <input type="text"
                                       :id="defineId(`website`,item.position)"
                                       :ref="defineId(`website`,item.position)"
                                       placeholder="Website"
                                       class="condition__matches custom-input"
                                       :value="(item.dimensionName === 'website') && item.value||''"
                                       v-show="checkWebsite(item)"
                                       @change="handleChangeWebsite($event, item)"
                                >

                                <!--                                <model-select-->
                                <!--                                        :options="getWebsitesModify()"-->
                                <!--                                        @input="handleChangeWebsite($event, item)"-->
                                <!--                                        :id="defineId(`website`,item.position)"-->
                                <!--                                        :ref="defineId(`website`,item.position)"-->
                                <!--                                        class="condition__country condition__matches custom-select "-->
                                <!--                                        v-show="checkWebsite(item)"-->
                                <!--                                        :value="item.value"-->

                                <!--                                >-->
                                <!--                                </model-select>-->
                                <label v-show="checkWebsite(item)" for="label-website">Website</label>


                            </div>

                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          @click="removeCondition(item.position, indexFilters)"
                                          class="remove_condition"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete Rule'"
                                  >
                                    <i class="far fa-trash" data-fa-transform="shrink-1"></i>
                                  </button>
                            </div>

                            <div class="condition-button-or">
                                <button
                                        @click="addCondition(item.segmentRuleIndex)"
                                        class="add-condition"
                                        v-b-tooltip.hover.top="'Add OR condition'"
                                        v-show="item.orAndDisabled"
                                >
                                    OR
                                </button>
                            </div>

                            <div class="condition-button-and">
                                <button
                                        @click="addFilter(item)"
                                        class="add-condition"
                                        v-b-tooltip.hover.top="'Add AND condition'"
                                        v-show="item.orAndDisabled"
                                >
                                    AND
                              </button>
                            </div>

                            <div v-show="!item.orAndDisabled" class="_or"><span>or</span></div>

                        </span>
                    </template>
                </template>
            </div>
        </section>
    </transition>
</template>

<script>
    import {mapMutations, mapState, mapGetters} from 'vuex'
    import {reFormatJSON} from '../../helpers'
    import {ModelSelect} from 'vue-search-select'

    export default {
        name: "condition-filter",
        props: ["filter", "indexFilters"],
        async mounted() {
            let self = this
            let affEl = document.querySelector(`#aff-${this.indexFilters}`)
            if (affEl) {
                document.querySelector(`#aff-${this.indexFilters}`).addEventListener('keyup', (e) => {
                    let affValue = document.querySelector(`#aff-${self.indexFilters}`).value
                    if (affValue.length >= 3) {

                        console.log('affValue:', affValue)
                        let obj = {}
                        obj.filter = affValue
                        this.$store.dispatch('affiliates/saveAffiliatesStore', obj)
                    }

                })
            }

        },
        methods: {
            getAdvertisersModify(item) {
                return this.getAdvertisers.map(item => {
                    item.value = item.id.toString()
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
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
                return this.getAffiliates.map(item => {
                    item.value = item.id.toString()
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })

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
            getAffiliateStatusList() {
                return [
                    {id: "0", name: 'Active'},
                    {id: "1", name: 'Blacklisted'},
                    {id: "2", name: 'Deleted'},
                    {id: "3", name: 'Inactive'},
                    {id: "4", name: 'Pending'},
                    {id: "5", name: 'Rejected'},
                    {id: "6", name: 'Suspended'},
                    {id: "7", name: 'Blocked'},
                    {id: "8", name: 'UnderReview'},
                ]
            },
            getAffiliateTypesList() {
                return [
                    {id: "0", name: 'Publisher'},
                    {id: "1", name: 'Internal'},
                    {id: "2", name: 'Marketer'},
                    {id: "3", name: 'MediaBuy'},
                    {id: "4", name: 'Network'},
                    {id: "5", name: 'TraineeAE'},
                    {id: "6", name: 'TraineeAssistant'}

                ]
            },
            getOSList() {
                return [
                    {id: "0", name: 'Android'},
                    {id: "1", name: 'Ios'},
                    {id: "2", name: 'Linux'},
                    {id: "3", name: 'Mac'},
                    {id: "4", name: 'Windows'},
                    {id: "5", name: 'WindowsMobile'}

                ]
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
            checkAffiliateStatus(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_status`)
            },
            checkAffiliateType(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_type`)
            },
            checkOS(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `os`)
            },
            checkProd(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `prod`)
            },
            checkCountry(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `country`)
                    || item.dimensionId === this.getDimensionId(this.getDimensions, `affiliate_country`)
            },
            checkAdvertisers(item) {
                return item.dimensionId === this.getDimensionId(this.getDimensions, `advertisers`)
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
                let affiliateStatusRef = `affiliate-status-${item.position}`
                let affiliateTypeRef = `affiliate-type-${item.position}`
                let osRef = `os-${item.position}`
                let advertisersRef = `advertisers-${item.position}`

                let countryEl = document.querySelector(`#${refCountry}`).parentNode || null
                let campaignEl = this.$refs[refCampaign][0] || null
                let subCampaignEl = this.$refs[refSubCampaign][0] || null
                let matchTypeEl = this.$refs[matchTypeRef][0] || null
                let affiliateEl = document.querySelector(`#${refAffiliate}`).parentNode || null
                let prodEl = document.querySelector(`#${refProd}`).parentNode || null

                let websiteEl = document.querySelector(`#${websiteRef}`).parentNode || null
                let affiliateStatusEl = document.querySelector(`#${affiliateStatusRef}`).parentNode || null
                let affiliateTypeEl = document.querySelector(`#${affiliateTypeRef}`).parentNode || null
                let osEl = document.querySelector(`#${osRef}`).parentNode || null
                let advertisersEl = document.querySelector(`#${advertisersRef}`).parentNode || null

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
                    case `affiliate_status`:
                        affiliateStatusEl ? affiliateStatusEl.style.display = 'block' : ''
                        websiteEl ? websiteEl.style.display = 'none' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 7
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate-status]`)
                        )
                        break
                    case `affiliate_type`:
                        affiliateTypeEl ? affiliateTypeEl.style.display = 'block' : ''
                        affiliateStatusEl ? affiliateStatusEl.style.display = 'none' : ''
                        websiteEl ? websiteEl.style.display = 'none' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 8
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate-type]`)
                        )
                        break
                    case `os`:
                        osEl ? osEl.style.display = 'block' : ''
                        affiliateTypeEl ? affiliateTypeEl.style.display = 'none' : ''
                        affiliateStatusEl ? affiliateStatusEl.style.display = 'none' : ''
                        websiteEl ? websiteEl.style.display = 'none' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 9
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-os]`)
                        )
                        break
                    case `advertisers`:
                        advertisersEl ? advertisersEl.style.display = 'block' : ''
                        prodEl ? prodEl.style.display = 'none' : ''
                        affiliateEl ? affiliateEl.style.display = 'none' : ''
                        campaignEl ? campaignEl.style.display = 'none' : ''
                        countryEl ? countryEl.style.display = 'none' : ''
                        // countryEl.style.display = 'block'
                        // countryEl.disabled = true
                        // countryEl.classList.remove("disabled")
                        item.value = ''
                        item.dimensionId = 10
                        subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                        matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                        this.hideLabels(
                            conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign], label[for=label-country]`)
                        )
                        this.showLabels(
                            conditionEl.querySelectorAll(`label[for=label-advertisers]`)
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
            async handleDimAffCampaign(event, item, self) {

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
                await this.$store.dispatch('campaigns/getCampaignsByAffIdStore', event)
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
            handleChangeAdvertisers(event, item) {

                let dimensionRef = `dimension-${item.position}`
                let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let refCondition = `condition-${item.position}`
                let refAdvertisers = `advertisers-${item.position}`
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

                    this.$refs[refAdvertisers][0].value = ``
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
                item.dimensionName = `advertisers`
                item.dimensionId = this.getDimensionId(this.getDimensions, `advertisers`)
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
            handleChangeAffiliateStatus(event, item) {
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
                item.dimensionName = `affiliate_status`
                item.dimensionId = this.getDimensionId(this.getDimensions, `affiliate_status`)

            },
            handleChangeAffiliateType(event, item) {
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
                item.dimensionName = `affiliate_type`
                item.dimensionId = this.getDimensionId(this.getDimensions, `affiliate_type`)

            },
            handleChangeOS(event, item) {
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
                item.dimensionName = `os`
                item.dimensionId = this.getDimensionId(this.getDimensions, `os`)

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
            ...mapMutations("segment", [
                "addCondition",
                "addFilter",
                "deleteFilter",
                "removeCondition"
            ])
        },
        watch: {
            segmentFilter: (newVal, oldVal) => {
                // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            }
        },
        updated() {
            let filterId = 0
            if (this.$el.id) {
                filterId = Number(this.$el.id.match(/(\d+)/)[0])
            }
            if (!this.$store) return
            let segmentFilter = this.$store.state.segment.segmentFilter
            if (segmentFilter.length > 0) {
                let newCondition = segmentFilter.filter(item => (item.dimensionId === 0 && item.segmentRuleIndex === filterId))
                if (newCondition.length > 0) {
                    let newConditionGroup = segmentFilter.filter(item => (item.segmentRuleIndex === newCondition[0].segmentRuleIndex))
                    let newConditionGroupCondition = newConditionGroup.filter(item => (item.dimensionId !== 0 && item.segmentRuleIndex === filterId))
                    newConditionGroupCondition = newConditionGroupCondition[0]
                    // console.log(' !!!!! newConditionGroupCondition:')
                    // console.table(JSON.parse(JSON.stringify(newConditionGroupCondition)))

                    if (newConditionGroupCondition) {
                        newCondition.forEach(item => {
                            let dimensionRef = `dimension-${item.position}`
                            if (this.$refs[dimensionRef]) {
                                this.$refs[dimensionRef][0].value = newConditionGroupCondition.dimensionId
                                this.$refs[dimensionRef][0].disabled = true

                                this.changeDimension(newConditionGroupCondition.dimensionName, item)
                            }
                            // if (document.querySelector(`#dimension-${item.position}`)) {
                            // document.querySelector(`#dimension-${item.position}`).value = newConditionGroup1.dimensionName
                            // document.querySelector(`#dimension-${item.position}`).disabled = true
                            // }
                        })
                    }
                    let affEl = document.querySelector(`#aff-${newCondition[0].position}`)
                    if (affEl)
                        document.querySelector(`#aff-${newCondition[0].position}`).addEventListener('keyup', (e) => {
                            let affValue = document.querySelector(`#aff-${newCondition[0].position}`).value
                            if (affValue.length >= 3) {

                                console.log(' OR affSearchValue:', affValue)
                                let obj = {}
                                obj.filter = affValue
                                this.$store.dispatch('affiliates/saveAffiliatesStore', obj)
                            }

                        })
                }
            }
        },
        components: {ModelSelect},
        computed: {
            ...mapState('dimensions', ['dimensionTypes']),
            ...mapState('affiliates', ['affiliates']),
            ...mapState('user', ["googleAuthUrl", "verifyTokenEmail"]),
            ...mapState('segment', ['segmentFilter']),
            ...mapState('campaigns', ['campaignsExample']),
            ...mapGetters('countries', ['getCountries']),
            // ...mapGetters('affiliateWebsites', ['getAffiliateWebsites']),
            ...mapGetters('affiliates', ['getAffiliates']),
            ...mapGetters('advertisers', ['getAdvertisers']),
            ...mapGetters('prods', ['getProds']),
            ...mapGetters('dimensions', ['getDimensions']),
            ...mapGetters('campaigns', ['getAffiliateCampaigns']),

        }
    }
</script>

<style lang="scss">
    .virtual-list-height > div {
        height: 100%;
    }

    button--fill {
        width: 100px;
        height: 40px;
        color: #999999;
        position: relative;
        margin-left: 0.5rem;
        transition: all 0.5s;
        border: 0px;
        background: white;

        &:before,
        &:after {
            top: -1px;
            left: -1px;
            content: "";
            width: inherit;
            height: inherit;
            display: block;
            position: absolute;
            transform: scale(0);
            transition: all 0.15s;
            border-radius: inherit;
            background: rgba(128, 128, 128, 0.1);
        }

        &:hover:not(:disabled):before,
        &:focus:before {
            transform: scale(1);
        }

        &:active:after {
            transform: scale(1);
            transition: all 0.25s;
            background: rgba(128, 128, 128, 0.3);
        }

        &:focus,
        &:hover {
            color: #999999;
        }

        &:focus {
            outline: none;
        }
    }

    .condition-group {
        .and {
            color: #999;
            display: flex;
            text-align: left;
            padding: 1rem 0;
            align-items: center;

            &:after {
                content: "";
                height: 1px;
                width: 100%;
                margin-left: 0.5rem;
                background: currentcolor;
                display: inline-block;
            }
        }
    }

    .filter {
        border: none;
        margin-top: 0rem;
        padding: 0rem;
        min-width: 920px;
        border-radius: 10px;
        // overflow: hidden;
    }

    .filter__remove {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        color: #ACC3CF;
        background: none;
        font-size: 1.2rem;
        position: relative;
        top: 68px;
        left: -50px;
        transition: all 0.2s;

        &:before,
        &:after {
            top: 0;
            left: 0;
            content: "";
            display: block;
            width: inherit;
            height: inherit;
            border-radius: 50%;
            position: absolute;
            transform: scale(0);
            transition: all 0.15s;
        }

        &:hover:before,
        &:focus:before {
            transform: scale(1);
            background: rgba(255, 255, 255, 0.1);
        }

        &:active:after {
            transform: scale(1);
            transition: all 0.25s;
            background: rgba(128, 128, 128, 0.3);
        }

        &:focus,
        &:hover {
            color: #fe5d65;
        }

        &:focus {
            outline: none;
        }
    }

    .country_code {
        font-weight: bold
    }

    .filter__controls {
        display: grid;
        // margin-bottom: 2rem;
        justify-content: space-between;
    }

    .ui.search.dropdown {
        min-width: 250px;
        max-width: 250px;
    }

    .ui.search.selection.dropdown > input.search, .ui.search.selection.dropdown > span.sizer {
        line-height: 1.21428571em;
        padding: .5em 2.1em .5em 1em;
    }

    .ui.dropdown > .dropdown.icon:before {
        content: '' !important;
    }

    select.add-condition.custom-select {
        color: #7F98A5;
        font-weight: 600;
        border: 2px solid #7F98A5;
        //background-color: rgba(255, 255, 255, 0.1);
        background-color: #E3EEF4;
    }

    .select-selected {
        background-color: DodgerBlue;
    }

    /* Style the arrow inside the select element: */
    .select-selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
    }

    /* Point the arrow upwards when the select box is open (active): */
    .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
    }

    /* style the items (options), including the selected item: */
    .select-items div, .select-selected {
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 50px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
    }

    /* Style items (options): */
    .select-items {
        position: absolute;
        background-color: DodgerBlue;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }

    /* Hide the items when the select box is closed: */
    .select-hide {
        display: none;
    }

    .select-items div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
    }

    /* Or - And Conditions */
    ._or {
        display: block
    }

    ._or span {
        color: #7F98A5;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding-right: 10px;
        text-transform: uppercase;
    }

    ._and {
        border-bottom: 2px solid #DFE0EB;
        line-height: 0;
        margin: 15px 0;
        display: block;
        position: relative;
        top: 50px;
        left: -35px;
    }

    ._and span {
        background-color: #F7F8FC;
        color: #ACC3CF;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
        padding-right: 10px;
        text-transform: uppercase;
    }
</style>
