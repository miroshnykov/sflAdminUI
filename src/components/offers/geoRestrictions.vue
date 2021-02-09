<template>
    <div v-if="visible" class="modal-mask modal-transition">

        <div class="modal-container">

            <h1>Custom GEO Settings</h1>

            <input
                    type="text"
                    class="search-box"
                    placeholder="Type country..."
                    @input="searchCountry($event)"

            />

            <div id="table-wrapper">
                <div id="table-scroll">

                    <div v-if="getCountries.length !== 0" class="table-geo">
                        <b-col cols="6" style="float: left" v-for="(country, index) in getCountries"
                               :key="index"
                        >
                            <p>
                                <input
                                        :id="defineId(`countryCheckbox`,index)"
                                        type="checkbox"
                                        :checked="getClassActiveOrNotCountry(country.code)"
                                        @change="changeCountry($event, country.code)"
                                >
                                <label :for="defineId(`countryCheckbox`,index)">{{country.name}}
                                    ({{country.code}})</label>
                            </p>
                        </b-col>

                    </div>

                </div>
            </div>

            <b-row class="text-center">
                <b-col cols="12">
                    <div class="allow-ban-all">
                        <b-button variant="light" class="btn-allow-ban-all"
                                  @click="allowAllEvent()"
                        >
                            <i class="far fa-check-circle" data-fa-transform="shrink-1"></i> Allow All
                        </b-button>

                        <b-button variant="light" class="btn-allow-ban-all"
                                  @click="banAllEvent()"
                        >
                            <i class="far fa-ban" data-fa-transform="shrink-1"></i> Ban All
                        </b-button>
                    </div>
                </b-col>
            </b-row>

            <b-row class="text-center">
                <b-col cols="6">
                    <div class="condition__controls">
                        <label>Default Redirect</label>
                        <input
                                type="text"
                                :value="offerDefaultLPInfo && offerDefaultLPInfo[0].text"
                                class="condition__matches campaign custom-input"
                                disabled
                        >
                    </div>
                </b-col>
            </b-row>

            <b-form-text>* Default redirect LP will be used for banned countries</b-form-text>

            <b-row class="text-center modal-footer-1">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-left" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-right" @click="saveLp(geoId)">
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
        props: ['geoId', 'geoRules', 'offerDefaultLPInfo'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages']),
            ...mapGetters('countries', ['getCountries'])
        },
        methods: {
            ...mapMutations('offer', [
                'changeGeo',
                'allowAll',
                'banAll',
                'preSaveGeo',
                'cancelGeo'
            ]),
            ...mapMutations('countries', ['filterCountry']),
            allowAllEvent() {
                this.allowAll()
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
                this.preSaveGeo()
            },
            close() {
                this.visible = false
                this.cancelGeo()

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
            min-width: 60vw
            max-width: 60vw
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

        .allow-ban-all
            float: left
            margin-top: 10px

        /*** custom checkboxes ***/


        input[type=checkbox]
            display:none !important
        /* to hide the checkbox itself */


        input[type=checkbox] + label:before
            display: inline-block
            font-family: "Font Awesome 5 Free"
            font-size: 16px
        // position: relative
        // top: 5px
        // left: 5px

        input[type=checkbox] + label:before
            content: '\f058'
            color: #2ED47A
            font-weight: 400
        /* allow icon */


        input[type=checkbox] + label:before
            letter-spacing: 20px
        /* space between checkbox and label */


        input[type=checkbox]:checked + label:before
            content: "\f05e"
            color: #EB5757
            font-weight: 900
        /* ban icon */


        input[type=checkbox]:checked + label:before
            letter-spacing: 20px
        /* allow space for check mark */


        input.search-box:before
            content: '\F11C'
            font-family: "Font Awesome 5 Free"
            font-weight: 900
            font-size: 16px
            color: lightgrey
            float: right
            margin-top: 2px
            margin-right: -20px

</style>
