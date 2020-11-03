<template>
    <div id="error">
        <div class="error">
            <h2>Error: {{ errMessage }} </h2>
            <h4>use email account with @actionmediamtl.com domain   </h4>
            <button class="button" @click="signIn()">Login again </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "error",
        created() {
            this.errMessage = this.$route.params.email
        },
        methods: {
            signIn() {
                location.reload()
                // window.location.href = process.env.SFL_PLATFORM_ADV_URL
            }
        }
    };
</script>
