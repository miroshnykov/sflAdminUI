<template>
    <div v-if="visible" class="modal-mask modal-transition">

        <div class="modal-container">


            <h1>Custom LPs per GEO</h1>
            <table class="table table-striped child-row tableFixHead lp-table">
                <thead>
                <tr scope="row">
                    <th scope="col">GEO</th>
                    <th scope="col">Landing Page</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tr scope="row" :id="defineId(`customLpRowId`,rules.pos)" v-for="rules in getCustomLPRules_()">
                    <td>
                        <span class="hidden">{{ JSON.stringify(rules) }}</span>
                        <div class="condition-line1">
                            <model-select
                                    :options="getCountriesModify()"
                                    :id="defineId(`customCountry`,rules.pos)"
                                    :value="rules.country"
                                    @input="updateCustomLPAction($event, `country`, rules.pos)"
                                    class="condition__country condition__matches custom-select "
                            >
                            </model-select>


                        </div>

                    </td>
                    <td>
                        <div class="condition-line1">
                            <model-select
                                    :options="getLpModify()"
                                    :id="defineId(`customLPs`,rules.pos)"
                                    placeholder="Search landing page..."
                                    @input="updateCustomLPAction($event, `id`, rules.pos)"
                                    :value="rules.id"
                            >
                            </model-select>


                        </div>

                    </td>
                    <td>
                        <b-button variant="light" @click="delCustomLpAction(rules.pos)"
                                  v-b-tooltip.hover.top="'Delete Custom LPs'"
                                  style="z-index:2">
                            <i class="far fa-trash" data-fa-transform="shrink-1"></i>
                        </b-button>

                    </td>
                </tr>

                <tr scope="row">
                    <td>
                        <b-button variant="light" class="btn-add-line pull-left" @click="addCustomLpAction">
                            <i class="far fa-plus"></i> Add GEO
                        </b-button>
                    </td>
                </tr>
            </table>


            <table class="table table-striped child-row tableFixHead lp-table">
                <thead>
                <tr scope="row">
                    <th scope="col">setDefault</th>
                    <th scope="col">Name</th>
                    <th scope="col">Landing Page Url</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tr scope="row" :id="defineId(`defaultLpRowId`,lp.id)" v-for="lp in getLpOffers">
                    <td>
                        <label class="conversionType btn btn-secondary-">ID{{lp.id}}
                            <input
                                    type="radio"
                                    :checked="checkDefault(lp.id)"
                                    name="radio"
                                    @change="setDefaultLp(lp.id)"
                            >
                            <span class="conversionTypeCheckMark"></span>
                        </label>
                    </td>
                    <td>
                        <!--                        <span >{{ JSON.stringify(lp) }}</span>-->
                        <label class="text-center">LP Name</label>
                        <input type="text"
                               placeholder="ex: Movies Signup LP"
                               class="condition__matches custom-input text-center"
                               :id="defineId(`defaultLpName`, lp.id)"
                               :value="lp.name"
                               @change="updateLP($event,`name`, lp.id)"
                               maxlength="30"
                               onblur="
                                        if(this.value === ''){
                                            document.querySelector('#offerLpName').style.border = '2px solid #f38282'
                                            document.querySelector('.btn-savebucket').style.display = 'none'
                                            document.querySelector('#input-live-feedback-name').style.display = 'block'
                                            return false
                                        } else {
                                            document.querySelector('.btn-savebucket').style.display = 'inline-block'
                                            document.querySelector('#offerLpName').style.background = 'white'
                                            document.querySelector('#input-live-feedback-name').style.display = 'none'
                                            document.querySelector('#offerLpName').style.border = '2px solid #e3eef4'
                                        }
                                    "
                        >

                        <b-form-invalid-feedback id="input-live-feedback-name" style="display:none">
                            Enter a name for the landing page.
                        </b-form-invalid-feedback>


                    </td>
                    <td>
                        <label class="text-center">LP URL</label>
                        <input type="text"
                               class="condition__matches custom-input text-center"
                               :id="defineId(`defaultLpUrl`, lp.id)"
                               :value="lp.url"
                               @change="updateLP($event,`url`, lp.id)"
                               maxlength="30"
                               onblur="
                                        if(this.value === ''){
                                            document.querySelector('#offerLpUrl').style.border = '2px solid #f38282'
                                            document.querySelector('.btn-savebucket').style.display = 'none'
                                            document.querySelector('#input-live-feedback-url').style.display = 'block'
                                            return false
                                        } else {
                                            document.querySelector('.btn-savebucket').style.display = 'inline-block'
                                            document.querySelector('#offerLpUrl').style.background = 'white'
                                            document.querySelector('#input-live-feedback-url').style.display = 'none'
                                            document.querySelector('#offerLpUrl').style.border = '2px solid #e3eef4'
                                        }
                                    "
                        >

                        <b-form-invalid-feedback id="input-live-feedback-url" style="display:none">
                            Enter a website URL.
                        </b-form-invalid-feedback>


                    </td>
                    <td>
                        <b-button variant="light" @click="delLpOfferAction(lp.id)"
                                  v-b-tooltip.hover.top="'Delete Custom LPs'"
                                  style="z-index:2">
                            <i class="far fa-trash" data-fa-transform="shrink-1"></i>
                        </b-button>

                    </td>
                </tr>

                <tr scope="row">
                    <td>
                        <b-button variant="light" class="btn-add-line pull-left" @click="addLpOfferAction">
                            <i class="far fa-plus"></i> Add Landing Pages
                        </b-button>
                    </td>
                </tr>
            </table>


            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left"
                            @click="saveCustomLP(customLPRules)">
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
        props: ['defaultLp', 'customLPId', 'customLPRules'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('lpOffers', ['getLpOffers']),
            ...mapGetters('offer', ['getCustomLPRules'])
        },
        methods: {
            ...mapMutations('offer', ['changeGeo',
                'updOffer',
                'allowAll',
                'banAll',
                'addCustomLP',
                'delCustomLP',
                'updateCustomLP',
                'preSaveCustomLP',
                'cancelCustomLP'
            ]),
            ...mapMutations('countries', ['filterCountry']),
            ...mapMutations('lpOffers', ['addLpOffers', 'delLpOffers', 'updLpOffers']),
            getLpModify() {
                return this.getLpOffers.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            updateLP(event, field, id) {
                let elRow = document.querySelector(`#defaultLpRowId-${id}`)
                if (elRow) {
                    elRow.style.background = null
                }

                let obj = {}
                obj.id = id
                obj.field = field
                obj.value = event.target.value
                this.updLpOffers(obj)
            },
            setDefaultLp(id) {
                let obj = {}
                obj.fieldName = 'defaultLp'
                obj.value = id
                this.updOffer(obj)
            },
            checkDefault(id) {
                return this.defaultLp() === id
            },
            addCustomLpAction() {
                this.addCustomLP()
            },
            addLpOfferAction() {
                this.addLpOffers(this.customLPId)
            },
            delLpOfferAction(id) {
                this.delLpOffers(id)
            },
            delCustomLpAction(position) {
                this.delCustomLP(position)
            },
            getCustomLPRules_() {
                let customLPRulesRecords = this.customLPRules
                return customLPRulesRecords && customLPRulesRecords.customLPRules || []
            },
            getCountriesModify() {
                return this.getCountries.map(item => {
                    item.value = item.code
                    item.text = item.name + ' (' + item.code + ') '
                    return item
                })
            },
            updateCustomLPAction(value, field, position) {
                let elRow = document.querySelector(`#customLpRowId-${position}`)
                if (elRow) {
                    elRow.style.background = null
                }
                let updateFieldData = {}
                updateFieldData.value = value
                updateFieldData.field = field
                updateFieldData.position = position
                this.updateCustomLP(updateFieldData)

            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            show(id) {
                this.visible = true
            },
            saveCustomLP(data) {
                let validation = this.getCustomLPRules
                let validationLp = this.getLpOffers

                let res = validation.filter(item => (item.id === 0))

                let resLp = validationLp.filter(item => (item.name === '' || item.url === ''))
                if (validationLp.length === 0) {
                    alert('input at least on Landing Page')
                    return
                }
                if (res.length !== 0) {
                    res.forEach(item => {
                        document.querySelector(`#customLpRowId-${item.pos}`).style.background = 'red'
                    })

                } else if (resLp.length !== 0) {
                    resLp.forEach(item => {
                        document.querySelector(`#defaultLpRowId-${item.id}`).style.background = 'red'
                    })
                } else {
                    this.preSaveCustomLP()
                    this.visible = false
                }

            },
            close() {
                this.visible = false
                this.cancelCustomLP()

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


        .modal-container
            min-width: 50vw
            max-width: 50vw
            max-height: 80vh
            padding: 30px 30px 0px 30px
            background: #fff
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
            transition: all .3s ease
            overflow: auto


        .modal-body
            margin: 20px 0


        .modal-enter,
        .modal-leave
            opacity: 0


        .modal-enter .modal-container,
        .modal-leave .modal-container
            transform: scale(1.1)

        #table-wrapper
            position: relative

        #table-scroll
            height: 220px
            overflow: auto
            padding: 15px
            border: 2px solid #E3EEF4
            border-radius: 7px
            min-height: 215px
            margin-top: 15px

        #table-wrapper table
            width: 100%

        #table-wrapper table *
            background: yellow
            color: black

        #table-wrapper table thead th .text
            position: absolute
            top: -20px
            z-index: 2
            height: 20px
            width: 35%
            border: 1px solid red

</style>
