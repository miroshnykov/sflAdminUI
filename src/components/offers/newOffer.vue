<template>
    <div id="create-offer">
        <topbar></topbar>
        <menunav></menunav>

        <h1>Create New Offer</h1>

        <b-row class="text-center">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           placeholder="1"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Advertiser</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="advertiserType">FFM Online</option>

                    </select>
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Vertical</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="verticalType">Sweeps</option>
                        <option id="verticalType">Movies</option>
                        <option id="verticalType">TV</option>
                        <option id="verticalType">Books</option>
                    </select>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status Type</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="statusType">Public</option>
                        <option id="statusType">Private</option>
                        <option id="statusType">Apply To Run</option>
                        <option id="statusType">Inactive</option>

                    </select>
                </div>
            </b-col>

            <b-col cols="2">
            </b-col>

            <b-col cols="3">
                <div class="campaign-block condition__controls">
                    <label for="label-platform">Conversion Flow Type</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPI
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPA
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPL
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPC
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > CPM
                        </label>
                        <label class="btn btn-secondary-">
                        <input
                                type="checkbox"
                                autocomplete="off"
                        > Hybrid/Multistep
                        </label>
                    </div>
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="2">
                <h2>Custom Pay-in/Pay-out</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="light" class="btn-add-line" v-b-modal.modal-custom-payin-payout>
                    <i class="far fa-cog"></i> Customize
                </b-button>

                <b-modal id="modal-custom-payin-payout">
                    <h1>Custom Pay-in/Pay-out</h1>

                <b-row class="text-center">
                    <b-col cols="3">
                        <div class="condition__controls">
                            <label>Base Pay-in</label>
                            <i class="far fa-dollar-sign" style="position: relative;margin-right:5px"></i>
                            <input type="number"
                                step=1
                                placeholder="10"
                                min="1" max="1000"
                                style="width:75%"
                                class="condition__matches budgetTotal custom-input"
                                pattern="^\d+(?:\.\d{1,2})?$"
                                onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                            ">
                        </div>
                    </b-col>
                    <b-col cols="3">
                        <div class="condition__controls">
                            <label>Base Pay-out</label>
                            <i class="far fa-dollar-sign" style="position: relative;margin-right:5px"></i>
                            <input type="number"
                                step=1
                                placeholder="10"
                                min="1" max="1000"
                                style="width:75%"
                                class="condition__matches budgetTotal custom-input"
                                pattern="^\d+(?:\.\d{1,2})?$"
                                onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                            ">
                        </div>
                    </b-col>
                </b-row>

                    <table class="table table-striped child-row tableFixHead lp-table">
                        <thead>
                        <tr scope="row">
                            <th scope="col">GEO</th>
                            <th scope="col">Pay-in</th>
                            <th scope="col">Pay-out</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tr scope="row">
                            <td class="GEO" style="width: 140px">(UK) United King...</td>
                            <td class="payin" style="width: 140px">
                                <input type="number"
                                    step=1
                                    placeholder="10"
                                    min="1" max="1000"
                                    class="condition__matches payIn custom-input"
                                    pattern="^\d+(?:\.\d{1,2})?$"
                                    onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                ">
                            </td>
                            <td class="payout" style="width: 140px">
                                <input type="number"
                                    step=1
                                    placeholder="10"
                                    min="1" max="1000"
                                    class="condition__matches payOut custom-input"
                                    pattern="^\d+(?:\.\d{1,2})?$"
                                    onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                ">
                            </td>
                            <td class="actions" style="width: 120px"><i class="far fa-trash"></i></td>
                        </tr>
                        <tr scope="row">
                            <td><b-button variant="light" class="btn-add-line" style="float:left;" @click="">
                                <i class="far fa-plus"></i> Add...
                                </b-button>
                            </td> 
                        </tr>
                    </table>
                    
                </b-modal>
                
            </b-col>
            <b-col cols="5">
            </b-col>

            <b-col cols="4">
                <div class="condition__controls">
                    <label>Offer Name</label>
                    <input type="text"
                           placeholder="ex: iPhone 11"
                           class="condition__matches campaign custom-input"
                    >
                </div>
            </b-col>
            <b-col cols="1">
                <div class="condition__controls">
                    <label>Pay-in</label>
                    <input type="number"
                           step=1
                           placeholder="10"
                           min="1" max="1000"
                           class="condition__matches budgetTotal custom-input"
                           pattern="^\d+(?:\.\d{1,2})?$"
                           onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                    ">
                </div>
            </b-col>
            <b-col cols="1">
                <div class="condition__controls">
                    <label>Pay-out</label>
                    <input type="number"
                           step=1
                           placeholder="10"
                           min="1" max="1000"
                           class="condition__matches budgetTotal custom-input"
                           pattern="^\d+(?:\.\d{1,2})?$"
                           onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                    ">
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="12">
                <h2>Restrictions</h2>
            </b-col>

            <b-col cols="3">
                <div class="condition__controls"
                    v-b-popover.hover.focus.bottom.html="'Armenia'"
                    title="List of Allowed and Banned Countries"
                >
                    <label class="pull-left">GEO Settings</label>
                    <b-button variant="light" class="btn-add-line pull-right" v-b-modal.modal-restrictions>
                        <i class="far fa-cog"></i> Customize
                    </b-button>

                    <b-modal id="modal-restrictions">
                        <h1>Custom GEO Settings</h1>
                        <input type="text" class="search-box" placeholder="Type country..."/>

                        <div class="table-geo">
                            <b-col cols="6" style="float: left">
                                <p><i class="far fa-check-circle green"></i> Andorra (AD)</p>
                                <p><i class="far fa-check-circle green"></i> Afghanistan (AF)</p>
                                <p><i class="far fa-ban red"></i> Antigua and Barbuda (AG)</p>
                                <p><i class="far fa-check-circle green"></i> Albania (AL) </p>
                                <p><i class="far fa-ban red"></i> Armenia (AM)</p>
                            </b-col>
                            <b-col cols="6" style="float: left">
                                <p><i class="far fa-check-circle green"></i> Asia/Pacific Region (AP)</p>
                                <p><i class="far fa-ban red"></i> Antarctica (AQ)</p>
                                <p><i class="far fa-ban red"></i> Argentina (AR)</p>
                                <p><i class="far fa-check-circle green"></i> American Samoa (AS)</p>
                                <p><i class="far fa-check-circle green"></i> Austria (AT)</p>
                            </b-col>
                        </div>

                        <a class="btn-link" href="">Allow All  /  Ban All</a>

                        <div class="condition__controls">
                            <label>Default Redirect</label>
                            <input type="text"
                                placeholder="Offer 77 - Hyuna, iPhone 11"
                                class="condition__matches campaign custom-input"
                                disabled
                            >
                        </div>

                        <b-form-text>* Default redirect LP will be used for banned countries</b-form-text>
                        
                    </b-modal>

                    <input type="text"
                           class="condition__matches campaign custom-input"
                           value="Custom (hover for info)"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label class="pull-left">Caps</label>

                    <b-button variant="light" class="btn-add-line pull-right" v-b-modal.modal-caps>
                        <i class="far fa-cog"></i> Customize
                    </b-button>

                    <b-modal id="modal-caps">
                        <h1>Caps</h1>

                        <h2>Clicks</h2>

                        <b-row class="clicks-amount text-center">
                            <b-col cols="3">
                                <div class="condition__controls">
                                    <label>Amount</label>
                                    <input type="number"
                                        step=1
                                        placeholder="1000"
                                        min="1" max="99999"
                                        class="condition__matches budgetTotal custom-input"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">
                                </div>
                            </b-col>
                            <b-col cols="5">
                                <div class="condition__controls">
                                    <label for="label-period">Period</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Day
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Week
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Month
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="4">
                                <div class="condition__controls">
                                    <label>&nbsp;</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Custom
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > 10
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>

                        <b-row class="clicks-redirect text-center" style="margin-top: -20px">
                            <b-col cols="4">
                                <div class="condition__controls">
                                    <label for="label-period">Redirect</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Default
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Custom
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="8">
                                <div class="condition__controls">
                                    <label>&nbsp;</label>
                                    <input type="text"
                                        placeholder="Offer 55 - FFM, iPhone 11"
                                        class="condition__matches campaign custom-input"
                                        disabled
                                    >
                                </div>
                            </b-col>
                        </b-row>

                        <hr>
                        <h2>Sales</h2>
                        
                        <b-row class="clicks-amount text-center">
                            <b-col cols="3">
                                <div class="condition__controls">
                                    <label>Amount</label>
                                    <input type="number"
                                        step=1
                                        placeholder="1000"
                                        min="1" max="99999"
                                        class="condition__matches budgetTotal custom-input"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                                    ">
                                </div>
                            </b-col>
                            <b-col cols="5">
                                <div class="condition__controls">
                                    <label for="label-period">Period</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Day
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Week
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Month
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="4">
                                <div class="condition__controls">
                                    <label>&nbsp;</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Custom
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > 10
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>

                        <b-row class="clicks-redirect text-center" style="margin-top: -20px">
                            <b-col cols="4">
                                <div class="condition__controls">
                                    <label for="label-period">Redirect</label>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Default
                                        </label>
                                        <label class="btn btn-secondary-">
                                        <input
                                                type="checkbox"
                                                autocomplete="off"
                                        > Custom
                                        </label>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="8">
                                <div class="condition__controls">
                                    <label>&nbsp;</label>
                                    <input type="text"
                                        placeholder="Offer 884 - Gotzha: Global redirect, iPhon..."
                                        class="condition__matches campaign custom-input"
                                    >
                                </div>
                            </b-col>
                        </b-row>
                    </b-modal>

                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="capControl">No Caps</option>
                        <option id="capControl">Capped</option>
                    </select>
                </div>
            </b-col>
        </b-row>

        <hr>

        <b-row class="text-center">
            <b-col cols="2">
                <h2>Default Settings</h2>
            </b-col>
            <b-col cols="2">
                <b-button variant="light" class="btn-add-line" v-b-modal.modal-default-settings>
                    <i class="far fa-cog"></i> Customize
                </b-button>

                <b-modal id="modal-default-settings">
                    <h1>Custom LPs per GEO</h1>
                    <table class="table table-striped child-row tableFixHead lp-table">
                        <thead>
                        <tr scope="row">
                            <th scope="col">GEO</th>
                            <th scope="col">Landing Page</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tr scope="row">
                            <td>(UK) United King...</td>
                            <td><select class="condition__LP condition__matches custom-select">
                                    <option id="LP">- Default -</option>
                                    <option id="LP">1014 - www.ffm1.com/signup</option>
                                    <option id="LP">1015 - www.ffm1.com/signup</option>
                                    <hr>
                                    <option id="add-LP">+ Add Landing Page...</option>
                                </select>
                            </td>
                            <td><i class="far fa-trash"></i></td>
                        </tr>
                        <tr scope="row">
                            <td>(FR) France</td>
                            <td><select class="condition__LP condition__matches custom-select">
                                    <option id="LP">- Default -</option>
                                    <option id="LP">1014 - www.ffm1.com/signup</option>
                                    <option id="LP">1015 - www.ffm1.com/signup</option>
                                    <hr>
                                    <option id="add-LP">+ Add Landing Page...</option>
                                </select>
                            </td>
                            <td><i class="far fa-trash"></i></td>
                        </tr>
                        <tr scope="row">
                            <td><b-button variant="light" class="btn-add-line" @click="">
                                <i class="far fa-plus"></i> Add GEO
                                </b-button>
                            </td>
                        </tr>
                    </table>
                    
                </b-modal>

            </b-col>
            <b-col cols="8">
            </b-col>

            <b-col cols="3">
                <div class="condition__controls">
                    <label>Default LP</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="defaultLP">1015 (www.ffmoffers.co...)</option>
                        <option id="defaultLP">1018 (www.ffmoffers.co...)</option>
                    </select>
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Default Redirect</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <option id="defaultRedirect">Offer 77 - Hyuna, iPhone 11</option>
                        <option id="defaultRedirect">Offer 92 - Hyuna, Samsung Galaxy S9</option>
                    </select>
                </div>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from '../logo.vue'
    import topbar from '../topbar.vue'
    import menunav from '../menunav.vue'
    import {formatData} from '../../helpers'
    // import {formatData, timeSince} from '../../helpers'

    export default {
        name: 'newOffer',
        components: {logo, menunav, topbar},
        computed: {
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('offer', ['getOfferFilter', 'getOfferStatus']),
        },
        // offerFilter: [],
        // async mounted() {
        //     await this.$store.dispatch('offer/getOfferConditions', this.id)
        //     await this.$store.dispatch('offer/saveOfferStatusStore', this.id)
        // },
        methods: {
            formatDate_(date) {
                return formatData(date)
            },
            defineStatusId(id) {
                return `status-${id}`
            },
            // defineOfferNameId(id) {
            //     return `offerName-${id}`
            // },
            // capitalizeFirstLetter(str) {
            //     return str && str.charAt(0).toUpperCase() + str.slice(1)
            // },
            getStatusList() {
                return [
                    {id: 0, name: 'Public'},
                    {id: 1, name: 'Private'},
                    {id: 2, name: 'Apply to Run'},
                    {id: 3, name: 'Inactive'},
                ]
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