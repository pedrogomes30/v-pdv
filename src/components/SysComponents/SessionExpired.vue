<template>
<div class="text-center">
    <v-overlay :value="overlay">
    <v-progress-circular
        indeterminate
        size="64"
    ></v-progress-circular>
    <h2>
        Seção inativa, Favor Relogar!
    </h2>
    </v-overlay>
</div>
</template>
<script>
    import router from '@/router';
    export default {
        props:{
            overlay: Boolean,
        },
        data: () => ({
        }),
        watch: {
        overlay (val) {
            val && setTimeout(() => {
                router.push("/");
            }, 1000)
        },
        },
    }
</script>