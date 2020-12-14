<template>
    <transition name="fade">

        <section :class="getClassSegment(segment.status)" :id="segment.id"
                 @change="updateGroup($event, group)">

            <b-row class="text-center" align-v="center">
                <b-col col lg="8">

                    <h1 class="segment__name" :title="segment.name">
                        <span v-bind:title="getTitle(segment)" class="segment__active"
                              @click="toggleState(segment)">➕</span>
                        {{segment.name}} <span class="segment-name-id">(ID: {{segment.id}})</span>
                        <!--                <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->
                        <!--                <span v-if="segment.isDefault" class="segment__default">(Default)</span>-->
                    </h1>
                    <!--@focus="focusMenu" @blur="blur"-->

                    <!-- TODO: Toggle doesnt work, also cant find where to change icon from plus symbol to chevron down, like the mock -->
                    <!--                <button class="segment__toggle-menu"/>-->

                    <!--            <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->

                </b-col>
                <b-col col lg="4">
                    <b-button variant="light" @click="edit(segment.id)" v-b-tooltip.hover.top="'Edit'"
                              style="z-index:2">
                        <i class="far fa-edit" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <b-button variant="light" @click="delSegment(segment.id)" v-b-tooltip.hover.top="'Delete'"
                              style="z-index:2">
                        <i class="far fa-trash-alt" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <b-form-checkbox
                            class="active"
                            name="check-button"
                            :checked="segment.status==='active'"
                            @change="activeInactiveSwitch($event, segment)"
                            switch>
                    </b-form-checkbox>

                </b-col>
            </b-row>


            <!-- <label v-if="segment.landingPageId">ID: {{segment.landingPageId}}</label> -->

            <!-- <div v-if="segment.lp.length !== 0" class="child-table"> -->
            <!--            <div v-if="segment.lp.length !== 1" class="child-table">-->
            <!-- TODO: Known issue - If number is 0, other segments other than the first one don't show data.
            If number is 1, any modal popup repeats the amount of segments we have -->


            <b-row class="text-center lp-container" align-v="center">
                <b-col col lg="6">
                    <span class="lp-label">Landing Pages</span>
                    <!-- <label class="segment-position">{{segment.position}}</label> -->
                </b-col>
                <b-col col lg="6">
                    <!-- TODO: Saving LP doesnt work, please fix. Optional: Move popup modal to new page/component -->
                    <b-button variant="primary btn-sm" v-b-modal.modal-scrollable
                              @click="showLPModal(segment.id)"
                    >
                        <i class="far fa-layer-plus" data-fa-transform="shrink-1"></i> New LP
                    </b-button>

                    <LandingPagesComp :id="'modal_' + segment.id" :ref="'modal_' + segment.id"
                                      :segment="segment">
                    </LandingPagesComp>


                </b-col>
            </b-row>

            <!-- <table class="table table-striped child-row tableFixHead lp-table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                </tr>
                </thead>
                <tr scope="row" v-for="lp in segment.lp">
                    <td>{{ lp.id }}</td>
                    <td>{{ lp.name }}</td>
                </tr>
            </table> -->

            <!-- <b-badge variant="light"
            v-for="lp in segment.lp"
            v-b-tooltip.hover.bottom.html="lp.name"
            title="ID: 1 - Weight: 20"> -->

            <b-badge variant="light"
                     v-for="lp in segment.lp"
                     v-b-modal.modal-edit-lp
            >

                <span class="landing-page">
                    <!-- TODO: Could only get LP Name to show via HTML, but need ID and Weight also -->
                    <span class="landing-page-name" v-if="lp.name.length<=37"
                          v-b-popover.hover.focus.bottom.html="lp.name" :title="'ID:'+lp.id + ' Weight:'+lp.weight">
                        {{ lp.name }}
                    </span>
                    <!-- TODO: Same thing - Could only get LP Name to show via HTML, but need ID and Weight also -->
                    <span class="landing-page-name" v-if="lp.name.length>=38"
                          v-b-popover.hover.focus.bottom.html="lp.name" :title="'ID:'+ lp.id + ' Weight:'+lp.weight">
                        {{ lp.name.substring(0,38)+"..." }}
                    </span>
                    <b-button variant="light" @click="delSegmentLp(segment.id, lp.id)" v-b-tooltip.hover.top="'Delete'"
                              style="z-index:2">
                        <i class="far fa-trash-alt" data-fa-transform="shrink-1"></i>
                    </b-button>
                </span>

                (<i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> {{lp.weight}})
            </b-badge>

            <br>
            <!-- TODO: Show actual current + total Weight values -->
            <span class="text-small"><i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> Weight Total: 80 / 100</span>
            <!--            </div>-->

            <div v-if="errors" class="validate_error">
                <span v-for="error in errors">{{ error }}</span>
            </div>

        </section>

    </transition>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from "vuex";
    import {ModelSelect} from 'vue-search-select'

    import LandingPagesComp from './landingPages'

    export default {
        name: "segment",
        components: {ModelSelect, LandingPagesComp},
        props: {
            segment: Object
        },
        data() {
            return {
                errors: [],
                showMenu: false,
                showLandingPages: false,
                checked: false,
                id: Number(this.$route.params.id),
            };
        },
        methods: {
            // async addAffiliates () {
            //     let order = this.getBucketAffiliates.sort((a, b) => (Number(a.id) - Number(b.id)))
            //     let lastRecord = order[order.length - 1]
            //     let lastId = lastRecord && lastRecord.id || 0
            //     await this.addAffiliate()
            //     this.showBucketModal(lastId + 1)

            //     if (res){
            //         this.$swal.fire({
            //             type: 'success',
            //             position: 'top-end',
            //             title: `Segment ID ${segment.id} ${segment.name} updated`,
            //             showConfirmButton: false,
            //             timer: 1000
            //         })
            //     }
            // },
            getClassSegment(status) {
                let classStatus =  status === 'active' ? 'segment' : 'segmentInActive'
                return `${classStatus} segment__draggable`
            },
            activeInactiveSwitch(status, segment) {
                let self = this
                self.status = status && 'active' || 'inactive'
                self.segmentId = segment.id
                self.segmentName = segment.name
                this.$nextTick(async () => {
                    let obj = {}
                    obj.status = self.status
                    obj.segmentId = self.segmentId
                    obj.name = self.segmentName

                    let res = await this.$store.dispatch('segment/updateSegmentStatus', obj)

                    if (res && res.segmentId) {
                        self.$swal.fire({
                            type: 'success',
                            position: 'top-end',
                            title: `Segment status  updated`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                        location.reload()
                    } else {
                        self.$swal.fire({
                            title: `Segment status was not updated`,
                            type: 'error',
                            text: 'Please check backend errors',
                            confirmButtonColor: '#2ED47A',
                        })
                    }

                    // location.reload()
                })
            },
            showLPModal(index) {
                let modal_id = 'modal_' + index
                console.log('showModal:', modal_id)
                this.$refs[modal_id].show(index)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            getTitleLp(info) {
                return "dimon"
            },
            handleChangeLp(lpId, item) {
                item.landingPageId = lpId
            },
            getStatusList() {
                return [
                    {id: 0, name: 'Active'},
                    {id: 1, name: 'Inactive'},
                ]
            },
            getId(value) {
                return `${this.id}`
            },
            setElId(value) {
                return `${value}-${this.id}`
            },
            defineLpId(id) {
                return `lp-${id}`
            },
            getFieldName(field) {
                return this.getBucket.length > 0 && this.getBucket[0][field]
            },
            updateGroup(e, group) {
                console.log(e, group)
            },
            edit(id) {
                this.$router.push(`/segment/${id}`)
            },
            async saveLp(segment) {
                let res = await this.$store.dispatch('segment/updateLandingPage', segment)
                if (res) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Segment ID ${segment.id} ${segment.name} updated`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
            async delSegmentLp(segmentId, lpId) {
                this.$swal.fire({
                    type: 'warning',
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#FE5D65',
                    cancelButtonColor: '#ACC3CF',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {

                        let obj = {}
                        obj.segmentId = segmentId
                        obj.lpId = lpId
                        this.$store.dispatch('lp/deleteSegmentLp', obj).then(res => {
                            if (res.segmentId) {
                                this.$swal.fire({
                                    type: 'success',
                                    position: 'top-end',
                                    title: `Landing page ID ${obj.lpId} deleted`,
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                location.reload()
                            } else {
                                this.$swal.fire({
                                    title: `Landing page ID ${obj.lpId} was not deleted`,
                                    type: 'error',
                                    text: 'Please check backend errors',
                                    confirmButtonColor: '#2ED47A',
                                })
                            }
                        })
                    }
                })
            },
            async saveLp(segment) {
                let res = await this.$store.dispatch('segment/updateLandingPage', segment)
                if (res) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Segment ID ${segment.id} ${segment.name} updated`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
            async delSegment(id) {
                this.$swal.fire({
                    type: 'warning',
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#FE5D65',
                    cancelButtonColor: '#ACC3CF',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {

                        this.$store.dispatch('segments/deleteSegmentAction', id).then(res => {
                            if (res.id) {
                                this.$swal.fire({
                                    type: 'success',
                                    position: 'top-end',
                                    title: `Segment ID ${id} deleted`,
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                location.reload()
                            } else {
                                this.$swal.fire({
                                    title: `Segment ID ${id} was not deleted`,
                                    type: 'error',
                                    text: 'Please check backend errors',
                                    confirmButtonColor: '#2ED47A',
                                })
                            }
                        })
                    }
                })
            },
            getTitle(segment) {
                return 'Expand or Collapse'

            },
            getClass(segment) {
                return 'segment__empty'
            },
            updateSegment: function (segment, landingPages) {
                this.update(Object.assign({}, segment, {landingPages}));
            },
            ...mapActions("segments", ["update", "removeAndUpdateOrder"]),
            ...mapMutations("segments", ["toggleActive"]),
            ...mapMutations(["toggleMask", "toggleConfirm"]),
            ...mapMutations("landingPages", ["processLandingPagesEdit"])
        },
        computed: {
            ...mapGetters('segments', ['getSegments']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('lp', ['getLandingPages'])
        },
    };
</script>

<style lang="scss">
    input.search-box {
        padding: 10px 20px;
        border-radius: 10px;
        border: 0px solid transparent;
        height: 45px;
        width: 352px;
        box-shadow: 0px 0px 3px 0px #eee;
    }

    input.search-box:before {
        content: '\F11C';
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 16px;
        color: lightgrey;
        float: right;
        margin-top: 2px;
        margin-right: -20px;
    }

    span.segment-name-id {
        color: #7F98A5;
    }

    span.text-small {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        float: right;
    }

    .badge-light {
        color: #7F98A5;
        background-color: #E3EEF4;
        margin: 5px 0px 5px 0px;
        width: 100%
    }

    .custom-switch {
        margin-left: 4.4rem;
        z-index: 1;
    }

    .segment {
        opacity: 1;
        margin: 15px 20px 0px 0px;
        // height: 80px;
        width: 352px;
        padding: 1rem;
        position: relative;
        border-radius: 10px;
        border: solid #2ED47A 2px;
        background: #fff;
        user-select: none;
    }

    .segmentInActive {
        opacity: 1;
        margin: 15px 20px 0px 0px;
        // height: 80px;
        width: 352px;
        padding: 1rem;
        position: relative;
        border-radius: 10px;
        border: solid rgba(75, 133, 225, 0.15) 2px;
        background: #fff;
        user-select: none;
    }

    .segment.segment__draggable {
        cursor: grab;
        height: auto;
    }

    .segment__empty {
        color: red;
    }

    .segment__name {
        color: #3A3852;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.3px;
        margin: 0 0 0.5rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .segment__default {
        font-style: italic;
        height: 80px;
    }


</style>
