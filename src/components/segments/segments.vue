<template>
    <div id="campaigns">
        <menunav></menunav>
        <logo></logo>
        <h1>Manage Blocked Segments</h1>

        <div class="segment-panel">
            <input type="text" class="search-box" @input="searchUpdate" placeholder="Search segments..."/>

            <b-button variant="primary" @click="this.addSegment">
                Create Segment
            </b-button>
            <b-button variant="success margin-right-10" @click="this.saveOrder">
                Save order
            </b-button>
            <!--            <button class="button&#45;&#45;fill enable-all" @click="showModal(true)">Enable all</button>-->
            <!--            <button class="button&#45;&#45;fill disable-all" @click="showModal(false)">Disable all</button>-->
            <div class="segments">
                <!--                 :options="{draggable: '.segment__draggable'}"-->
                <!--                @choose="onUnpublishedChange"-->
                <draggable
                        v-bind="{draggable: '.segment__draggable'}"
                        @end="onEnd"
                >
                    <segment v-for="segment in segments" :segment="segment" :key="segment.id"/>
                </draggable>
            </div>
        </div>


    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
    import logo from '../logo.vue'
    import menunav from '../menunav.vue'
    import {formatData, timeSince} from '../../helpers'
    import Segment from "./segment";
    import draggable from "vuedraggable";
    import {getCookie} from '../../helpers'

    export default {
        // mounted() {
        //     this.getCampaigns()
        // },
        components: {logo, menunav, Segment, draggable},
        computed: {
            ...mapState('segments', ['segments']),
            ...mapGetters('segments', ['getSegments'])
        },
        async mounted() {
            let token = getCookie('accessToken')
            if (token) {
                await this.saveSegmentsStore()
            }

        },
        methods: {
            ...mapMutations('segments', ['reOrdering', 'searchFilter']),
            ...mapActions("segments", ["saveSegmentsStore"]),
            searchUpdate(event) {
                let searchText = event.target.value
                this.searchFilter(searchText)
            },
            start(e) {
                console.log('start:', e)
            },
            onUnpublishedChange(e, group) {
                console.log(e, group)
            },
            // edit(id) {
            //     debugger
            //     this.$router.push(`/segment/${.id}`)
            // },
            async addSegment() {
                this.$swal.fire({
                    title: 'Add Segment',
                    html:
                        `<label for="swal-input1"></label>
                        <input id="swal-input1" class="swal2-input" placeholder="Campaign Name" maxlength="25"
                             onblur="
                                 if(this.value === ''){
                                    alert('Enter campaign name ')
                                    document.querySelector('#swal-input1').style.background = '#f38282'
                                    document.querySelector('.swal2-confirm').style.display = 'none'
                                    return false
                                } else {
                                    document.querySelector('.swal2-confirm').style.display = 'inline-block'
                                    document.querySelector('#swal-input1').style.background = 'white'
                                }
                            "
                        >
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
                                text: 'Please name your segment.',
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
            async onEnd(event) {
                console.log(`onEnd:  oldDraggableIndex:${event.oldDraggableIndex},  event.newDraggableIndex:${event.newDraggableIndex}`)
                console.log(`itemId :${event.item.id}`)
                // let obj = {}
                // obj.oldPosition = event.oldDraggableIndex
                // obj.newPosition = event.newDraggableIndex
                // await this.$store.dispatch('segments/reOrderingAction', obj)
                // this.reOrdering(obj)
                // return (evt.draggedContext.element.name!=='apple');
            },
            createSegment() {
                alert('create new seqment')
            },
            async saveOrder() {
                let el = document.querySelectorAll(".segment__draggable")

                let toSend = []
                let i
                for (i = 0; i < el.length; ++i) {
                    // console.log(`count:${i}, ID:${el[i].id}`)
                    toSend.push({id: el[i].id, position: i})
                }

                console.log('to send:', toSend)
                let toSendFormat = JSON.stringify(toSend).replace(/['"]+/g, '')
                let res = await this.$store.dispatch('segments/saveOrderingAction', toSendFormat)
                if (res && res.length !== 0) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Segments save',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    location.reload()
                } else {
                    this.$swal.fire({
                        title: 'Segment save errors',
                        type: 'error',
                        text: 'Please check backend errors ',
                        confirmButtonColor: '#2ED47A',
                    })
                }
            },
            // async getCampaigns() {
            //
            //     try {
            //         this.tableData = await this.campaigns
            //
            //     } catch (e) {
            //         console.log(e)
            //     }
            //
            // },
        },
        data() {
            return {
                segmentName: '',
                isModalVisible: false,
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 300px
</style>