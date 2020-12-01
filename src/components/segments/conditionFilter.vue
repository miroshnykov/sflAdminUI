<template>
    <transition name="expand-down">
        <section :id="defineFilterId(indexFilters)" :ref="defineFilterId(indexFilters)" class="filter">
            <p class="filter__title">Rule: <b>{{indexFilters+1}}</b></p>
            <div class="filter__controls">
                <div class="error" style="display:none">Error validation message</div>
                <div v-show="Number(indexFilters) !== 0" class="_and"><span>and</span></div>

                <button
                        class="filter__remove"
                        type="button"
                        v-b-tooltip.hover.top="'Delete Condition'"
                        @click="deleteFilter(indexFilters)"
                >
                    <i class="fad fa-trash"></i>
                </button>

                <template v-for="item in this.segmentFilter">
                    <template v-if="item.segmentRuleIndex === indexFilters">
                        <span
                                :id="defineConditionId(item.position)"
                                :ref="defineConditionId(item.position)"
                                class="condition__controls" :class="getEditingClass(item)"
                        >
                            <div class="condition-line">
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineFilterType(item.position)"
                                        :ref="defineFilterType(item.position)"
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
                                          :id="defineDimensionId(item.position)"
                                          :ref="defineDimensionId(item.position)"
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
                                  <label v-show="defineDimensionId(item)" for="label-dimension">Dimension Filter
                                  </label>
                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getAffiliatesModify()"
                                        @input="handleChangeAff($event, item)"
                                        :id="defineAffId(item.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getAffiliateName(item)
                                        v-show="checkAff(item)"
                                >
                                </model-select>
                                <label v-show="checkAff(item)" for="label-affiliate">Affiliate ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getProdsModify()"
                                        @input="handleChangeProd($event, item)"
                                        :id="defineId(`prod`,item.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getAffiliateName(item)
                                        v-show="checkProd(item)"
                                >
                                </model-select>
                                <label v-show="checkProd(item)" for="label-prod">Prods ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineMatchType(item.position)"
                                        :ref="defineMatchType(item.position)"
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
                                        :options="getCountriesModify()"
                                        @input="handleChangeCountry($event, item)"
                                        :id="defineCountryId(item.position)"
                                        :ref="defineCountryId(item.position)"
                                        class="condition__country condition__matches custom-select "
                                        :class="getClassDisabled(item)"
                                        :value="item.value.substr(item.value.indexOf('/')+1)"
                                        v-show="checkCountry(item)"
                                >
                                </model-select>
                                <label v-show="checkCountry(item)" for="label-country">Country</label>

                            </div>


                            <div class="condition-line">
                                <select
                                        :ref="defineCampaignId(item.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeCampaign($event, item)"
                                        v-show="checkCampaign(item)"
                                >
                                    <option :value="null">-- Select Campaign --</option>
                                </select>
                                <label v-show="checkCampaign(item)" for="label-campaign">Campaign
                                </label>
                            </div>

                            <div class="condition-line">
                                <input type="text"
                                       :id="defineSubCampaignId(item.position)"
                                       :ref="defineSubCampaignId(item.position)"
                                       placeholder="Sub Campaign Name"
                                       class="condition__matches custom-input"
                                       :value="(item.dimensionName === 'affiliate_sub_campaign') && item.value.substr(item.value.indexOf('/')+1, 40) || ''"
                                       v-show="checkSubCampaign(item)"
                                       @change="handleChangeSubCampaign($event, item)"
                                >
                                <label v-show="checkSubCampaign(item)"
                                       for="label-sub-campaign">Sub Campaign</label>
                            </div>

                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          @click="removeCondition(item.position, indexFilters)"
                                          class="remove_condition"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete Rule'"
                                  >
                                    <i class="fas fa-times"></i>
                                  </button>
                            </div>

                            <div class="condition-button-or">
                                <button
                                        @click="addCondition(item.segmentRuleIndex)"
                                        class="add-condition"
                                        v-b-tooltip.hover.top="'Add OR condition'"
                                        v-show="item.orAndDisabled"
                                >
                                    <i class="fas fa-plus" data-fa-transform="shrink-2"></i> OR
                                </button>
                            </div>

                            <div class="condition-button-and">
                                <button
                                        @click="addFilter(item)"
                                        class="add-condition"
                                        v-b-tooltip.hover.top="'Add AND condition'"
                                        v-show="item.orAndDisabled"
                                >
                                <i class="fas fa-plus" data-fa-transform="shrink-2"></i> AND
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
        methods: {
            getCountriesModify() {
                return this.getCountries.map(item => {
                    item.value = item.code
                    item.text = item.name + ' (' + item.code + ') '
                    return item
                })
            },
            getAffiliatesModify() {
                return this.getAffiliates.map(item => {
                    item.value = item.id.toString()
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            getProdsModify() {
                return this.getProds.map(item => {
                    item.value = item.id.toString()
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            getClassDisabled(item) {
                if (this.checkCountryDisabled(item)) {
                    return 'disabled'
                }
            },
            getAffiliateName(item) {
                return item.value.substr(0, item.value.indexOf('/')) || item.value
            },
            getEditingClass(item) {
                // console.log(' >>>  getEditingClass item:')
                // console.table(reFormatJSON(item))
                if (item.value.substr(item.value.indexOf('/') + 1, item.value.length - 1) === ''
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
            defineFilterId(id) {
                return `filter-${id}`
            },
            defineConditionId(id) {
                return `condition-${id}`
            },
            defineCountryId(id) {
                return `country-${id}`
            },
            defineCampaignId(id) {
                return `campaign-${id}`
            },
            defineAffId(id) {
                return `aff-${id}`
            },
            defineId(name,id) {
                return `${name}-${id}`
            },
            defineDimensionId(id) {
                return `dimension-${id}`
            },
            defineSubCampaignId(id) {
                return `subcampaign-${id}`
            },
            defineFilterType(id) {
                return `filtertype-${id}`
            },
            defineMatchType(id) {
                return `matchtype-${id}`
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

                let countryEl = document.querySelector(`#${refCountry}`).parentNode || null
                let campaignEl = this.$refs[refCampaign][0] || null
                let subCampaignEl = this.$refs[refSubCampaign][0] || null
                let matchTypeEl = this.$refs[matchTypeRef][0] || null
                let affiliateEl = document.querySelector(`#${refAffiliate}`).parentNode || null
                let prodEl = document.querySelector(`#${refProd}`).parentNode || null

                countryEl.classList.add("disabled")
                let conditionEl = document.querySelector(`#${refCondition}`)
                switch (value) {
                    case `affiliate`:
                        affiliateEl ? affiliateEl.style.display = 'block' : ''
                        countryEl.style.display = 'none'
                        prodEl ? prodEl.style.display = 'none':''
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
                        prodEl ? prodEl.style.display = 'none':''
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
                    // case `affiliate_campaign`:
                    //     affiliateEl ? affiliateEl.style.display = 'block' : ''
                    //     countryEl.style.display = 'none'
                    //     campaignEl ? campaignEl.style.display = 'initial' : ''
                    //     subCampaignEl ? subCampaignEl.style.display = 'none' : ''
                    //     matchTypeEl ? matchTypeEl.style.display = 'none' : ''
                    //     item.value = ''
                    //     item.dimensionId = 3
                    //     this.hideLabels(
                    //         conditionEl.querySelectorAll(`label[for=label-country], label[for=label-sub-campaign]`)
                    //     )
                    //     this.showLabels(
                    //         conditionEl.querySelectorAll(`label[for=label-affiliate], label[for=label-campaign]`)
                    //     )
                    //     break
                    case `affiliate_country`:
                        affiliateEl ? affiliateEl.style.display = 'block' : ''
                        countryEl.style.display = 'block'
                        prodEl ? prodEl.style.display = 'none':''
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

                let itemValue = event + '/' + affCountry[0].countryCode || ''

                let recCheck = self.validateValue(self.segmentFilter, itemValue)
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
                debugger
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
                }
            }
        },
        components: {ModelSelect},
        computed: {
            ...mapState('dimensions', ['dimensionTypes']),
            ...mapState('affiliates', ['affiliates']),
            ...mapState('user', ["googleAuthUrl","verifyTokenEmail"]),
            ...mapState('segment', ['segmentFilter']),
            ...mapState('campaigns', ['campaignsExample']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('affiliates', ['getAffiliates']),
            ...mapGetters('prods', ['getProds']),
            ...mapGetters('dimensions', ['getDimensions']),
            ...mapGetters('campaigns', ['getCampaignsAffiliateStoreById']),

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

    .filter__title {
        left: 50%;
        margin: 0px 5px;
        position: relative;
        // color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 500;
        transform: translate(-50%, 0);
        text-align: left;
    }

    .filter__remove {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        color: #e3eef4;
        background: none;
        font-size: 1.2rem;
        position: relative;
        top: 10px;
        left: 1080px;
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

    .condition__controls {
        flex-grow: 1;
        text-align: left;
        margin-left: 1rem;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        min-width: 990px;
    }

    .condition__controls:last-child {
        border: 0;
        margin-top: 0rem;
        margin-bottom: 1rem;
        padding-bottom: 0rem;
    }

    .filter__controls {
        display: grid;
        // margin-bottom: 2rem;
        justify-content: space-between;
    }

    .condition__matches {
        text-align: right;
        margin-right: 1px;
    }

    /* The container must be positioned relative: */
    .custom-select {
        text-align: left;
        position: relative;
        width: auto;
        min-width: 50px;
        max-width: 280px;
        border-radius: 4px;
        color: #555;
        border: 1px solid transparent;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url("data:image/svg+xml;utf8,<svg fill='grey' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") #fff;
        background-repeat: no-repeat;
        background-position-x: 99%;
        background-position-y: 7px;
    }

    .custom-select:hover, .custom-select:focus,
    .custom-input:hover, .custom-input:focus,
    .ui.search.selection.dropdown > input.search:hover, .ui.search.selection.dropdown > input.search:focus {
        border-color: #36B8E1 !important;
        box-shadow: 0 0 5px #36B8E1 !important;
        cursor: pointer !important;
    }

    .custom-select:disabled:hover {
        border-color: transparent;
        box-shadow: 0 0 5px transparent;
    }

    .ui.search.dropdown > .text {
        top: -1px;
        padding-right: 10px;
    }

    .ui.search.dropdown {
        min-width: 160px;
        max-width: 280px;
    }

    .ui.search.selection.dropdown > input.search, .ui.search.selection.dropdown > span.sizer {
        line-height: 1.21428571em;
        padding: .5em 2.1em .5em 1em;
    }

    .ui.dropdown > .dropdown.icon:before {
        content: '' !important;
    }

    .custom-select:before {
        content: '\f11c';
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 16px;
        color: lightgrey;
        float: right;
        margin-top: -2px;
        margin-right: -20px;
    }

    .custom-input {
        position: relative;
        width: auto;
        color: #555;
        max-width: 280px;
        border-radius: 4px;
        padding: 5px 10px;
        height: calc(1.5em + 0.75rem + 2px);
        text-align: left;
        border: 0;
    }

    .custom-input::placeholder {
        color: #ACC3CF;
    }

    select.add-condition.custom-select {
        color: #7F98A5;
        font-weight: 600;
        border: 2px solid #7F98A5;
        //background-color: rgba(255, 255, 255, 0.1);
        background-color: #E3EEF4;
    }

    .custom-select select {
        display: none; /*hide original SELECT element: */
    }

    .select-selected {
        background-color: DodgerBlue;
    }

    .custom-select:disabled {
        color: #6c757d;
        background-color: #e9ecef;
        opacity: 0.5;
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
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        padding-right: 8px;
        text-transform: uppercase;
    }

    ._and {
        /*border-bottom: 2px solid #9194aa;*/
        /*line-height: 0;*/
        /*margin: 10px 0;*/
        display: block;
        position: relative;
        top: 40px;
        left: 14px;
    }

    ._and span {
        /*background-color: #656a89;*/
        // color: #9194aa;
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        padding-right: 8px;
        text-transform: uppercase;
    }
</style>
