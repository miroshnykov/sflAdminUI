<template>
    <div id="edit-segment">
        <logo></logo>
        <h1>Rules &amp; Conditions</h1>
        <ul class="segment-info">
            <li>Segment ID: <b>{{id}}</b></li>
            <li>Segment Name: <b>{{JSON.stringify(this.$store.segments)}}</b></li>
<!--            <li>Segment Rules Count: <b>{{this.segmentRuleCount}}</b></li>-->
        </ul>
<!--        <conditions :segmentFilter="this.segmentFilter"/>-->
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import logo from './logo.vue'

    export default {
        name: 'edit-segment',
        components: {logo},
        computed: {
            ...mapGetters('segments', ['getSegments']),
        },
        segmentFilter: [],
        async mounted() {
            // await this.$store.dispatch('segment/getSegmentConditions', this.id)
        },
        methods: {},
        data() {
            return {
                id: Number(this.$route.params.id)
            };
        }
    };
</script>
