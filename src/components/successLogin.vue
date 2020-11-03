<template>
    <div class="successlogin">
    </div>
</template>

<script>
    import { Base64 } from 'js-base64'
    import utf8 from "utf8"
    export default {
        created() {
            let tokenDecode = Base64.decode(this.$route.params.token);
            let token = utf8.decode(tokenDecode);
            this.$cookies.set("accessToken",token);
            this.$router.push("/segments")
            location.reload()
        }
    };
</script>

