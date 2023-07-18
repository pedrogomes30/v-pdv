<template>
<div class="text-center">
    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        <h2>
            Carregando...
        </h2>
    </v-overlay>
</div>
</template>
<script>
export default {
    props:{
        overlay: Boolean,
    },
}
</script>