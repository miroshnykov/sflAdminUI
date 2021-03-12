<template>
    <div id="import">
        <menunav></menunav>
<!--        <h1>Manage Uploads</h1>-->
        <div id="settings">

            <b-row class="settings">
                <b-col cols="10">
                    <h1>Upload Affiliate Lists</h1>
                </b-col>
                <b-col cols="2">
                    <div class="action-buttons">
                        <b-button variant="link"
                                  v-b-tooltip.hover.right="'close'">
                            <i class="far fa-times"></i>
                        </b-button>
                    </div>
                </b-col>

                <b-col cols="12">
                    <p>Upload your own file (CSV format).</p>
                    <p>Account managers, advertisers, offers, affiliates, campaigns  .</p>
                </b-col>

                <b-col cols="12">
                    <p><span class="note">Drag &amp; Drop or Browse to upload</span></p>

                    <b-form-file v-model="file" ref="file-input" multiple accept=".csv">
                        <template slot="file-name" slot-scope="{ names }">
                            <b-badge variant="dark">{{ names[0] }}</b-badge>
                            <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                                + {{ names.length - 1 }} More files
                            </b-badge>
                        </template>
                    </b-form-file>

                </b-col>

            </b-row>

            <transition name="expand-down">

                <div class="filter__controls">
                    <span class="space"></span>

                    <b-row class="settings-actions">
                        <b-col cols="6">
                            <b-button variant="secondary" class="btn-add-line" @click="clearFiles">
                                <i class="fas fa-undo" data-fa-transform="shrink-2"></i> Clear
                            </b-button>
                        </b-col>
                        <b-col cols="6">
<!--                            <b-button variant="secondary" class="btn-save" @click="uploadFiles">-->
<!--                                <i class="fas fa-undo" data-fa-transform="shrink-2"></i> Upload-->
<!--                            </b-button>-->
                            <b-button class="btn-add-line" @click="this.uploadFiles">
                                <i class="fas fa-plus" data-fa-transform="shrink-2"></i> Upload
                            </b-button>
                        </b-col>
                    </b-row>
                </div>

            </transition>
        </div>


    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
    import menunav from './menunav.vue'
    import {formatData, timeSince} from './../helpers'

    export default {
        components: {menunav},
        computed: {
            ...mapGetters('offers', ['getOffers'])
        },
        async mounted() {


        },
        methods: {
            ...mapMutations('offers', ['delOffer']),
            ...mapActions("offers", ["saveOffersStore"]),
            clearFiles() {
                this.$refs['file-input'].reset()
            },
            async parse(file) {
                const reader = new FileReader();
                reader.readAsText(file);
                const result = await new Promise((resolve, reject) => {
                    reader.onload = function (event) {
                        resolve(reader.result)
                    }
                })
                console.log(result)
                return result
            },
            async processFile(file) {
                try {
                    let contentBuffer = await this.parse(file[0]);
                    return contentBuffer
                } catch (err) {
                    console.log(err);
                }
            },
            async uploadFiles() {
                let dataFile1 = await this.processFile(this.file)
                let dataFile = {}
                dataFile.dataFile = dataFile1

                // let res = await this.$store.dispatch('upload/saveFileData', dataFile)
                // debugger
                this.$store.dispatch('upload/saveFileData', dataFile).then(result => {
                    let timerInterval
                    let timerMs = 1000
                    this.$swal.fire({
                        title: 'Processing...',
                        html: 'Finish after <b></b> milliseconds.',
                        timer: result.success && result.success.length * timerMs || 1000,
                        timerProgressBar: true,
                        onBeforeOpen: () => {
                            this.$swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = this.$swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = this.$swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        }
                    }).then(() => {
                        debugger
                        // result.success = false
                        // result.error = JSON.stringify(e)
                        // res.send(result)
                        try {
                            this.$swal.fire({
                                title: `<i class="far fa-check-circle fa-2x"></i><br>Upload Results`,
                                html:
                                    `<div class="popup-confirm">
                           <p>${result.type} added: ${result.success && result.insertRecordsCount || 0}</p>
                           <p>Total record: ${result.success && result.totalRecords || 0}</p>
                           <p>${result.errors && result.errors||''}</p>
                           </div>`,
                                confirmButtonColor: '#2ED47A',
                                showCancelButton: false,
                                confirmButtonText: 'Ok',
                                showLoaderOnConfirm: true,
                                backdrop: `rgba(0, 0, 0, 0.5)`,
                            }).then(() => {
                                this.$router.push('/import')
                                // location.reload()
                            })

                        } catch (e) {
                            console.log(e)
                        }
                    })

                })
            },
        },
        data() {
            return {
                isModalVisible: false,
                file: null
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 290px
</style>