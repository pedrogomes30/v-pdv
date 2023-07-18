<template>
<div class="text-center">
    <v-overlay >
    <v-progress-circular
        indeterminate
        size="64"
    >
    <v-icon size='50'>fa-regular fa-face-sad-cry</v-icon>
    </v-progress-circular>
    <h2>
        Seção inativa, Redirecionando...
    </h2>
    </v-overlay>
</div>
</template>
<script>
    import router from '@/router';
    export default {
        name:'SessionExpiredPage',
        mounted(){
            setTimeout(() => {
                router.push("/login");
            }, 1000)
        }
    }
</script>