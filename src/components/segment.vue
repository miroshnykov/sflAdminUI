<template>
    <transition name="fade">

        <section class="segment" :class="{segment__draggable: true}" @change="updateGroup($event, group)">

            <h1 class="segment__name" :title="segment.name">
                <span v-bind:title="getTitle(segment)" class="segment__active" @click="toggleState(segment)">➕</span>
                {{segment.name}} ( {{segment.id}} )
                <!--                <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->
                <!--                <span v-if="segment.isDefault" class="segment__default">(Default)</span>-->
            </h1>
            <!--@focus="focusMenu" @blur="blur"-->
            <button class="segment__toggle-menu"/>

            <!--            <span v-bind:title="getTitle(segment)" v-bind:class="getClass(segment)" @click="toggleState(segment)">⭕️</span>-->

            <b-button variant="outline-success" @click="edit(segment.id)">
                <i class="fas fa-plus" data-fa-transform="shrink-1"></i> Edit
            </b-button>

            <b-button variant="outline-danger">
                <i class="fas fa-plus" data-fa-transform="shrink-1"></i> Delete
            </b-button>
            <label style="font-size: 21px;">{{segment.position}} </label>
<!--            <label style="font-size: 12px;">( {{segment.id}} )</label>-->
            <!--            <b-button variant="light">Light</b-button>-->

            <!--                    <b-button variant="primary" class="margin-left-10" @click="this.addCampaign">-->
            <!--                        <i class="fas fa-plus" data-fa-transform="shrink-1"></i> Edit-->
            <!--                    </b-button>-->

            <!--            <button tag="button" @click="clickMenuItem('edit')" class="segment__edit segment__menu-item" @blur="blur">-->

            <!--                Edit-->
            <!--            </button>-->
            <!--            <ul :class="`segment__menu-open`">-->
            <!--                <li>-->

            <!--                </li>-->

            <!--            </ul>-->
            <!--            <template v-if="showLandingPages">-->
            <!--                <landing-pages :landingPages="segment.landingPages" :handleSave="updateSegment.bind(this,segment)" />-->
            <!--            </template>-->
            <div v-if="errors" class="validate_error">
                <span v-for="error in errors">{{ error }}</span>
            </div>
        </section>
    </transition>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from "vuex";


    export default {
        name: "segment",
        props: {
            segment: Object
        },
        data() {
            return {
                errors: [],
                showMenu: false,
                showLandingPages: false
            };
        },
        methods: {
            updateGroup(e, group) {
                console.log(e, group)
            },
            edit(id) {
                this.$router.push(`/segment/${id}`)
            },
            blur: function (event) {
                return
                debugger
                let {relatedTarget, target} = event;
                if (
                    !relatedTarget ||
                    !relatedTarget.classList.contains("segment__menu-item")
                ) {
                    this.showMenu = false;
                    if (this.showMask && !target.classList.contains("segment__delete"))
                        this.toggleMask();
                }
            },
            getTitle(segment) {
                return 'Click to disable'

            },
            getClass(segment) {
                return 'segment__empty'
            },
            updateSegment: function (segment, landingPages) {
                this.update(Object.assign({}, segment, {landingPages}));
            },
            ...mapActions("segments", ["update", "removeAndUpdateOrder"]),
            ...mapMutations("segments", ["toggleActive"]),
            ...mapMutations(["toggleMask", "toggleConfirm"]),
            ...mapMutations("landingPages", ["processLandingPagesEdit"])
        },
        computed: {
            ...mapGetters('segments', ['getSegments'])
        }
    };
</script>

<style lang="scss">
    .segment {
        opacity: 1;
        margin: 1rem;
        height: 80px;
        width: 250px;
        padding: 1rem;
        position: relative;
        border-radius: 4px;
        border: solid #e1d4e1 2px;
        user-select: none;
    }

    .segment.segment__draggable {
        cursor: grab;
        height: 80px;
    }

    .segment__active, .segment__disabled {
        cursor: pointer;
        user-select: none;
    }

    .segment__empty {
        color: red;
    }

    .segment__name {
        font-size: 1rem;
        font-weight: normal;
        margin: 0.7rem 0 0 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .segment__default {
        font-style: italic;
        height: 80px;
    }

    .segment__toggle-menu {
        top: 0;
        right: 0.5rem;
        position: absolute;
        background: none;
        transform: rotate(45deg);
        border: solid #e1d4e1;
        border-radius: 3px;
        border-width: 0 3px 3px 0;

        &:focus,
        &:hover {
            outline: none;
            border-color: #888;
        }

        & + .segment__menu.open {
            opacity: 1;
            width: 12rem;
            height: auto;

            .segment__menu-item {
                display: block;

                &:active {
                    background: #6dcbfa;
                }
            }
        }
    }

    $menu-time: 0.3s;

    .segment__menu {
        margin: 0;
        padding: 0;
        top: 2rem;
        right: 1rem;
        width: 0;
        height: 0;
        opacity: 0;
        z-index: 2;
        overflow: hidden;
        list-style: none;
        position: absolute;
        background: white;
        transition: height $menu-time ease-in, width $menu-time ease-in,
        opacity $menu-time ease-in-out;
        border: solid #e1d4e1 2px;
        box-shadow: 2px 3px 5px #333;

        button {
            width: 100%;
            border: none;
            display: none;
            background: white;
            white-space: nowrap;

            &:hover,
            &:focus {
                outline: none;
                background: #6dcbfa;
            }
        }
    }

</style>
