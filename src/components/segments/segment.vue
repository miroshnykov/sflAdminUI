<template>
    <transition name="fade">

        <section class="segment" :id="segment.id" :class="{segment__draggable: true}"
                 @change="updateGroup($event, group)">

            <b-row class="text-center" align-v="center">
                <b-col col lg="8">

                <h1 class="segment__name" :title="segment.name">
                    <span v-bind:title="getTitle(segment)" class="segment__active" @click="toggleState(segment)">➕</span>
                    {{segment.name}} <span class="segment-name-id">(ID: {{segment.id}})</span>
                    <!--                <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->
                    <!--                <span v-if="segment.isDefault" class="segment__default">(Default)</span>-->
                </h1>
                <!--@focus="focusMenu" @blur="blur"-->
                <button class="segment__toggle-menu"/>

                <!--            <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->

                </b-col>
                <b-col col lg="4">
                    <b-button variant="light" @click="edit(segment.id)" v-b-tooltip.hover.top="'Edit'" style="z-index:2">
                        <i class="far fa-edit" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <b-button variant="light" @click="delSegment(segment.id)" v-b-tooltip.hover.top="'Delete'" style="z-index:2">
                        <i class="far fa-trash-alt" data-fa-transform="shrink-1"></i>
                    </b-button>

                    <b-form-checkbox v-model="checked" name="check-button" switch></b-form-checkbox>
                </b-col>
            </b-row>

            <!-- <model-select
                    :options="getLpModify()"
                    @input="handleChangeLp($event, segment)"
                    :id="defineLpId(segment.id)"
                    :ref="defineLpId(segment.id)"
                    class="condition__country condition__matches custom-select "
            >
            </model-select> -->

<!--            :value="segment.landingPageId"-->
            <label v-if="segment.landingPageId">ID: {{segment.landingPageId}}</label>
<!--            <label for="label-lp">LP</label>-->


            <div v-if="segment.lp.length !== 0" class="child-table">


            <b-row class="text-center" align-v="center">
                <b-col col lg="6">
                    <span class="lp-label" style="text-align: left; float: left">Landing Pages</span>
                    <!-- <label class="segment-position">{{segment.position}}</label> -->
                </b-col>
                <b-col col lg="6">
                    <b-button variant="primary btn-sm" @click="saveLp(segment)">
                        <i class="far fa-file-plus" data-fa-transform="shrink-1"></i> New LP
                    </b-button>
                </b-col>
            </b-row>

                <table class="table table-striped child-row tableFixHead lp-table">
                    <!-- <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead> -->
                    <tr scope="row" v-for="lp in segment.lp">
                        <td>{{ lp.id }}</td>
                        <td>{{ lp.name }}</td>
                    </tr>
                </table>

                <b-badge variant="light"
                 v-b-popover.hover.bottom.html="popoverMethod"
                 title="ID: 1<br>
                 Weight: 20"
                 >
                    Landing-Page (<i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> 20)
                </b-badge>

                <b-badge variant="light"
                 v-b-popover.hover.bottom.html="popoverMethod"
                 title="ID: 1<br>
                 Weight: 20"
                 >
                    Example (<i class="far fa-weight-hanging" data-fa-transform="shrink-4"></i> 20)
                </b-badge>

                <br><br>
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
        props: {
            segment: Object
        },
        data() {
            return {
                errors: [],
                showMenu: false,
                showLandingPages: false,
                checked: false
            };
        },
        methods: {
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
            defineLpId(id) {
                return `lp-${id}`
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
        components: {ModelSelect},
    };
</script>

<style lang="scss">
    input.search-box {
        padding: 10px;
        border-radius: 4px;
        border: 0px solid transparent;
        height: 45px;
        width: 250px;
        // box-shadow: 0px 0px 3px 0px rgb(58 56 82 / 0.2);
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
    }

    .custom-switch {
        margin-left: 4.4rem;
        z-index: 1;
    }

    .segment {
        opacity: 1;
        margin: 1rem;
        // height: 80px;
        width: 350px;
        padding: 1rem;
        position: relative;
        border-radius: 7px;
        border: solid #2ED47A 2px;
        background: #fff;
        user-select: none;
    }

    .segment.segment__draggable {
        cursor: grab;
        height: auto;
        margin: 15px 10px 0px 0px;
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
