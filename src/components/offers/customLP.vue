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
                <tr scope="row" v-for="rules in customLPRules.customLPRules">
                    <td>
                        {{ JSON.stringify(rules) }}
                        <div class="condition-line1">
                            <model-select
                                    :options="getCountriesModify()"
                                    :id="defineId(`customCountry`,rules.pos)"
                                    :value="rules.country"
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
                                    :value="rules.id"
                            >
                            </model-select>


                        </div>

                    </td>
                    <td>
                        <b-button variant="light" @click="delCustomLpAction(rules.pos)" v-b-tooltip.hover.top="'Delete Custom LPs'"
                                  style="z-index:2">
                            <i class="far fa-trash-alt" data-fa-transform="shrink-1"></i>
                        </b-button>

                    </td>
                </tr>

                <tr scope="row">
                    <td><b-button variant="light" class="btn-add-line" @click="addCustomLpAction">
                        <i class="far fa-plus"></i> Add GEO
                    </b-button>
                    </td>
                </tr>
            </table>


            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left" @click="saveCustomLP(customLPRules)">
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
        props: ['customLPId', 'customLPRules'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('lpOffers', ['getLpOffers'])
        },
        methods: {
            ...mapMutations('offer', ['changeGeo','allowAll','banAll','addCustomLP','delCustomLP']),
            ...mapMutations('countries', ['filterCountry']),
            getLpModify() {
                return this.getLpOffers.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            addCustomLpAction(){
                this.addCustomLP()
            },
            delCustomLpAction(position){
                this.delCustomLP(position)
            },
            getCountriesModify() {
                return this.getCountries.map(item => {
                    item.value = item.code
                    item.text = item.name + ' (' + item.code + ') '
                    return item
                })


            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            show(id) {
                this.visible = true
            },
            saveCustomLP(data) {
                this.visible = false
            },
            close() {
                this.visible = false

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
            max-width: 80vw
            max-height: 80vh
            padding: 20px 30px
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
            height: 150px
            overflow: auto
            margin-top: 20px

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
