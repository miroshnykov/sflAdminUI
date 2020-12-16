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
                           :value="getSegmentStatus[0].name"
                           :id="defineSegmentNameId(id)"
                    >
                    <b-form-text id="lastModified">
                        Last Modified:  {{ formatDate_(new Date(getSegmentStatus[0].dateUpdated * 1000)) }}
                    </b-form-text>
                </div>
            </b-col>

            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status</label>
                    <select
                            :id="defineStatusId(id)"
                            class="condition__dimension-name condition__matches custom-select"
                            @change="handleChangeStatus($event, item)"
                    >
                        <option
                                id="filterType"
                                v-for="{id, name} in getStatusList()"
                                :value="id"
                                :selected="capitalizeFirstLetter(name) === capitalizeFirstLetter(getSegmentStatus[0].status)"
                                :key="id"
                        >{{name}}
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


        <conditions :segmentFilter="this.getSegmentFilter"/>

        <hr>


    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from '../logo.vue'
    import conditions from './conditions.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'
    import {formatData} from '../../helpers'

    export default {
        name: 'edit-segment',
        components: {logo, menunav, topbar, conditions},
        computed: {
            ...mapGetters('segments', ['getSegments']),
            ...mapGetters('segment', ['getSegmentFilter', 'getSegmentStatus']),
        },
        segmentFilter: [],
        async mounted() {
            await this.$store.dispatch('segment/getSegmentConditions', this.id)
            await this.$store.dispatch('segment/saveSegmentStatusStore', this.id)
        },
        methods: {
            formatDate_(date) {
                return formatData(date)
            },
            defineStatusId(id) {
                return `status-${id}`
            },
            defineSegmentNameId(id) {
                return `segmentName-${id}`
            },
            capitalizeFirstLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            },
            getStatusList() {
                return [
                    {id: 0, name: 'Active'},
                    {id: 1, name: 'Inactive'}
                ]
            },
            handleChangeStatus(event, item) {

            },
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
        margin-left: 290px
</style>