<template>
    <!--    <div  v-if="visible" class="modal-container">-->
    <!--  Modal content goes here -->
    <!--        <slot></slot>-->
    <div v-if="visible" class="modal-mask modal-transition">
        <div class="modal-container">

            <div class="modal-body">
                <h1 class="title">Add an LP</h1>
                <p class="text-left">
                    <label>SegmentId:{{ segment.id }} </label>
                    <label>SegmentId:{{ JSON.stringify(segment) }} </label>
                </p>

                <div class="condition-line1">
                    <model-select
                            :options="getLpModify()"
                            @input="handleChangeLp($event, segment)"
                            :id="defineLpId(segment.id)"

                            :ref="defineLpId(segment.id)"
                            placeholder="Search landing page..."
                            class="condition__country condition__matches custom-select "
                    >
                    </model-select>


<!--                    :value="segment.landingPageId"-->
                </div>
                <p class="text-left">
                    <label :id="defineLpLabelId(segment.id)" >Choose:{{ segment.landingPageId }} </label>
                </p>
                <br>

                <b-row class="text-center">
                    <b-col cols="6">
                        <div class="condition__controls condition-line">
                            <label class="text-center">Weight</label>
                            <input  type="text"
                                    min="0" max="100"
                                    value="20"
                                    class="condition__matches custom-input text-center"
                                    onpaste="return false"
                                    onfocus="this.value=''"
                                    onkeypress="
                                                    return (
                                                        event.charCode == 8
                                                        || event.charCode == 0
                                                        || event.charCode == 13
                                                    ) ? null : event.charCode >= 48 && event.charCode <= 57
                                                "
                            >
                            <!-- <b-form-text class="limitWeight">
                                20 / <span class="max-limit">100</span>
                            </b-form-text> -->
                        </div>
                    </b-col>
                    <b-col cols="6">
                        <div class="condition__controls condition-line">
                            <label class="text-center">Total Weight</label>
                            <input  type="text"
                                    value="100"
                                    class="condition__matches custom-input text-center"
                                    disabled
                            >
                        </div>
                    </b-col>
                </b-row>

            </div>

            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left" @click="save">Save</button>
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
        data () {
            return {
                visible: false
            }
        },
        props: ['segment'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages'])
        },
        methods: {
            setElIdByAff (value, id) {
                return `${value}-${id}`
            },
            defineLpId(id) {
                return `lp-${id}`
            },
            defineLpLabelId(id) {
                return `lp-label-${id}`
            },
            getLpModify() {
                return this.getLandingPages.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            handleChangeLp(lpId, item) {
                // item.landingPageId = lpId
                debugger
                let nameLp = this.getLandingPages.filter(i=>{
                    return i.value === lpId
                })
                document.querySelector(`#lp-label-${item.id}`).textContent = `Chosee LP:`+ lpId + nameLp[0].text
                // el.value = lpId
                // el[0].value = lpId

                debugger
            },
            getAffiliatesModify () {
                return this.getAffiliates.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            show (index) {
                this.visible = true
            },
            save () {
                this.visible = false
            },
            close () {
                this.visible = false
            },
            // async close () {
            //     this.visible = false
            //     let order = this.getCapAffBuckets.sort((a, b) => (Number(a.id) - Number(b.id)))
            //     let lastRecord = order[order.length - 1]
            //     if (lastRecord.capBucketId === 0) {
            //         let lastId = lastRecord && lastRecord.id || 0
            //         await this.$store.dispatch('affiliates/deleteAffBucketStore', lastId)
            //     }
            // },
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


</style>
