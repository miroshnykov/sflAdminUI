<template>
    <!--    <div  v-if="visible" class="modal-container">-->
    <!--  Modal content goes here -->
    <!--        <slot></slot>-->
    <div v-if="visible" class="modal-mask modal-transition">
        <div class="modal-container">

            <div class="modal-body">
                <h1>{{ this.editMode && 'Update Landing page' || 'Add Landing page' }}</h1>

                <p class="text-left">
                    <label>Segment ID: {{ segment.id }}</label>
                </p>

                <div class="condition-line1">
                    <model-select
                            :options="getLpModify()"
                            @input="handleChangeLp($event, segment)"
                            :id="defineId(`lp`,segment.id)"
                            :value="this.lpId"
                            :ref="defineId(`lp`,segment.id)"
                            placeholder="Search landing page..."
                            :class="getClassLp(segment.id)"
                    >
                    </model-select>


                </div>

                <b-row class="text-center">
                    <b-col cols="4">
                        <div class="condition__controls condition-line">
                            <label class="text-center">Weight</label>
                            <input type="text"
                                   min="0" max="100"
                                   class="condition__matches custom-input text-center"
                                   onpaste="return false"
                                   :id="defineId(`weight`,segment.id)"
                                   :value="this.weight"
                                   @change="updateTotalWeight($event, segment)"
                                   onkeypress="
                                                    return (
                                                        event.charCode == 8
                                                        || event.charCode == 0
                                                        || event.charCode == 13
                                                    ) ? null : event.charCode >= 48 && event.charCode <= 57
                                                "
                                   onkeyup="
                                        this.style.background = 'white'
                                               if(this.value === '' || parseInt(this.value)>100){
                                                    this.value = 100
                                                    return false
                                                }
                                            "

                            >
                            <!-- <b-form-text class="limitWeight">
                                20 / <span class="max-limit">100</span>
                            </b-form-text> -->
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="condition__controls condition-line">
                            <label class="text-center">Total Weight</label>
                            <input type="text"
                                   value="100"
                                   class="condition__matches custom-input text-center"
                                   disabled
                            >
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="condition__controls condition-line">
                            <label class="text-center">Sum Weight</label>
                            <input type="text"
                                   :id="defineId(`sumWeight`, segment.id)"
                                   :value="getSumWeight(segment.lp)"
                                   class="condition__matches custom-input text-center"
                                   disabled
                            >
                        </div>
                    </b-col>
                </b-row>

            </div>

            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-left" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-right" @click="saveLp(segment)">
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
        props: ['segment'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages'])
        },
        methods: {
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
            show(segmentId, id, lpId, weight) {
                this.visible = true
                this.segmentId = segmentId
                if (lpId) {
                    this.editMode = true
                    this.lpId = lpId
                    this.id = id
                    this.weight = weight
                }
                let segmentSectionEl = document.querySelector(`#segmentSectionId-${this.segmentId}`)
                if (segmentSectionEl){
                    segmentSectionEl.classList.remove("segment__draggable")
                }
            },
            saveLp(data) {
                let weightValue = document.querySelector(`#weight-${data.id}`).value

                if (+weightValue === 0) {
                    alert(' weight missing')
                    document.querySelector(`#weight-${data.id}`).style.background = '#f38282'
                    return
                }

                if (!this.lpId) {
                    alert('landing page  missing')
                    document.querySelector(`.lpInput-${data.id}`).style.background = '#f38282'
                    return
                }

                this.visible = false
                let segmentLpData = {}
                segmentLpData.id = this.id || 0
                segmentLpData.segmentId = data.id || 0
                segmentLpData.lpId = this.lpId || 0
                let weight = document.querySelector(`#weight-${data.id}`).value
                segmentLpData.weight = +weight || 0

                if (this.editMode) {

                    this.$store.dispatch('lp/updateSegmentLp', segmentLpData).then(res => {
                        if (res && res.segmentId) {
                            this.$swal.fire({
                                type: 'success',
                                position: 'top-end',
                                title: `Segment LP has been updated`,
                                showConfirmButton: false,
                                timer: 1000
                            })
                            this.editMode = false
                            location.reload()

                        } else {
                            this.$swal.fire({
                                title: 'Missing information',
                                type: 'error',
                                text: 'Please name your segment and try again.',
                                confirmButtonColor: '#2ED47A',
                            })
                            this.editMode = false
                        }
                    })

                } else {
                    this.$store.dispatch('lp/createSegmentLp', segmentLpData).then(res => {
                        if (res && res.segmentId) {
                            this.$swal.fire({
                                type: 'success',
                                position: 'top-end',
                                title: `Segment LP has been created`,
                                showConfirmButton: false,
                                timer: 1000
                            })
                            location.reload()

                        } else {
                            this.$swal.fire({
                                title: 'Missing information',
                                type: 'error',
                                text: 'Please name your segment and try again.',
                                confirmButtonColor: '#2ED47A',
                            })
                        }
                    })

                }


            },
            close() {
                let segmentSectionEl = document.querySelector(`#segmentSectionId-${this.segmentId}`)
                if (segmentSectionEl){
                    segmentSectionEl.classList.add("segment__draggable")
                }
                this.visible = false
                this.editMode = false
                this.segmentId = 0
                this.lpId = 0
                this.id = 0
                this.weight = 0

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
