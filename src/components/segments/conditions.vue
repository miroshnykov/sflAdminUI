<template>

    <section class="segment-form__conditions">
        <div class="segment-buttons">
            <b-button v-show="this.segmentRuleCount === 0" variant="primary" class="add-rule" @click="this.addFilter">
                <i class="fas fa-plus" data-fa-transform="shrink-2"></i> Create Rule
            </b-button>

            <div v-if="loading" class="overlay-loader animated fadeIn">
                <div class="segment-loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading</span>
                    </div>
                    <br>
                    <label>Loading</label>
                </div>
            </div>

            <div class="create-rule" v-show="this.segmentRuleCount === 0">
                <section class="filter">
                    <i class="fad fa-layer-plus fa-4x"></i>
                    <p>Create a new rule to begin.</p>
                </section>
            </div>

            <condition-filter
                    v-for="(index) in this.segmentRuleCount"
                    :indexFilters="index-1"
                    :key="index"
            />

            <span class="space"></span>
            <b-button class="btn-back" variant="light" @click="this.mainPage"
                      v-b-tooltip.hover.right="'Note: Unsaved changes will be cancelled'">
                <i class="fad fa-arrow-left"></i> Manage Segments
            </b-button>
            <b-button class="btn-save" @click="this.saveConditions">
                <i class="fad fa-save"></i> Save Changes
            </b-button>
        </div>
    </section>
</template>

<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
    import {duplicate} from '../../helpers'
    import {deleteCookie, reFormatJSON} from '../../helpers'

    import ConditionFilter from './conditionFilter'

    export default {
        name: 'conditions',
        computed: {
            ...mapState('segment', ['segmentFilter', 'segmentRuleCount', 'segmentId']),
            ...mapGetters('segments', ['getSegmentsStore'])
        },
        data() {
            return {
                loading: true,
            }
        },
        mounted() {
            this.loadingDone()
        },
        methods: {
            loadingDone() {
                let self = this
                setTimeout(() => {
                    self.loading = false
                }, Number(self.segmentRuleCount + 1) * 100)
            },
            mainPage() {
                this.$router.push('/segments')
            },
            validate() {

                // let cond = this.getSegmentsStore.map(item => {
                //     item.condition.forEach(item2 => {
                //         item2.segmentName = item.name
                //     })
                //     return item.condition
                // })
                //
                // cond = cond.flat()
                // cond = cond.filter(item => (item.id !== this.segmentId))
                // console.log('>>>>Conditions2 ')
                // console.table(reFormatJSON(cond))
                //
                // console.log('>>>>this.segmentFilter ')
                // console.table(reFormatJSON(this.segmentFilter))

                let checkEmptyValue = this.segmentFilter.filter(item => {
                    if (item.value.substr(item.value.indexOf('/') + 1, item.value.length) === ''
                        || item.value === ''
                    ) {
                        return item
                    }
                })
                console.log(' >>> validate checkEmptyValue:')
                console.table(reFormatJSON(checkEmptyValue))

                checkEmptyValue.forEach(item => {
                    let myCondition = `condition-${item.position}`
                    console.log(' >>> validate checkEmptyValue item')
                    console.table(reFormatJSON(item))
                    // if (self.$children[item.position].$refs[myCondition]){
                    //     self.$children[item.position].$refs[myCondition][0].style.background = 'red'
                    // }
                    if (document.querySelector(`#condition-${item.position}`)) {
                        document.querySelector(`#condition-${item.position}`).classList.add('error')
                    }
                    // this.$children.$refs(myCountry).style.background = 'red'
                })
                if (checkEmptyValue.length > 0) {
                    // alert(`Missing data `)
                    this.$swal.fire({
                        type: 'error',
                        title: 'Missing Data',
                        text: 'Some fields were not selected, please try again.',
                        footer: ''
                    })
                    return
                }


                // this.$el.querySelector('#filter-1')
                console.table(reFormatJSON(checkEmptyValue))

                let check = this.segmentFilter
                check.sort((a, b) => (Number(a.segmentRuleIndex) - Number(b.segmentRuleIndex)))
                console.table(reFormatJSON(check))

                let checkCorrectData = check.map(item => (item.segmentRuleIndex))
                let wrongDataFilterIds = []
                duplicate(checkCorrectData).forEach(index => {

                    if (document.querySelector(`#filter-${index}`)) {
                        document.querySelector(`#filter-${index}`).style.background = null
                    }

                    let checkData = this.segmentFilter.filter(item => (item.segmentRuleIndex === index) && item)

                    // console.table(JSON.parse(JSON.stringify(checkData)))
                    let checkDataItem = checkData.map(item => (item.dimensionId))

                    let duplicate_ = duplicate(checkDataItem)
                    if (duplicate_.length > 1) {
                        wrongDataFilterIds.push(index)
                    }

                })

                wrongDataFilterIds.forEach(id => {

                    if (document.querySelector(`#filter-${id}`)) {
                        document.querySelector(`#filter-${id}`).style.background = 'red'
                    }
                    // this.$children.$refs(myCountry).style.background = 'red'
                })
                if (wrongDataFilterIds.length > 0) {
                    // alert(`Missing data `)
                    this.$swal.fire({
                        type: 'error',
                        title: 'Validation error',
                        text: 'Conditions inside the filters should be unique.',
                        footer: 'Errors'
                    })
                    return
                }

                return true
            },
            loginOut() {
                deleteCookie('accessToken')
                this.$router.push(`/`)
                location.reload()
            },
            async saveConditions() {
                debugger
                if (!this.validate()) return
                await this.$store.dispatch('segment/saveConditions', this)
            },
            ...mapMutations('segment', ['addFilter'])
        },
        components: {ConditionFilter},
    }
</script>

<style lang="scss">
    .space {
        margin: 10px;
    }

    .segment-form__conditions {
        .add-filter {
            width: 200px;
            margin: 2rem;
        }

        .save {
            width: 200px;
            margin: 2rem;
        }

        .button--fill:disabled {
            opacity: 0;
            cursor: initial;
        }
    }
</style>
