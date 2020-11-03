<template>
    <div id="campaigns">
        <menunav></menunav>
        <logo></logo>
        <h1>Manage Blocked Segments</h1>

        <div class="segment-panel">
            <b-button variant="primary" @click="this.createSegment">
                Create Segment
            </b-button>
            <b-button variant="primary" @click="this.saveOrder">
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
    import logo from './logo.vue'
    import menunav from './menunav.vue'
    import {formatData, timeSince} from '../helpers'
    import Segment from "./segment";
    import draggable from "vuedraggable";
    import {getCookie} from '../helpers'

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
            if (token){
                await this.saveSegmentsStore()
            }

        },
        methods: {
            ...mapMutations('segments', ['reOrdering']),
            ...mapActions("segments", ["saveSegmentsStore"]),
            formatData_(data) {
                return formatData(data * 1000)
            },
            start(e) {
                console.log('start:', e)
            },
            onUnpublishedChange(e, group) {
                console.log(e, group)
                debugger
            },
            edit(data) {
                this.$router.push(`/segment/${data.id}`)
            },
            async onEnd(event) {
                console.log(`onEnd:  oldDraggableIndex:${event.oldDraggableIndex},  event.newDraggableIndex:${event.newDraggableIndex}`)

                let obj = {}
                obj.oldPosition = event.oldDraggableIndex
                obj.newPosition = event.newDraggableIndex
                await this.$store.dispatch('segments/reOrderingAction', obj)
                // this.reOrdering(obj)
                // return (evt.draggedContext.element.name!=='apple');
            },
            createSegment() {
                alert('create new seqment')
            },
            async saveOrder() {
                let res = await this.$store.dispatch('segments/saveOrderingAction', this)
                if (res && res.length !== 0) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Segments save',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    location.reload()
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
                countOfRecords: 0
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 300px

        .segment__draggable
            background-color: #c5e7c4
        .segments > div
            display: grid
            grid-row-gap: 1rem
            justify-items: center
            grid-template-columns: repeat(4, 1fr)


</style>