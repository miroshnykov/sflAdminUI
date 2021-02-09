<template>
    <!--    <div  v-if="visible" class="modal-container">-->
    <!--  Modal content goes here -->
    <!--        <slot></slot>-->
    <div v-if="visible" class="modal-mask modal-transition">
        <div class="modal-container">

            <div class="modal-body">
                <h1>condition edit</h1>

                <p class="text-left">
                    <label>Segment {{JSON.stringify(segmentItem)}} </label>
                </p>

                <span
                        :id="defineId(`condition`,segmentItem.position)"
                        :ref="defineId(`condition`,segmentItem.position)"
                        class="condition__controls" :class="getEditingClass(segmentItem)"
                >
                            <div class="condition-line">
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`filtertype`,segmentItem.position)"
                                        :ref="defineId(`filtertype`,segmentItem.position)"
                                        @change="handleFilterType($event, segmentItem)"
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
                                          :id="defineId(`dimension`,segmentItem.position)"
                                          :ref="defineId(`dimension`,segmentItem.position)"
                                          class="condition__dimension-name condition__matches custom-select"
                                          @change="handleChangeDimension($event, segmentItem)"
                                          :disabled="segmentItem.disabled"
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
                                        :options="getAffiliatesModify(segmentItem)"
                                        @input="handleChangeAff($event,segmentItem )"
                                        :id="defineId(`aff`,segmentItem.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(segmentItem)
                                        v-show="checkAff(segmentItem)"
                                >
                                </model-select>
                                <label v-show="checkAff(segmentItem)" for="label-affiliate">Affiliate ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <model-select
                                        :options="getProdsModify(segmentItem)"
                                        @input="handleChangeProd($event, segmentItem)"
                                        :id="defineId(`prod`,segmentItem.position)"
                                        class="condition__affiliate condition__matches custom-select"
                                        :value=getValue(segmentItem)
                                        v-show="checkProd(segmentItem)"
                                >
                                </model-select>
                                <label v-show="checkProd(segmentItem)" for="label-prod">Prods ID &amp; Name
                                </label>

                            </div>

                            <div class="condition-line">

                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        :id="defineId(`matchtype`,segmentItem.position)"
                                        :ref="defineId(`matchtype`,segmentItem.position)"
                                        @change="handleMatchType($event, segmentItem)"
                                        v-show="segmentItem.dimensionName === 'affiliate_sub_campaign'"
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
                                        :options="getCountriesModify(segmentItem)"
                                        @input="handleChangeCountry($event, segmentItem)"
                                        :id="defineId(`country`,segmentItem.position)"
                                        :ref="defineId(`country`,segmentItem.position)"
                                        class="condition__country condition__matches custom-select "
                                        :class="getClassDisabled(segmentItem)"
                                        :value="segmentItem.value.substr(segmentItem.value.indexOf('/')+1)"
                                        v-show="checkCountry(segmentItem)"
                                >
                                </model-select>
                                <label v-show="checkCountry(segmentItem)" for="label-country">Country</label>

                            </div>


                            <div class="condition-line">
                                <select
                                        :ref="defineId(`campaign`,segmentItem.position)"
                                        class="condition__campaign condition__matches custom-select"
                                        @change="handleChangeCampaign($event, segmentItem)"
                                        v-show="checkCampaign(segmentItem)"
                                >
                                    <option :value="null">-- Select Campaign --</option>
                                    <option
                                            v-for="{id, name} in getAffiliateCampaigns(segmentItem)"
                                            :value="id"
                                            :selected="id === segmentItem.value || id === Number(segmentItem.value.substr(segmentItem.value.indexOf('/')+1))"
                                            :key="id"
                                    >{{name}}</option>
                                </select>
                                <label v-show="checkCampaign(segmentItem)" for="label-campaign">Campaign
                                </label>
                            </div>

                            <div class="condition-line">
                                <input type="text"
                                       :id="defineId(`subcampaign`,segmentItem.position)"
                                       :ref="defineId(`subcampaign`,segmentItem.position)"
                                       placeholder="Sub Campaign Name"
                                       class="condition__matches custom-input"
                                       :value="(segmentItem.dimensionName === 'affiliate_sub_campaign') && segmentItem.value.substr(segmentItem.value.indexOf('/')+1, 40) || ''"
                                       v-show="checkSubCampaign(segmentItem)"
                                       @change="handleChangeSubCampaign($event, segmentItem)"
                                >
                                <label v-show="checkSubCampaign(segmentItem)"
                                       for="label-sub-campaign">Sub Campaign</label>
                            </div>

                            <div class="condition-line">

                                <input type="text"
                                       :id="defineId(`website`,segmentItem.position)"
                                       :ref="defineId(`website`,segmentItem.position)"
                                       placeholder="Website"
                                       class="condition__matches custom-input"
                                       :value="(segmentItem.dimensionName === 'website') && segmentItem.value||''"
                                       v-show="checkWebsite(segmentItem)"
                                       @change="handleChangeWebsite($event, segmentItem)"
                                >

                                <!--                                <model-select-->
                                <!--                                        :options="getWebsitesModify()"-->
                                <!--                                        @input="handleChangeWebsite($event, segmentItem)"-->
                                <!--                                        :id="defineId(`website`,segmentItem.position)"-->
                                <!--                                        :ref="defineId(`website`,segmentItem.position)"-->
                                <!--                                        class="condition__country condition__matches custom-select "-->
                                <!--                                        v-show="checkWebsite(segmentItem)"-->
                                <!--                                        :value="segmentItem.value"-->

                                <!--                                >-->
                                <!--                                </model-select>-->
                                <label v-show="checkWebsite(segmentItem)" for="label-website">Website</label>


                            </div>

                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          @click="removeCondition(segmentItem.position)"
                                          class="remove_condition"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete Rule'"
                                  >
                                    <i class="far fa-trash" data-fa-transform="shrink-1"></i>
                                  </button>
                            </div>


                    <!--<b-button class="btn-save" @click="this.saveConditions">-->
                    <!--                <i class="fad fa-save"></i> Save Changes-->
                    <!--            </b-button>-->
                        </span>


            </div>

            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-left" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-right" @click="saveLp()">
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
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                visible: false,
                id: 0,
            }
        },
        props: ['segmentItem'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('segment', ['getSegmentFilter']),
            ...mapGetters('segments', ['getSegments']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('affiliates', ['getAffiliates']),
            ...mapGetters('prods', ['getProds']),
            ...mapGetters('dimensions', ['getDimensions']),
            ...mapGetters('campaigns', ['getAffiliateCampaigns']),
        },
        async mounted() {
            await this.$store.dispatch('dimensions/saveDimensionsStore')
            if (this.segmentItem.dimensionId === 1) {
                await this.$store.dispatch('affiliates/saveAffiliatesStore')
            }
            if (this.segmentItem.dimensionId === 2) {
                await this.$store.dispatch('countries/saveCountriesStore')
            }
            if (this.segmentItem.dimensionId === 3) {
                await this.$store.dispatch('affiliates/saveAffiliatesStore')
                await this.$store.dispatch('countries/saveCountriesStore')
            }
            if (this.segmentItem.dimensionId === 4) {
                await this.$store.dispatch('prods/saveProdsStore')
            }
            if (this.segmentItem.dimensionId === 5) {
                await this.$store.dispatch('affiliates/saveAffiliatesStore')
                await this.$store.dispatch('campaigns/saveCampaignsStore')
            }
            if (this.segmentItem.dimensionId === 6) {
                await this.$store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')
            }
            // await this.$store.dispatch('countries/saveCountriesStore')
            // await this.$store.dispatch('campaigns/saveCampaignsStore')
            // // await this.$store.dispatch('lp/saveLPStore')
            // await this.$store.dispatch('prods/saveProdsStore')
            // await this.$store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')
        },
        methods: {
            getRules(field) {
                return this.segmentItem[field]
            },
            getClassLp(id) {
                return `condition__country condition__matches custom-select lpInput-${id}`
            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            getSumWeight(lp, currentLpId) {
                let sum = 0
                lp.map(item => {
                    if (currentLpId !== item.lpId) {
                        // console.log('LpItem:', JSON.stringify(item))
                        sum = sum + item.weight
                    }
                })
                return sum
            },
            updateTotalWeight(event, segment) {
                let sumWeightEl = document.querySelector(`#sumWeight-${segment.id}`)

                let sum = this.getSumWeight(segment.lp, this.lpId)
                if (sumWeightEl) {
                    let sumValue = sum + Number(event.target.value)
                    sumWeightEl.value = sumValue
                    if (sumValue > 100) {

                        sumWeightEl.style.background = '#e42a33'
                    } else {
                        sumWeightEl.style.background = '#e3eef4'
                    }

                }
            },
            getLpModify() {
                debugger
                return this.getLandingPages.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            handleChangeLp(lpId, item) {
                this.lpId = lpId
                // let nameLp = this.getLandingPages.filter(i => {
                //     return i.value === lpId
                // })
                // document.querySelector(`#lp-label-${item.id}`).textContent = `Choose LP:` + lpId + nameLp[0].text
                // document.querySelector(`.lpInput-${item.id}`).style.background = 'white'
            },
            getAffiliatesModify() {
                return this.getAffiliates.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            show() {
                this.visible = true
            },
            saveLp(data) {

                this.visible = false
            },
            close() {
                this.visible = false
                this.id = 0

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


                // debugger
                if (item.dimensionId === 1) {
                    return this.getAffiliates.map(item => {
                        item.value = item.id.toString()
                        item.text = item.name + ' (' + item.id + ') '
                        return item
                    })
                }

                return
                // console.log(`Affiliates:${JSON.stringify(item)}`)
                // debugger
                console.log('ITEM dimensionId:', item.dimensionId)
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
                if (item.length === 0) return
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
                debugger
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

                debugger
                let affRef = `aff-${item.position}`
                let dimensionRef = `dimension-${item.position}`
                let filterTypeRef = `filtertype-${item.position}`
                let matchTypeRef = `matchtype-${item.position}`

                let recCheck = self.validateValue(this.getSegmentFilter, event)
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
                debugger
                // if (refCondition){
                //     self.$refs[refCondition][0].style.background = null
                // }


                item.user = this.verifyTokenEmail
                item.dateAdded = this.getCurrentDate()
                item.value = event.toString()
                item.filterTypeId = Number(self.$refs[filterTypeRef][0].value)
                item.matchTypeId = Number(self.$refs[matchTypeRef][0].value)
                item.dimensionName = `affiliate`
                item.dimensionId = self.getDimensionId(self.getDimensions, `affiliate`)

                let updateFieldData = {}
                updateFieldData.value = item.value
                updateFieldData.field = 'value'
                this.updateField(updateFieldData)
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
                let recCheck = self.validateValue(this.getSegmentFilter, event)
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
                let recCheck = self.validateValue(this.getSegmentFilter, event)
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
                debugger
                let dimensionRef = `dimension-${item.position}`

                // let dimensionName = this.getDimensionName(this.$refs[dimensionRef][0])
                let dimensionName = item.dimensionName
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

                let recCheck = this.validateValue(this.getSegmentFilter, event)
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
                        let recCheck = this.validateValue(this.getSegmentFilter, event)
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

                let recCheck = this.validateValue(this.getSegmentFilter, event.target.value)

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

                let recCheck = this.validateValue(this.getSegmentFilter, event.target.value)

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
                let recCheck = this.validateValue(this.getSegmentFilter, itemValue)

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
        }
    }
</script>


<style lang="sass">
    .modal-mask
        position: fixed
        z-index: 9998
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, .7)
        transition: opacity .3s ease
        display: flex
        align-items: center
        justify-content: center
        -webkit-app-region: no-drag
        -webkit-user-drag: none


        .modal-container
            min-width: 50vw
            max-width: 50vw
            max-height: 80vh
            padding: 30px 30px 0px 30px
            background: #fff
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
            transition: all .3s ease
            overflow: auto
            border-radius: 10px


        .modal-body
            margin: 20px 0


        .modal-enter,
        .modal-leave
            opacity: 0


        .modal-enter .modal-container,
        .modal-leave .modal-container
            transform: scale(1.1)


</style>
