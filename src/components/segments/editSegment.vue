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
            <b-col cols="3">
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
            <b-col cols="3">
                <div class="condition__controls">
                    <label>Last Modified</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           disabled
                    >
                </div>
            </b-col>
        </b-row>

        <hr>

            <b-row class="text-center">
                <b-col cols="7">
                    <h2>Rules &amp; Conditions</h2>
                </b-col>
                <b-col cols="2">
                    <b-button variant="secondary" class="btn-add-line" @click="">
                        <i class="fas fa-plus"></i> Add Rule
                    </b-button>
                </b-col>
            </b-row>

            <!-- TODO: Turn exclude/include into switch buttons -->
            <!-- <b-form-checkbox
                    class="active"
                    name="check-button"
                    :checked="props.row.status==='active'"
                    @change="activeInactiveSwitch($event, props.row)"
                    switch>
            </b-form-checkbox> -->

                    <b-row align-v="center">
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
                    </b-row>

        <!-- Replace old ui with new
        <ul class="segment-info">
            <li>Segment ID: <b>{{id}}</b></li>
            <li>Segment Name: <b>{{JSON.stringify(this.$store.segments)}}</b></li>
           <li>Segment Rules Count: <b>{{this.segmentRuleCount}}</b></li>
        </ul>
        <conditions :segmentFilter="this.getSegmentFilter"/> -->

        <hr>

            <b-row class="text-center">
                <b-col cols="7">
                    <h2>Landing Pages</h2>
                </b-col>
                <b-col cols="2">
                    <b-button variant="secondary" class="btn-add-line" @click="">
                        <i class="fas fa-plus"></i> Add Landing Page
                    </b-button>
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
        methods: {},
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