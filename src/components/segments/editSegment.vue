<template>
    <div id="edit-segment">
        <topbar></topbar>
        <menunav></menunav>

        <b-row class="text-center">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           :value="id"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="6">
                <div class="condition__controls">
                    <label>Segment Name</label>
                    <input type="text"
                           placeholder="ex: My First Segment"
                           class="condition__matches campaign custom-input"
                    >
                    <b-form-text id="lastModified">
                        Last Modified: 11-24-2020 at 10:41:39 AM
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status</label>
                    <select
                            class="custom-select"
                    >
                        <option
                                id="filterType"
                        >Active
                        </option>
                        <option
                                id="filterType"
                        >Inactive
                        </option>
                    </select>
                </div>
            </b-col>
            <!-- <b-col cols="3">
                <div class="condition__controls">
                    <label>Last Modified</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           disabled
                    >
                </div>
            </b-col> -->
        </b-row>

        <hr>

                    <!-- <b-row align-v="center">
                        <b-col cols="1">
                            <div class="condition__controls">
                                <label>Include</label>
                                <b-form-checkbox switch size="lg"> </b-form-checkbox>
                            </div>
                        </b-col>
                        <b-col cols="3">
                            <div class="condition__controls">
                                <label>Dimension Filter</label>
                                <input type="text"
                                    placeholder="ex: My First Segment"
                                    class="condition__matches campaign custom-input"
                                >
                            </div>
                        </b-col>
                        <b-col cols="3">
                            <div class="condition__controls">
                                <label>Product ID &amp; Name</label>
                                <input type="text"
                                    placeholder=""
                                    class="condition__matches campaign custom-input"
                                >
                            </div>
                        </b-col>
                        <b-col cols="1">
                            <div class="condition__controls">
                                <label for="label-platform">Condition</label>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn btn-secondary-">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                    > OR
                                  </label>

                                  <label class="btn btn-secondary-">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                    > AND
                                  </label>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="1">
                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          class="remove_condition"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete Rule'"
                                  >
                                    <i class="far fa-trash-alt"></i>
                                  </button>
                            </div>
                        </b-col>
                    </b-row> -->

        <!-- Replace old ui with new
        <ul class="segment-info">
            <li>Segment ID: <b>{{id}}</b></li>
            <li>Segment Name: <b>{{JSON.stringify(this.$store.segments)}}</b></li>
           <li>Segment Rules Count: <b>{{this.segmentRuleCount}}</b></li>
        </ul> -->

        <conditions :segmentFilter="this.getSegmentFilter"/>

        <hr>

        <b-row class="text-center">
            <b-col cols="7">
                <h2>Landing Pages</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="secondary" class="btn-add-line" @click="addLandingPage">
                    <i class="fas fa-plus"></i> Add LP
                </b-button>
            </b-col>
        </b-row>

        <b-row class="text-center">
            <b-col cols="9">
                <div class="child-table">

                    <table class="table table-striped child-row tableFixHead">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Landing Page URL</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tr scope="row">
                            <td>{{ id }}</td>
                            <td>Movies and TV</td>
                            <td>20 / 100</td>
                            <td>
                                
                            <!-- <div slot="landingPage" slot-scope="props"> -->
                            <div class="landingPage">
                            <span class="landing-page-box">
                                wwww.website.com
                                <!-- <span class="landing-page-name" v-if="props.row.landingPage.length<=14" @click="copyText(props.row.landingPage)">
                                    {{ props.row.landingPage }}
                                </span>
                                <span class="landing-page-name" v-if="props.row.landingPage.length>=15" @click="copyText(props.row.landingPage)" v-b-tooltip.hover.html.right="props.row.landingPage">
                                    {{ props.row.landingPage.substring(0,15)+"..." }}
                                </span> -->
                            </span>
                                <button class="btn btn-link" @click="copyText(props.row.landingPage)"
                                        v-b-tooltip.hover.right="'Copy URL to Clipboard'">
                                    <i class="far fa-copy"></i>
                                </button>
                                <!-- <b-form-text id="date">
                                    Clicks - Today: 96
                                </b-form-text> -->
                            </div>

                            </td>
                            <td>
                                
                            <!-- <div slot="status" slot-scope="props"> -->
                                <!-- <div v-if="props.row.status == 'inactive'">
                                <div class="status inactive">{{props.row.status}}</div>
                                </div> -->
                                <!-- <div v-else-if="props.row.status == 'active'"> -->
                                <div class="status active">Active</div>
                                <!-- </div> -->
                            <!-- </div> -->

                            </td>
                            <td>

                                <button
                                        class="btn btn-link"
                                        v-b-tooltip.hover.bottom="'Edit LP'"
                                        @click="showModal(id)"
                                >
                                    <i class="far fa-pencil"></i>
                                </button>
                                <!-- <BucketAffiliates :id="'modal_' + affiliate.id" :ref="'modal_' + affiliate.id"
                                                :affiliate="affiliate">
                                </BucketAffiliates> -->

                                <button
                                        class="btn btn-link btn-delete"
                                        v-b-tooltip.hover.bottom="'Remove LP'"
                                >
                                    <i class="far fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </table>

                </div>
            </b-col>
            <b-col cols="2">
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from '../logo.vue'
    import conditions from './conditions.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'

    export default {
        name: 'edit-segment',
        components: {logo, menunav, topbar, conditions},
        computed: {
            ...mapGetters('segments', ['getSegments']),
            ...mapGetters('segment', ['getSegmentFilter']),
        },
        segmentFilter: [],
        async mounted() {
            await this.$store.dispatch('segment/getSegmentConditions', this.id)
        },
        methods: {
            async addLandingPage() {
                this.$swal.fire({
                    title: 'Add Landing Page',
                    html:
                        `<label for="swal-input1"></label>
                        <input id="swal-input1" class="swal2-input" placeholder="Type and search..." maxlength="30">
                        <div class="row segment-popup">
                        <div class="col-md-6">
                    `,
                    confirmButtonColor: '#2ED47A',
                    cancelButtonColor: '#E3EEF4',
                    showCancelButton: true,
                    confirmButtonText: '<i class="fas fa-check"></i>',
                    cancelButtonText: '<i class="fas fa-times"></i>',
                    backdrop: `
                        rgba(0,0,123,0.2)
                    `,
                    preConfirm: () => {
                        if (document.getElementById('swal-input1').value
                        ) {
                            return [
                                document.getElementById('swal-input1').value
                            ]
                        } else {
                            this.$swal.fire({
                                title: 'Validation Error',
                                text: 'Please check landing page name.',
                            })
                            return
                        }

                    }

                }).then((result) => {
                    if (result.dismiss === "cancel") {
                        return
                    }

                    if (result.value[0]
                    ) {
                        let segmentData = {}
                        segmentData.name = result.value[0]
                        let self = this
                        self.name = segmentData.name
                        this.$store.dispatch('segments/createSegmentAction', segmentData).then(res => {
                            if (res.id) {

                                self.$swal.fire({
                                    type: 'success',
                                    position: 'top-end',
                                    title: `Segment ${self.name} has been created`,
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                this.$router.push(`/segment/${res.id}`)
                                // location.reload()

                            }
                        })
                    } else {
                        this.$swal.fire({
                            title: 'Missing information',
                            type: 'error',
                            text: 'Please name your segment and try again.',
                            confirmButtonColor: '#2ED47A',
                        })
                    }

                })
            },
            async copyText(landingPage) {
                try {
                    await navigator.clipboard.writeText(landingPage);
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Copied URL: \n ${landingPage} \n   to clipboard `,
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            },
            async addAffiliates () {
                let order = this.getBucketAffiliates.sort((a, b) => (Number(a.id) - Number(b.id)))
                let lastRecord = order[order.length - 1]
                let lastId = lastRecord && lastRecord.id || 0
                await this.addAffiliate()
                this.showBucketModal(lastId + 1)
            },
        },
        data() {
            return {
                id: Number(this.$route.params.id)
            };
        }
    };
</script>

<style lang="sass">
    .container
        margin-left: 300px
</style>