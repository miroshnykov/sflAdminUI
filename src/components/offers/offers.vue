<template>
    <div id="campaigns">
        <menunav></menunav>
        <logo></logo>
        <h1>Manage Custom Offers</h1>

        <div class="segment-panel">
            <!-- <input type="text" class="search-box"  placeholder="Search offers..."/> -->
            <b-button variant="primary" @click="this.addOffer">
                Create New Offer
            </b-button>

    <div class="offers">
        <v-client-table :data="getOffers" :columns="columns" :options="options">

            <div slot="offerId" slot-scope="props" class="text-center">
                <span class="offerId">{{ offer.id }}</span>
            </div>

            <div slot="offerName" slot-scope="props">

              <span @click="edit(row)">
                  <span class="segment-name">{{ offer.name }}</span>
              </span>

                <button @click="setEditing(true)" v-if="!isEditing()" class="btn btn-link"
                        v-b-tooltip.hover.right="'Quick edit'">
                    <i class="far fa-pencil"></i>
                </button>
                <span v-else>
                        <input type="text" v-model="row.name" maxlength="25" class="quickedit">
                        <button type="button" class="btn btn-info btn-xs quickedit-update"
                                @click="update(row.name);setEditing(false); uOfferName(row)"><i
                                class="fas fa-check"></i></button>
                        <button type="button" class="btn btn-default btn-xs quickedit-cancel"
                                @click="revertValue(); setEditing(false)"><i class="fas fa-ban"></i></button>
                </span>
                
                <!-- <b-form-text id="spent-values">
                    Updated {{timeSince_(row.dateUpdated)}} ago
                </b-form-text> -->
            </div>

            <!-- <div slot="payin" slot-scope="props">
                <span class="budget-daily">${{props.row.payin}}</span>
                <b-form-text id="currency">
                    CAD
                </b-form-text>
            </div>

            <div slot="payout" slot-scope="props">
                <span class="budget-daily">${{props.row.payout}}</span>
                <b-form-text id="currency">
                    CAD
                </b-form-text>
            </div> -->

            <!-- <div slot="landingPage" slot-scope="props">
              <span class="landing-page-box">
                <span class="landing-page-name" v-if="props.row.landingPage.length<=14" @click="copyText(props.row.landingPage)">
                    {{ props.row.landingPage }}
                </span>
                <span class="landing-page-name" v-if="props.row.landingPage.length>=15" @click="copyText(props.row.landingPage)" v-b-tooltip.hover.html.right="props.row.landingPage">
                    {{ props.row.landingPage.substring(0,15)+"..." }}
                </span>
              </span>
                <button class="btn btn-link" @click="copyText(props.row.landingPage)"
                        v-b-tooltip.hover.right="'Copy URL to Clipboard'">
                    <i class="far fa-copy"></i>
                </button>
            </div> -->

            <!-- <div slot="child_row" slot-scope="props">
                <div class="segment-child animated fadeIn">

                </div>
            </div> -->

            <!-- <div slot="status" slot-scope="props">
                <div v-if="props.row.status == 'inactive'">
                <div class="status inactive">{{props.row.status}}</div>
                </div>
                <div v-else-if="props.row.status == 'active'">
                <div class="status active">{{props.row.status}}</div>
                </div>
            </div> -->

            <div slot="actions" slot-scope="props">
                <button
                        class="btn btn-link"
                        v-b-tooltip.hover.top="'Edit Offer'"
                        @click="edit(props.row)"
                >
                    <i class="fas fa-pencil"></i>
                </button>
            </div>

        </v-client-table>
    </div>

            <!-- <div class="offers">
                <tr scope="row" v-for="offer in getOffers">
                    <td>{{ offer.id }}</td>
                    <td>{{ offer.name }}</td>
                </tr>
            </div> -->
        </div>


    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
    import logo from '../logo.vue'
    import menunav from '../menunav.vue'
    import {formatData, timeSince} from '../../helpers'
    // import {formatData, timeSince} from '../helpers'
    import {getCookie} from '../../helpers'

    let tableColumnsLog = [
        'offerId',
        'offerName',
        'advertiser',
        'vertical',
        'payin',
        'payout',
        'landingPage',
        'status',
        'actions',
    ]

    export default {
        components: {logo, menunav},
        computed: {
            ...mapGetters('offers', ['getOffers'])
        },
        async mounted() {

            let token = getCookie('accessToken')
            if (token) {
                this.saveOffersStore()
            }

        },
        methods: {
            ...mapActions("offers", ["saveOffersStore"]),
            async uOfferName(data) {

                let res = await this.$store.dispatch('offer/updOfferName', data)

                if (res.id) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Offer name has been updated',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
            edit(data) {
                this.$router.push(`/offer/${data.id}`)
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
            timeSince_(data) {
                return timeSince(new Date(Number(data)))
            },
            formatData_(data) {
                return formatData(data * 1000)
            },
            addOffer() {
                this.$swal.fire({
                    title: 'Add Offer',
                    html:
                        `<label for="swal-input1"></label>
                        <input id="swal-input1" class="swal2-input" placeholder="Offer Name" maxlength="25"
                             onblur="
                                 if(this.value === ''){
                                    alert('Enter offer name ')
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
                                text: 'Please name your offer.',
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
                        let offerData = {}
                        offerData.name = result.value[0]
                        let self = this
                        self.offerName = offerData.name
                        this.$store.dispatch('offer/addOffer', offerData).then((res) => {
                            let newOfferId = res.id
                            self.$router.push(`/offer/${newOfferId}`)
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
        },
        data() {
            return {
                isModalVisible: false,
                offerName: '',
                eventData: [],
                tableData: [],
                editableColumns: ['offerName', 'status'],
                columns: tableColumnsLog,
                countOfRecords: 0,
                options: {
                    // columnsDropdown: true,
                    headings: {
                        offerId: 'ID',
                        offerName: 'Offer Name',
                        advertiser: 'Advertiser',
                        vertical: 'Vertical',
                        payin: 'Pay-in',
                        payin: 'Pay-out',
                        landingPage: 'Default LP',
                        status: 'Status',
                    },
                    // editableColumns: ['offerName'],
                    // sortable: tableColumnsLog,
                    // sortable: [''],
                    sortable: ['offerId','offerName','advertiser','vertical','status'],
                    sortIcon: {
                        base: 'fa fad',
                        up: 'fa-sort-up',
                        down: 'fa-sort-down',
                        is: 'fa-sort'
                    },
                    filterable: tableColumnsLog,
                    highlightMatches: true,
                    resizableColumns: false,
                    showChildRowToggler: false,
                    perPage: 10,
                    perPageValues: [5, 10, 25, 100],
                    pagination: {
                        nav: 'fixed',
                        edge: true,
                    },
                    texts: {
                        count: "Showing {from} to {to} of {count} offers|Showing {count} offers|Showing 1 offer",
                        first: "First",
                        last: "Last",
                        filter: "Filter:",
                        filterPlaceholder: "Search...",
                        limit: "Show per page",
                        page: "Page:",
                        noResults: "No matching offers",
                        filterBy: "Filter by {column}",
                        loading: "Loading...",
                        defaultOption: "Select {column}"
                    },
                },
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 290px
</style>