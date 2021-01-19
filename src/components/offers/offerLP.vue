<template>
    <div v-if="visible" class="modal-mask modal-transition">
        <div class="modal-container" style="min-width: 35vw;max-width: 35vw;max-height: 50vh;padding: 0px 30px 0px 30px">

            <div class="modal-body">
                <h1 class="title">Add Landing Page</h1>

                <b-row class="text-center">
                    <b-col cols="6">
                        <div class="condition__controls condition-line">
                            <label class="text-center">LP Name</label>
                            <input type="text"
                                   min="0" max="100"
                                   class="condition__matches custom-input text-center"
                                   :id="defineId(`offerLpName`)"
                                   @change="updateLP($event,`name`)"
                                   maxlength="20"
                            >
                        </div>
                    </b-col>
                    <b-col cols="6">
                        <div class="condition__controls condition-line">
                            <label class="text-center">LP URL</label>
                            <input type="text"
                                   min="0" max="100"
                                   class="condition__matches custom-input text-center"
                                   :id="defineId(`offerLpUrl`)"
                                   @change="updateLP($event,`url`)"
                                   maxlength="30"
                            >
                        </div>
                    </b-col>

                </b-row>

            </div>

            <b-row class="text-center">
                <b-col cols="12">
                    <button type="button" class="btn btn-cancel btn-secondary pull-right" @click="close">Cancel</button>
                    <button type="button" class="btn btn-savebucket btn-primary pull-left" @click="saveLp()">
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
                name: '',
                url: '',
                id: 0,
            }
        },
        props: ['offerId'],
        components: {ModelSelect},
        computed: {
            ...mapGetters('lp', ['getLandingPages'])
        },
        methods: {
            updateLP(event, field) {
                this[field] = event.target.value
            },
            getClassLp(id) {
                return `condition__country condition__matches custom-select lpInput-${id}`
            },
            defineId(name, id) {
                return `${name}-${id}`
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
            show(offerId) {
                this.visible = true
            },
            async saveLp() {

                let obj = {}
                obj.name = this.name
                obj.url = this.url
                obj.offerId = this.offerId
                let res = await this.$store.dispatch('lpOffers/createLpOfferDb', obj)
                if (res.id) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Lp created`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
                    this.$swal.fire({
                        title: 'Lp save errors',
                        type: 'error',
                        text: 'Please check backend errors ',
                        confirmButtonColor: '#2ED47A',
                    })
                }
                this.visible = false
            },
            close() {
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
</style>
