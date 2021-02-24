<template>
    <div id="edit-offer">
        <TopBar></TopBar>
        <MenuNav></MenuNav>

        <!-- <h2 class="title">
            <span class="editingMode">Editing <i class="far fa-pencil" data-fa-transform="shrink-2"></i></span>
            {{getOffer.length !==0 && getOffer[0].name}}
        </h2> -->

        <b-row class="text-center title">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input offer-id"
                           :value="id"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Name</label>
                    <input type="text"
                           placeholder="ex: iPhone 11"
                           :value="getOffer.length !==0 && getOffer[0].name"
                           class="condition__matches campaign custom-input offer-name"
                           :id="defineId(`offerName`,id)"
                           @change="updValue($event, `name`)"
                           maxlength="25"
                    >
                </div>
            </b-col>
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Offer Manager</label>
                    <select
                            class="condition__dimension-name condition__matches custom-select"
                    >
                        <!-- <option :value="null">-- Select --</option> -->
                        <option>
                            Maxim Litvinchik
                        </option>

                    </select>
                </div>
            </b-col>
            <b-col cols="1">
                <span class="pull-right" v-b-tooltip.hover.bottom.html="'You have unsaved changes'">
                    <label class="editMode" v-show="checkEditMode()">
                        <i class="fas fa-exclamation-triangle" data-fa-transform="shrink-2"></i>
                    </label>
                </span>
            </b-col>
            <b-col cols="4">
                <b-button v-show="checkEditMode()" class="btn-cancel-edit margin-right-10" @click="this.cancelEdit">
                    <i class="fas fa-ban" data-fa-transform="shrink-2"></i> Cancel
                </b-button>
                <b-button class="btn-save" @click="this.saveOffer">
                    <i class="fas fa-save" data-fa-transform="shrink-2"></i> Save
                </b-button>
                <!-- To add later
                    <b-button class="btn-preview">
                    <i class="fas fa-search" data-fa-transform="shrink-2"></i> Preview
                </b-button> -->
            </b-col>
        </b-row>

        <b-row class="text-center offer-tabs">
            <b-tabs content-class="mt-3">
                <b-tab title="General" active>
                    <b-row class="text-center offer-description">
                        <b-col cols="11">
                            <div class="condition__controls">
                                <label>Description</label>
                                <b-form-textarea
                                        id="textarea"
                                        placeholder="Media offers for everyone in EU region with some limitations..."
                                        rows="4"
                                        max-rows="6"
                                ></b-form-textarea>
                            </div>
                        </b-col>
                    </b-row>

                    <b-row class="text-center general_tab">
                        <b-col cols="4">
                            <div class="condition__controls">
                                <label>Advertiser</label>

                                <select
                                        :id="defineId(`advertiser`,id)"
                                        class="condition__dimension-name condition__matches custom-select"
                                        @change="updValue($event, `advertiser`)"
                                >
                                    <option :value="null">-- Select advertiser --</option>
                                    <option
                                            v-for="{id, name} in getAdveritserList()"
                                            :selected="formatStr(name) === formatStr(getOffer.length !==0 && getOffer[0].advertiser || '')"
                                            :key="id"
                                    >{{name}}
                                    </option>

                                </select>
                            </div>
                        </b-col>

                        <b-col cols="3">
                            <div class="condition__controls">
                                <label>Vertical</label>
                                <select
                                        :id="defineId(`verticals`,id)"
                                        class="condition__dimension-name condition__matches custom-select"
                                        @change="updValue($event, `verticals`)"
                                >
                                    <option :value="null">-- Select verticals --</option>
                                    <option
                                            v-for="{id, name} in getVerticalsList()"
                                            :selected="formatStr(name) === formatStr(getOffer.length !==0 && getOffer[0].verticals || '')"
                                            :key="id"
                                    >{{name}}
                                    </option>
                                </select>
                            </div>
                        </b-col>

                        <b-col cols="1">
                        </b-col>

                        <b-col cols="3">
                            <div class="condition__controls">
                                <label>Status</label>
                                <select
                                        :id="defineId(`offerStatus`,id)"
                                        class="condition__dimension-name condition__matches custom-select"
                                        @change="updValue($event, `status`)"
                                >
                                    <option
                                            id="filterType"
                                            v-for="{id, name} in getStatusList()"
                                            :selected="formatStr(name) === formatStr(getOffer.length !==0 && getOffer[0].status || '')"
                                            :key="id"
                                    >{{name}}
                                    </option>

                                </select>
                            </div>
                        </b-col>

                        <b-col cols="1">
                        </b-col>


                        <b-col cols="8">
                            <div class="campaign-block condition__controls">
                                <label for="label-platform">Conversion Flow Type</label>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">

                                    <!-- <label class="btn btn-secondary-" :class="addClassActive(item.platformAndroid)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`platformAndroid`)"
                                    > Android
                                    </label> -->

                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Cost per install'">CPI
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`cpi`)"
                                                name="radio"
                                                @change="updValue(`cpi`, `conversionType`)"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Cost per action'">CPA
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`cpa`)"
                                                @change="updValue(`cpa`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                    <!-- <label class="conversionType btn btn-secondary-"
                                        v-b-tooltip.hover.bottom.html="'Cost per lead'">CPL
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`cpl`)"
                                                @change="updValue(`cpl`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label> -->
                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Cost per click'">CPC
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`cpc`)"
                                                @change="updValue(`cpc`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Cost per mille or thousand'">CPM
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`cpm`)"
                                                @change="updValue(`cpm`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Revenue Sharing'">RevShare
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`revShare`)"
                                                @change="updValue(`revShare`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                    <label class="conversionType btn btn-secondary-"
                                           v-b-tooltip.hover.bottom.html="'Multiple Conversions'">Hybrid/Multistep
                                        <input
                                                type="radio"
                                                :checked="checkConversionType(`hybrid/multistep`)"
                                                @change="updValue(`hybrid/multistep`, `conversionType`)"
                                                name="radio"
                                        >
                                        <span class="conversionTypeCheckMark"></span>
                                    </label>
                                </div>

                            </div>
                        </b-col>

                        <b-col cols="2" v-show="checkConversionType(`revShare`)">
                            <div class="condition__controls percentage">
                                <label>RevShare Payout</label>
                                <input type="number"
                                       class="condition__matches campaign custom-input payoutPercent"
                                       :value="getOffer.length !==0 && getOffer[0].payoutPercent"
                                       @change="updValue($event, `payoutPercent`)"
                                       v-show="checkConversionType(`revShare`)"
                                       step=1
                                       min="0"
                                       max="999"
                                       onkeypress="
                                        return (
                                            event.charCode == 8
                                            || event.charCode == 0
                                            || event.charCode == 13
                                        ) ? null : event.charCode >= 48 && event.charCode <= 57"
                                       onpaste="return false"
                                       onKeyPress="if(this.value.length==3) return false;"
                                >
                            </div>
                        </b-col>

                        <b-col cols="3" v-show="checkConversionType(`hybrid/multistep`)">
                            <div class="condition__controls">
                                <!-- <label>Enable CPM Option</label>
                                <input type="checkbox"
                                    class="condition__matches campaign custom-input"
                                    :value="getOffer.length !==0 && getOffer[0].isCpmOptionEnabled"
                                    :checked="getOffer[0].isCpmOptionEnabled"
                                    @change="updValue($event, `isCpmOptionEnabled`)"
                                    v-show="checkConversionType(`hybrid/multistep`)"
                                > -->
                                <label>&nbsp;</label>
                                <b-form-checkbox
                                        size="lg"
                                        type="checkbox"
                                        class="condition__matches campaign"
                                        :checked="!!getOfferField(`isCpmOptionEnabled`)"
                                        @change="updValue($event, `isCpmOptionEnabled`)"
                                        v-show="checkConversionType(`hybrid/multistep`)"
                                >
                                    Enable CPM Option
                                </b-form-checkbox>
                            </div>
                        </b-col>


                    </b-row>

                    <b-row class="text-center defaultsettings">
                        <!-- <b-col cols="4">
                            <h2>Default Settings</h2>
                        </b-col> -->

                        <b-col cols="6">
                            <div class="condition__controls">
                                <div class="pull-right">
                                    <!--                        <b-button variant="light" class="btn-add-line" v-b-modal.modal-scrollable-->
                                    <!--                                  @click="showOfferAddLpModal(id)"-->
                                    <!--                        >-->
                                    <!--                            <i class="far fa-plus" data-fa-transform="shrink-1"></i> Add LP-->
                                    <!--                        </b-button>-->

                                    <!--                        <OfferLP :id="'modal_add_lp' + id" :ref="'modal_add_lp' + id"-->
                                    <!--                                 :offerId="id"-->
                                    <!--                        >-->
                                    <!--                        </OfferLP>-->
                                </div>

                                <!-- <label>Default LP {{getLPValue()}}</label> -->
                                <label>Default LP
                                    <span class="question"
                                          v-b-tooltip.hover.right.html="'Add or select a landing page is mandatory'">
                                        <i class="fad fa-question-circle"></i>
                                    </span>
                                    <b-button variant="light" class="btn-add-line pull-right" v-b-modal.modal-scrollable
                                            @click="showCustomLPModal(id)"
                                    >
                                        <i class="far fa-cog"></i> Add LP/Customize
                                    </b-button>

                                    <CustomLP :id="'modal_lp' + id" :ref="'modal_lp' + id"
                                            :customLPId="id"
                                            :defaultLp="getLpDefault"
                                            :customLPRules="getOffer.length !==0  && getOffer[0].customLPRules && JSON.parse(getOffer[0].customLPRules)">
                                    </CustomLP>
                                </label>
                                <model-select
                                        :options="getLpModify()"
                                        :id="defineId(`lpsId`,id)"
                                        placeholder="Search landing page..."
                                        :value="getLPValue()"
                                        @input="updValue($event,`defaultLp`)"
                                        v-b-tooltip.hover.focus.bottom.html="getLpURL()"
                                >
                                </model-select>
                            </div>
                        </b-col>
                        <!-- <b-col cols="2">
                            <div class="condition__controls">
                                <label>&nbsp;</label>
                                <b-button variant="light" class="btn-add-line pull-left" v-b-modal.modal-scrollable
                                          @click="showCustomLPModal(id)"
                                >
                                    <i class="far fa-cog"></i> Add LP/Customize
                                </b-button>

                                <CustomLP :id="'modal_lp' + id" :ref="'modal_lp' + id"
                                          :customLPId="id"
                                          :defaultLp="getLpDefault"
                                          :customLPRules="getOffer.length !==0  && getOffer[0].customLPRules && JSON.parse(getOffer[0].customLPRules)">
                                </CustomLP>
                            </div>
                        </b-col> -->
                        <b-col cols="2">
                            <div class="condition__controls" style="margin-top: 12px; margin-left: -10px;">
                                <label>&nbsp;</label>
                                <button class="btn btn-link pull-left" @click="copyText(defaultLp)"
                                        v-b-tooltip.hover.bottom="'Copy URL to Clipboard'">
                                    <i class="far fa-copy"></i>
                                </button>
                                <button class="btn btn-link pull-left" @click="openURL(props.row.landingPage)"
                                        v-b-tooltip.hover.bottom="'Open URL in a new page'">
                                    <i class="far fa-external-link-alt"></i>
                                </button>
                            </div>
                        </b-col>
                        <b-col cols="4">
                        </b-col>

                        <b-col cols="6">
                            <div class="condition__controls">
                                <label>Exit Traffic
                                    <span class="question"
                                          v-b-tooltip.hover.right.html="'Traffic to send out if there is a redirect'">
                                        <i class="fad fa-question-circle"></i>
                                    </span>
                                </label>
                                <model-select
                                        :options="getOffersModify()"
                                        :id="defineId(`offerIdRedirect`,id)"
                                        placeholder="Search landing page..."
                                        :value="getOffer.length !==0  && getOffer[0].offerIdRedirect"
                                        @input="updValue($event,`offerIdRedirect`)"
                                >
                                </model-select>
                            </div>
                        </b-col>
                        <b-col cols="6">
                        </b-col>

                        <b-col cols="6">
                            <div class="condition__controls">
                                <label>Postback for the Advertiser</label>
                                <!-- <model-select
                                        :options="getOffersModify()"
                                        :id="defineId(`offerIdRedirect`,id)"
                                        placeholder="Search landing page..."
                                        :value="getOffer.length !==0  && getOffer[0].offerIdRedirect"
                                        @input="updValue($event,`offerIdRedirect`)"
                                >
                                </model-select> -->
                                <input type="text"
                                       value="http://track.com/clickid=[put LID here]"
                                       class="condition__matches campaign custom-input"
                                       maxlength="25"
                                >
                            </div>
                        </b-col>
                        <b-col cols="1">
                            <div class="condition__controls" style="margin-top: 12px; margin-left: -10px;">
                                <label>&nbsp;</label>
                                <button class="btn btn-link pull-left" @click="copyText(props.row.landingPage)"
                                        v-b-tooltip.hover.right="'Copy URL to Clipboard'">
                                    <i class="far fa-copy"></i>
                                </button>
                            </div>
                        </b-col>
                        <b-col cols="5">
                        </b-col>
                    </b-row>
                </b-tab>

                <b-tab title="Pay In / Pay Out">
                    <b-row class="text-center payinpayout_tab">
                        <!-- <b-col cols="4">
                            <h2>Pay-in/Pay-out Settings</h2>
                        </b-col> -->

                        <b-col cols="3">
                            <div class="condition__controls dollar">
                                <label>Pay In</label>
                                <input type="number"
                                       step=1
                                       min="0"
                                       max="999"
                                       placeholder="10"
                                       :value="getOffer.length !==0 && getOffer[0].payIn"
                                       @change="updValue($event, `payIn`)"
                                       class="condition__matches budgetTotal custom-input"
                                       pattern="^\d+(?:\.\d{1,2})?$"
                                       onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'"
                                       onkeypress="
                                            return (
                                                event.charCode == 8
                                                || event.charCode == 0
                                                || event.charCode == 13
                                            ) ? null : event.charCode >= 48 && event.charCode <= 57
                                            if(this.value.length==3) return false;"
                                       onpaste="return false"
                                       onKeyPress="if(this.value.length==3) return false;"
                                >
                            </div>
                        </b-col>
                        <b-col cols="10">
                        </b-col>
                        <b-col cols="3">
                            <div class="condition__controls">
                                <label>Payout Type</label>
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        v-model="payoutType"
                                        @change="changePayoutType()"
                                >
                                    <!-- <option :value="null">-- Select --</option> -->
                                    <option value="1">
                                        Fixed Payout
                                    </option>
                                    <option value="2">
                                        Percentage
                                    </option>

                                </select>
                            </div>
                        </b-col>
                        <b-col cols="3">
                            <div class="condition__controls dollar" v-show="this.payoutType === '1'">
                                <label>Pay Out</label>
                                <input type="number"
                                       step=1
                                       min="0"
                                       max="999"
                                       placeholder="10"
                                       :value="getOffer.length !==0  && getOffer[0].payOut"
                                       @change="updValue($event, `payOut`)"
                                       class="condition__matches budgetTotal custom-input"
                                       pattern="^\d+(?:\.\d{1,2})?$"
                                       onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'"
                                       onkeypress="
                                            return (
                                                event.charCode == 8
                                                || event.charCode == 0
                                                || event.charCode == 13
                                            ) ? null : event.charCode >= 48 && event.charCode <= 57
                                            if(this.value.length==3) return false;"
                                       onpaste="return false"
                                       onKeyPress="if(this.value.length==3) return false;"
                                >
                            </div>

                            <div class="condition__controls percentage" v-show="this.payoutType === '2'">
                                <label>Pay Out</label>
                                <input type="number"
                                       step=1
                                       min="0"
                                       max="999"
                                       placeholder="10"
                                       :value="getOffer.length !==0  && getOffer[0].payOut"
                                       @change="updValue($event, `payOut`)"
                                       class="condition__matches budgetTotal custom-input"
                                       pattern="^\d+(?:\.\d{1,2})?$"
                                       onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'"
                                       onkeypress="
                                            return (
                                                event.charCode == 8
                                                || event.charCode == 0
                                                || event.charCode == 13
                                            ) ? null : event.charCode >= 48 && event.charCode <= 57
                                            if(this.value.length==3) return false;"
                                       onpaste="return false"
                                       onKeyPress="if(this.value.length==3) return false;"
                                >
                            </div>
                        </b-col>
                        <b-col cols="2" style="margin-top: 60px">
                            <b-button variant="light" class="btn-add-line btn-grey pull-left"
                                      v-b-tooltip.hover.bottom.html="'Coming Soon'">
                                <i class="far fa-cog"></i> Customize
                            </b-button>
                        </b-col>
                    </b-row>
                </b-tab>


                <b-tab title="Restrictions">
                    <b-row class="text-center restrictions_tab">
                        <!-- <b-col cols="12">
                            <h2>Restriction Settings</h2>
                        </b-col> -->

                        <b-col cols="5">
                            <div class="condition__controls">
                                <label class="pull-left">GEO Settings
                                    <span class="question"
                                          v-b-tooltip.hover.right.html="'Allow or ban certain countries from traffic'">
                                        <i class="fad fa-question-circle"></i>
                                    </span>
                                </label>
                                <div v-b-popover.hover.v-danger.bottom.html="getBannedCountries()">
                                    <input type="text"
                                           class="condition__matches campaign custom-input"
                                           :value="getBannedCountriesStatus()"
                                           @click="showGeoRestrictionsModal(id)"
                                           readonly
                                    >
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="2">
                            <div class="condition__controls">
                                <label>&nbsp;</label>
                                <b-button variant="light" class="btn-add-line pull-left" v-b-modal.modal
                                          @click="showGeoRestrictionsModal(id)"
                                >
                                    <i class="far fa-cog"></i> Customize
                                </b-button>

                                <GeoRestrictions :id="'modal_' + id" :ref="'modal_' + id"
                                                 :geoId="id"
                                                 :geoRules="getOffer.length !==0  && getOffer[0].geoRules && getOffer[0].geoRules"
                                                 :offerDefaultLPInfo="getDefaultLPInfo(getOffer.length !==0 && getOffer[0].defaultLp)"
                                >
                                </GeoRestrictions>
                            </div>
                        </b-col>
                        <b-col cols="5">
                        </b-col>
                        <b-col cols="5">
                            <div class="condition__controls">
                                <label class="pull-left">Caps</label>
                                <!-- Add tooltip for showing Caps -->
                                <div v-b-popover.hover.v-info.bottom.html="getCapsStatus(getOfferCap)" title="Caps">
                                    <input type="text"
                                           class="condition__matches campaign custom-input"
                                           :value="getCapsStatus(getOfferCap)"
                                           @click="showCapsModal(id)"
                                           readonly
                                    >
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="2">
                            <div class="condition__controls">
                                <label>&nbsp;</label>
                                <b-button variant="light" class="btn-add-line pull-left" v-b-modal.modal-scrollable
                                          @click="showCapsModal(id)"
                                >
                                    <i class="far fa-cog"></i> Customize
                                </b-button>

                                <Caps :id="'modal_caps' + id" :ref="'modal_caps' + id"
                                      :offerId="id"
                                      :offerCap="getOfferCap.length !==0 && getOfferCap"
                                      :offers="getOffersModify()"
                                >
                                </Caps>
                            </div>
                        </b-col>
                        <b-col cols="5">
                        </b-col>
                        <b-col cols="5">
                            <div class="condition__controls">
                                <label>&nbsp;</label>
                                <b-form-checkbox
                                        size="lg"
                                        type="checkbox"
                                        class="condition__matches campaign"
                                >
                                    Start Date
                                </b-form-checkbox>

                                <span class="datepicker">
                                    <date-picker class="custom-input date-picker" name="date" v-model="startDate"
                                                 :config="options" placeholder="Choose date and time..."></date-picker>
                                </span>

                                <b-form-checkbox
                                        size="lg"
                                        type="checkbox"
                                        class="condition__matches campaign"
                                >
                                    End Date
                                </b-form-checkbox>

                                <span class="datepicker">
                                    <date-picker class="custom-input date-picker" name="date" v-model="endDate"
                                                 :config="options" placeholder="Choose date and time..."></date-picker>
                                </span>

                            </div>
                        </b-col>
                        <b-col cols="7">
                        </b-col>
                    </b-row>
                </b-tab>

                <b-tab title="History">

                    <table class="table table-striped child-row tableFixHead lp-table">
                        <thead>
                        <tr scope="row">
                            <th scope="col">User</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Changes</th>
                        </tr>
                        </thead>
                        <tr scope="row" v-for="history in getOfferHistoryModify()">
                            <td>
                                <span>{{history.user}}</span>

                            </td>
                            <td>
                                <span>{{ formatDate_(new Date(history.dateAdded * 1000)) }}</span>

                            </td>
                            <td>
                                <span>{{ history.action  }}</span>

                            </td>
                            <td>
                                <span v-for="historyDetails in JSON.parse(history.logs)">
                                     {{historyDetails}}
                                </span>
                            </td>
                        </tr>

                    </table>


                </b-tab>

            </b-tabs>
        </b-row>

    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import TopBar from '../topbar.vue'
    import MenuNav from '../menunav.vue'
    import {formatData, cloneObjectArray} from '../../helpers'
    import GeoRestrictions from './geoRestrictions'
    import Caps from './caps'
    import CustomLP from './customLP'
    import OfferLP from './offerLP'
    import {ModelSelect} from 'vue-search-select'
    import 'bootstrap/dist/css/bootstrap.css';
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        name: 'editOffer',
        components: {
            MenuNav,
            TopBar,
            GeoRestrictions,
            Caps,
            CustomLP,
            OfferLP,
            ModelSelect,
            datePicker
        },
        computed: {
            ...mapGetters('offer', [
                'getOffer',
                'getOfferOrigin',
                'getOfferCap',
                'getOfferCapOrigin',
                'getOfferGeo',
                'getOfferGeoOrigin',
                'getCustomLPRules',
                'getCustomLPRulesOrigin',
            ]),
            ...mapGetters('offers', ['getOffers']),
            ...mapGetters('offerHistory', ['getOfferHistory']),
            ...mapGetters('lpOffers', ['getLpOffers', 'getCheckSumLpOffer'])
        },
        async mounted() {
            await this.$store.dispatch('offers/saveOffersStore')
            await this.$store.dispatch('offer/saveOfferStore', this.id)
            await this.$store.dispatch('offer/saveOfferCapStore', this.id)
            await this.$store.dispatch('lpOffers/saveLpOffersStore', this.id)

            // await store.dispatch('affiliates/saveAffiliatesStore')
            await this.$store.dispatch('countries/saveCountriesStore')
            await this.$store.dispatch('offerHistory/saveOfferHistoryStore', this.id)
            // await store.dispatch('dimensions/saveDimensionsStore')
            // await store.dispatch('campaigns/saveCampaignsStore')
            await this.$store.dispatch('lp/saveLPStore')

            // menuOffersId  disabled
            // let el = document.querySelector(`#menuOffersId`)
            // el.setAttribute("disabled","disabled")
            // el.addClass("disabled")
            // el.classList.add("disabled")
            // el.disabled=""
            // debugger

            // await store.dispatch('prods/saveProdsStore')
            // await store.dispatch('affiliateWebsites/saveAffiliateWebsitesStore')
        },
        methods: {
            ...mapMutations('offer', ['updOffer']),
            checkEditMode() {
                if (JSON.stringify(this.getOfferOrigin) !== JSON.stringify(this.getOffer)
                    || JSON.stringify(this.getOfferCapOrigin) !== JSON.stringify(this.getOfferCap)
                    || JSON.stringify(this.getCheckSumLpOffer) !== JSON.stringify(this.getLpOffers)
                    || JSON.stringify(this.getOfferGeoOrigin) !== JSON.stringify(this.getOfferGeo)
                    || JSON.stringify(this.getCustomLPRulesOrigin) !== JSON.stringify(this.getCustomLPRules)
                ) {
                    document.querySelector('.nav-active').style.display = 'none'
                    document.querySelector('.nav-disabled').style.display = 'block'
                    return true
                }
            },
            getOfferHistoryModify() {
                return this.getOfferHistory.length !== 0 && this.getOfferHistory
            },
            getBannedCountries() {
                if (this.getOffer.length !== 0 && this.getOffer[0].geoRules) {
                    let geoR = JSON.parse(this.getOffer[0].geoRules)
                    let geoCountry = geoR.geo.map(item => item.country)
                    return geoCountry.join(', ')
                }
            },
            getBannedCountriesStatus() {
                if (this.getOffer.length !== 0 && this.getOffer[0].geoRules) {
                    let geoR = JSON.parse(this.getOffer[0].geoRules)
                    let geoCountry = geoR.geo.map(item => item.country)
                    return `Custom (Hover for banned countries)`
                } else {
                    return `Banned Countries (hover for list)`
                }
                // return this.getOffer.length !== 0 && `Allow all countries`
                // return this.getOffer.length !== 1 && `Banned Countries (hover for list)`
            },
            getLpURL() {
                if (this.getOffer.length !== 0) {

                    let obj = this.getLpOffers.filter(item => (item.id === this.getOffer[0].defaultLp))
                    return obj.length !== 0 && 'Name: ' + obj[0].name + '<br>(ID:' + obj[0].id + ')'
                }
            },
            getLpDefault() {
                if (this.getOffer.length !== 0) {
                    return this.getOffer[0].defaultLp
                }
            },
            getLpModify() {
                let lpModify = cloneObjectArray(this.getLpOffers)
                return lpModify.map(item => {
                    item.value = item.id
                    item.text = `${item.url}`
                    return item
                })
            },
            // getLpModify() {
            //     let lpModify = cloneObjectArray(this.getLpOffers)
            //     return lpModify.map(item => {
            //         item.value = item.id
            //         item.text = `${item.name} (LP ID: ${item.id})`
            //         return item
            //     })
            // },
            getDefaultLPInfo(defaultLp) {
                if (!defaultLp) return
                return this.getLpOffers.filter(item => {
                    return item.id === defaultLp
                })
            },
            getOffersModify() {
                return this.getOffers.map(item => {
                    item.value = item.id
                    item.text = `${item.name} (Offer ID: ${item.id})`
                    return item
                })
            },
            getLPValue() {
                if (this.getOffer.length !== 0) {
                    return this.getOffer[0].defaultLp
                }
            },
            getOfferField(name) {
                if (this.getOffer.length !== 0) {
                    return this.getOffer[0][name]
                }
            },
            updValue(event, name) {
                let obj = {}

                if (
                    name === 'conversionType'
                    || name === 'defaultLp'
                    || name === 'offerIdRedirect'
                ) {
                    obj.fieldName = name
                    obj.value = event
                } else if (name === 'status') {

                    obj.fieldName = name
                    if (event.target.value.toLowerCase() === 'apply to run') {
                        obj.value = `apply_to_run`
                    } else {
                        obj.value = event.target.value.toLowerCase()
                    }

                } else {
                    obj.fieldName = name
                    if (name === 'isCpmOptionEnabled') {
                        obj.value = Number(!this.getOfferField(`isCpmOptionEnabled`))
                    } else {
                        obj.value = event.target.value
                    }
                }

                debugger
                this.updOffer(obj)
            },
            getCapsStatus(caps) {
                return caps.length !== 0 && `Enabled` || `Disabled`
            },
            async cancelEdit() {
                this.$swal.fire({
                    type: 'warning',
                    title: 'Are you sure?',
                    text: "Your changes will be discarded.",
                    showCancelButton: true,
                    confirmButtonColor: '#FFB946',
                    cancelButtonColor: '#ACC3CF',
                    confirmButtonText: 'Yes, exit',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {
                        this.$router.push("/offers")
                        location.reload()
                    }
                })
            },
            async saveOffer() {
                let offerData = this.getOffer
                let emptyKey = []
                offerData.forEach(item => {
                    let keys = Object.keys(item)
                    keys.forEach(key => {
                        if (
                            key === 'geoRules' ||
                            key === 'customLPRules' ||
                            key === 'payoutPercent' ||
                            key === 'caps' ||
                            key === 'isCpmOptionEnabled' ||
                            key === 'offerIdRedirect'
                        ) {
                            return
                        }
                        if (Number(item[key]) === 0) {
                            emptyKey.push(key)
                        }
                    })
                })

                let offerId
                if (offerData.length !== 0) {
                    offerId = offerData[0].id
                }
                let el = document.querySelector(`#lpsId-${offerId}`)
                if (el.nextElementSibling.textContent.indexOf('Search landing page') === 0) {
                    emptyKey.push('DefaultLandingPages missing')
                }

                if (emptyKey.length !== 0) {
                    this.$swal.fire({
                        title: 'Validation Error',
                        text: `Fields: ${JSON.stringify(emptyKey)} is empty `,
                    })
                    return
                }

                const {id} = await this.$store.dispatch('offer/saveOfferDb')
                if (id) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Offer updated`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                    location.reload()
                } else {
                    this.$swal.fire({
                        title: 'Offer failed to save',
                        type: 'error',
                        text: 'Please check backend errors',
                        confirmButtonColor: '#2ED47A',
                    })
                }


            },
            showGeoRestrictionsModal(id) {
                let modal_id = 'modal_' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            showCapsModal(id) {
                let modal_id = 'modal_caps' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            showCustomLPModal(id) {
                let modal_id = 'modal_lp' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            showOfferAddLpModal(id) {
                let modal_id = 'modal_add_lp' + id

                this.$refs[modal_id].show(id)
                console.log('this.$refs[modal_id]-', this.$refs[modal_id])
            },
            addClassActive(value) {
                return value && 'active' || ''
            },
            checkConversionType(str) {
                let offer = this.getOffer
                // debugger
                if (offer.length !== 0 && offer[0].conversionType === str) {
                    return `checked`
                }

            },
            formatDate_(date) {
                return formatData(date)
            },
            formatStr(str) {
                return str && str.toLowerCase().replace(/_/g, '').replace(/\s/g, '')
            },
            defineId(name, id) {
                return `${name}-${id}`
            },
            getStatusList() {
                return [
                    {id: 0, name: 'Public'},
                    {id: 1, name: 'Private'},
                    {id: 2, name: 'Apply to Run'},
                    {id: 3, name: 'Inactive'},
                ]
            },
            getAdveritserList() {
                return [
                    {id: 0, name: 'FFM-Online'},
                    {id: 1, name: 'Milkbox'},
                ]
            },
            getVerticalsList() {
                return [
                    {id: 0, name: 'Multimedia'},
                    {id: 1, name: 'Mobile'},
                    {id: 2, name: 'Adult'},
                    {id: 3, name: 'Software'},
                ]
            },
            changePayoutType() {
                this.payoutType
                // this.payoutType = !this.payoutType;
            },
        },
        data() {
            return {
                id: Number(this.$route.params.id),
                selected: true,
                payoutType: '1',
                startDate: null,
                endDate: null,
                options: {
                    // https://momentjs.com/docs/#/displaying/
                    format: 'MM/DD/YYYY h:mm:ss',
                    useCurrent: true,
                    showClear: true,
                    showClose: false,
                    sideBySide: true,
                    icons: {
                        time: 'far fa-clock',
                        date: 'far fa-calendar',
                        up: 'fas fa-chevron-up',
                        down: 'fas fa-chevron-down',
                        previous: 'fas fa-chevron-left',
                        next: 'fas fa-chevron-right',
                        today: 'fas fa-calendar-check',
                        clear: 'far fa-ban',
                        close: 'far fa-times-circle'
                    },
                },
            };
        }
    };

</script>

<style lang="sass">
    .container
        margin-left: 290px

        .conversionType
            display: table-cell
            position: relative
            padding-left: 35px
            margin-bottom: 12px
            cursor: pointer
            font-size: 16px
            -webkit-user-select: none
            -moz-user-select: none
            -ms-user-select: none
            user-select: none

        .conversionType input
            position: absolute
            opacity: 0
            cursor: pointer

        .conversionTypeCheckMark
            position: absolute
            top: 15px
            left: 15px
            height: 10px
            width: 10px
            background-color: #eee
            border-radius: 50%

        .conversionType:hover input ~ .conversionTypeCheckMark
            background-color: #ccc


        .conversionType input:checked ~ .conversionTypeCheckMark
            background-color: #36B8E1

        .conversionTypeCheckMark:after
            content: ""
            position: absolute
            display: none

        .conversionType input:checked ~ .conversionTypeCheckMark:after
            display: block

        .conversionType .conversionTypeCheckMark:after
            // top: 6px
            // left: 6px
            // width: 8px
            // height: 8px
            // border-radius: 50%
            background: transparent

        .conversionType:active
            color: #36B8E1
            border-color: #36B8E1
            z-index: 2

        .conversionType.btn.btn-secondary-:focus-within
            color: #36B8E1
            border-color: #36B8E1
            z-index: 2

        .row.text-center.title
            position: fixed
            top: 15px
            z-index: 4
            width: 100%
            margin-left: -33px
        // left: 287px

        button.btn.btn-cancel-edit, button.btn.btn-save
            position: initial
            float: left
            width: auto
            padding: 0px 20px
            margin-right: 10px

        .title
            .condition__controls label
                font-size: 14px
                display: inline-block
                text-align: left
                color: #7F98A5
                font-weight: 500
                letter-spacing: 0.3px
                margin-top: 5px
                border-radius: 7px
                float: left

        .row.text-center.title .col-2
            -ms-flex: 0 0 18%
            flex: 0 0 18%
            max-width: 18%

        .row.text-center.title .col-3
            -ms-flex: 0 0 22%
            flex: 0 0 22%
            max-width: 22%

        .row.text-center.title .custom-input
            position: initial
            width: auto
            color: #7F98A5
            font-size: 16px
            font-weight: 600
            border-radius: 7px
            padding: 10px 15px
            height: 40px
            text-align: left
            border: 2px solid #e3eef4
            margin-left: 10px
            float: left

            &.offer-id
                width: 70px

            &.offer-name
                width: 170px

        .row.text-center.title .custom-select
            text-align: left
            position: relative
            min-width: 170px
            width: auto
            height: 40px
            border-radius: 7px
            color: #7F98A5
            font-size: 16px
            font-weight: 600
            border: 2px solid #e3eef4
            margin-left: 10px
            float: left

        .row.text-center.title .condition__controls
            border: 0
            margin-top: -1rem
            margin-bottom: 0rem
            padding-bottom: 0rem

        .row.text-center.title .condition__matches
            margin-right: 0px

        .offer-tabs
            margin-top: 20px

        .tabs
            .tab-content
                min-width: 52vw
                border: 1px solid #E3EEF4
                border-radius: 4px

            .mt-3, .my-3
                margin-top: 0rem !important
                background: #fff
                padding: 20px

            .nav-tabs .nav-link.active,
            .nav-tabs .nav-item.show .nav-link
                color: #36B8E1
                font-size: 16px
                font-weight: 700
                background-color: #fff
            // border: 2px solid #E3EEF4

            .nav-link
                color: #7F98A5
                font-size: 16px
                font-weight: 500
                margin-left: 0px
                padding: 10px 4rem

            textarea.form-control
                display: block
                width: 100%
                height: calc(1.5em + 1rem + 5px)
                padding: 15px
                color: #7F98A5
                font-size: 16px
                font-weight: 500
                letter-spacing: 0.3px
                line-height: 1
                border: 2px solid #E3EEF4
                background: #fff
                border-radius: 7px
                min-width: 250px
                min-height: 45px
                max-height: 300px
                resize: vertical !important
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out

                &::placeholder
                    color: #ACC3CF

            .percentage::before
                content: '\F541'
                font-family: "Font Awesome 5 Free"
                font-weight: 900
                font-size: 18px
                color: #ACC3CF
                opacity: 0.7
                float: right
                position: relative
                top: 43px
                right: 15px
                z-index: 1

            .dollar::before
                content: '\f155'
                font-family: "Font Awesome 5 Free"
                font-weight: 900
                font-size: 18px
                color: #ACC3CF
                opacity: 0.7
                float: right
                position: relative
                top: 43px
                right: 15px
                z-index: 1

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button
                -webkit-appearance: none
                margin: 0

            input[type=number]
                -moz-appearance: textfield

            input.form-control.custom-input.date-picker
                font-size: 16px
                border: 2px solid #E3EEF4
                border-radius: 4px
                padding: 5px 10px 5px 40px
                margin-top: 0px

            span.datepicker::before
                content: '\f073'
                font-family: "Font Awesome 5 Free"
                font-weight: 300
                font-size: 18px
                color: #ACC3CF
                opacity: 0.7
                float: left
                position: relative
                margin-top: -15px
                top: 32px
                left: 15px
                z-index: 1
</style>