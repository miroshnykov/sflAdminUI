<template>
    <div v-if="visible" class="modal-mask modal-transition">

        <div class="modal-container">


            <h1>Custom GEO Settings</h1>
            <input type="text" class="search-box" placeholder="Type country..."/>

            <div id="table-wrapper">
                <div id="table-scroll">


                    <div v-if="getCountries.length !== 0" class="table-geo">
                        <b-col cols="6" style="float: left" v-for="(country, index) in getCountries">
                            <p>
                                <input
                                        :id="defineId(`countryCheckbox`,index)"
                                        type="checkbox"
                                        :checked="getClassActiveOrNotCountry(country.code)"
                                >
                                {{country.name}}( {{country.code}} )
                            </p>
                        </b-col>

                    </div>

                </div>
            </div>

            <!--            <div v-if="getCountries.length !== 0" class="child-table">-->
            <!--                <span>Country</span>-->
            <!--                <table class="table table-striped child-row tableFixHead">-->
            <!--                    <thead>-->
            <!--                    <tr>-->
            <!--                        <th scope="col">Name</th>-->
            <!--                    </tr>-->
            <!--                    </thead>-->
            <!--                    <tr scope="row" v-for="country in getCountries">-->
            <!--                        <td>{{ country.name }}</td>-->
            <!--                    </tr>-->
            <!--                </table>-->
            <!--            </div>-->


            <a class="btn-link" href="">Allow All / Ban All</a>

            <div class="condition__controls">
                <label>Default Redirect</label>
                <input type="text"
                       placeholder="Offer 77 - Hyuna, iPhone 11"
                       class="condition__matches campaign custom-input"
                       disabled
                >
            </div>

            <b-form-text>* Default redirect LP will be used for banned countries</b-form-text>


            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left" @click="saveLp(geoId)">
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
                editMode: false,
                segmentId: 0,
                weight: 0,
                lpId: 0,
                id: 0,
            }
        },
        props: ['geoId', 'geoRules'],
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
                debugger


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
