<template>
    <transition name="fade">

        <section class="segment" :id="segment.id" :class="{segment__draggable: true}"
                 @change="updateGroup($event, group)">

            <b-row class="text-center" align-v="center">
                <b-col col lg="8">

                <h1 class="segment__name" :title="segment.name">
                    <span v-bind:title="getTitle(segment)" class="segment__active" @click="toggleState(segment)"><i class="far fa-chevron-up"></i></span>
                    {{segment.name}} <span class="segment-name-id">(ID: {{segment.id}})</span>
                    <!--                <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)"><i class="far fa-chevron-down"></i></span>-->
                    <!--                <span v-if="segment.isDefault" class="segment__default">(Default)</span>-->
                </h1>
                <!--@focus="focusMenu" @blur="blur"-->

                <!-- TODO: Toggle doesnt work, also cant find where to change icon from plus symbol to chevron down, like the mock -->
                <button class="segment__toggle-menu"/>

                <!--            <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)"><i class="far fa-chevron-down"></i></span>-->

                </b-col>
                <b-col col lg="4">
                    <b-button variant="light" @click="edit(segment.id)" v-b-tooltip.hover.top="'Edit'" style="z-index:2">
                        <i class="far fa-edit" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <b-button variant="light" @click="delSegment(segment.id)" v-b-tooltip.hover.top="'Delete'" style="z-index:2">
                        <i class="far fa-trash-alt" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <!-- TODO: Switch from active to inactive, with different class states (green border = active, grey border = inactive) -->
                    <b-form-checkbox v-model="checked" name="check-button" switch></b-form-checkbox>
                </b-col>
            </b-row>


            <!-- <label v-if="segment.landingPageId">ID: {{segment.landingPageId}}</label> -->

            <!-- <div v-if="segment.lp.length !== 1" class="child-table"> -->
            <div v-if="segment.lp.length !== 0" class="child-table">
            <!-- TODO: Known issue - If number is 0, other segments other than the first one don't show data.
            If number is 1, any modal popup repeats the amount of segments we have -->


            <b-row class="text-center lp-container" align-v="center">
                <b-col col lg="6">
                    <span class="lp-label">Landing Pages</span>
                    <!-- <label class="segment-position">{{segment.position}}</label> -->
                </b-col>
                <b-col col lg="6">
                    <!-- TODO: Saving LP doesnt work, please fix. Optional: Move popup modal to new page/component -->
                    <b-button variant="primary btn-sm" v-b-modal.modal-scrollable>
                        <i class="far fa-layer-plus" data-fa-transform="shrink-1"></i> New LP
                    </b-button>

                <div class="newLP">
                    <b-modal id="modal-scrollable" scrollable title="">
                        <p class="my-4" v-for="i in 20" :key="i">
                            <h2 class="swal2-title" id="swal2-title" style="display: flex;">New Landing Page</h2>
                            <label for="swal-input1"></label>

                        <div class="condition-line1">
                            <model-select
                                    :options="getLpModify()"
                                    @input="handleChangeLp($event, segment)"
                                    :id="defineLpId(segment.id)"
                                    :ref="defineLpId(segment.id)"
                                    :value="segment.landingPageId"
                                    placeholder="Search landing page..."
                                    class="condition__country condition__matches custom-select "
                            >
                            </model-select>

                            <!-- TODO: Show actual Weight values -->
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


                    </b-modal>
                </div>
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
                    <span class="landing-page-name" v-if="lp.name.length<=37" v-b-popover.hover.focus.bottom.html="lp.name" title="ID: 1 - Weight: 20">
                        {{ lp.name }}
                    </span>
                    <!-- TODO: Same thing - Could only get LP Name to show via HTML, but need ID and Weight also -->
                    <span class="landing-page-name" v-if="lp.name.length>=38" v-b-popover.hover.focus.bottom.html="lp.name" title="ID: 1 - Weight: 20">
                        {{ lp.name.substring(0,38)+"..." }}
                    </span>
                </span>

                    (<i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> 20)
                </b-badge>

                <!-- TODO: Edit LP to work/save -->
                <!-- Add Affiliate Status, Affiliate Campaign -->
                <div class="editLP">
                    <b-modal id="modal-edit-lp" scrollable title="">
                        <p>
                            <h2 class="swal2-title" id="swal2-title" style="display: flex;">Edit Landing Page</h2>
                            <label for="swal-input1"></label>

                        <div class="condition-line1">
                            <model-select
                                    :options="getLpModify()"
                                    @input="handleChangeLp($event, segment)"
                                    :id="defineLpId(segment.id)"
                                    :ref="defineLpId(segment.id)"
                                    :value="segment.landingPageId"
                                    placeholder="Search landing page..."
                                    class="condition__country condition__matches custom-select "
                            >
                            </model-select>

                            <!-- TODO: Show actual Weight values -->
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


                    </b-modal>
                </div>

                <br>
                <!-- TODO: Show actual current + total Weight values -->
                <span class="text-small"><i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> Weight Total: 80 / 100</span>
            </div>




            <!--            <label style="font-size: 12px;">( {{segment.id}} )</label>-->
            <!--            <b-button variant="light">Light</b-button>-->

            <!--                    <b-button variant="primary" class="margin-left-10" @click="this.addCampaign">-->
            <!--                        <i class="fas fa-plus" data-fa-transform="shrink-1"></i> Edit-->
            <!--                    </b-button>-->

            <!--            <button tag="button" @click="clickMenuItem('edit')" class="segment__edit segment__menu-item" @blur="blur">-->

            <!--                Edit-->
            <!--            </button>-->
            <!--            <ul :class="`segment__menu-open`">-->
            <!--                <li>-->

            <!--                </li>-->

            <!--            </ul>-->
            <!--            <template v-if="showLandingPages">-->
            <!--                <landing-pages :landingPages="segment.landingPages" :handleSave="updateSegment.bind(this,segment)" />-->
            <!--            </template>-->
            <div v-if="errors" class="validate_error">
                <span v-for="error in errors">{{ error }}</span>
            </div>

        </section>

    </transition>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from "vuex";
    import {ModelSelect} from 'vue-search-select'

    export default {
        name: "segment",
        components: {ModelSelect},
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
            // showBucketModal (index) {
            //     let modal_id = 'modal_' + index
            //     console.log('showModal:', modal_id)
            //     this.$refs[modal_id][0].show(index)
            //     console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            // },
            handleChangeLp(lpId, item) {
                item.landingPageId = lpId
                debugger
            },
            getLpModify() {
                return this.getLandingPages.map(item => {
                    item.value = item.id
                    item.text = item.name + ' (' + item.id + ') '
                    return item
                })
            },
            getStatusList () {
                return [
                    {id: 0, name: 'Active'},
                    {id: 1, name: 'Inactive'},
                ]
            },
            getId (value) {
                return `${this.id}`
            },
            setElId (value) {
                return `${value}-${this.id}`
            },
            defineLpId(id) {
                return `lp-${id}`
            },
            getFieldName (field) {
                return this.getBucket.length > 0 && this.getBucket[0][field]
            },
            updateGroup(e, group) {
                console.log(e, group)
            },
            edit(id) {
                this.$router.push(`/segment/${id}`)
            },
            async saveLp(segment) {
                debugger
                let res = await this.$store.dispatch('segment/updateLandingPage', segment)
                if (res){
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Segment ID ${segment.id} ${segment.name} updated`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
                debugger
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

                        this.$store.dispatch('segments/deleteSegmentAction', id).then(res =>{
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
            blur: function (event) {
                return
                debugger
                let {relatedTarget, target} = event;
                if (
                    !relatedTarget ||
                    !relatedTarget.classList.contains("segment__menu-item")
                ) {
                    this.showMenu = false;
                    if (this.showMask && !target.classList.contains("segment__delete"))
                        this.toggleMask();
                }
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

    .segment.segment__draggable {
        cursor: grab;
        height: auto;
    }

    .segment.segment__draggable:hover {
        opacity: 0.9;
    }

    .segment__active, .segment__disabled {
        cursor: pointer;
        user-select: none;
    }

    span.segment__active:hover {
        opacity: 0.5;
        color: #36B8E1 !important;
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

    .segment__toggle-menu {
        top: 0;
        right: 0.5rem;
        position: absolute;
        background: none;
        transform: rotate(45deg);
        border: solid #e1d4e1;
        border-radius: 3px;
        border-width: 0 3px 3px 0;

        &:focus,
        &:hover {
            outline: none;
            border-color: #888;
        }

        & + .segment__menu.open {
            opacity: 1;
            width: 12rem;
            height: auto;

            .segment__menu-item {
                display: block;

                &:active {
                    background: #6dcbfa;
                }
            }
        }
    }

    $menu-time: 0.3s;

    .segment__menu {
        margin: 0;
        padding: 0;
        top: 2rem;
        right: 1rem;
        width: 0;
        height: 0;
        opacity: 0;
        z-index: 2;
        overflow: hidden;
        list-style: none;
        position: absolute;
        background: white;
        transition: height $menu-time ease-in, width $menu-time ease-in,
        opacity $menu-time ease-in-out;
        border: solid #e1d4e1 2px;
        box-shadow: 2px 3px 5px #333;

        button {
            width: 100%;
            border: none;
            display: none;
            background: white;
            white-space: nowrap;

            &:hover,
            &:focus {
                outline: none;
                background: #6dcbfa;
            }
        }
    }

</style>
