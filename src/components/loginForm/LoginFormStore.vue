<template>
    <v-card-text>
        <v-text-field
            v-model="stores"
            :rules="storeRules"
            type="text"
            label="Loja"
            placeholder="Loja"
            prepend-inner-icon="mdi-store"
        />
        <v-combobox
            persistent-hint="selecione o caixa que irá trabalhar"
            v-model="pos"
            :rules="posRules"
            type="text"
            label="Caixa"
            placeholder="Caixa"
            prepend-inner-icon="fas fa-cash-register"
            @click:append="passwordShow=!passwordShow"
        />

    </v-card-text>
</template>

<script>
export default {
    name:'LoginFormStore',
    data:()=>({
        snackbar:false,
        stores:'storeExample', //retorno da loja do usuario
        storeRules:[
            v=>!!v || 'a loja é obrigatória!',
        ],
        pos:['caixa1','caixa2','caixa3'],
        posRules:[
            v=>!!v || 'o caixa é obrigatório!',
        ],
    }),
    methods:{
        
    },
}
</script>

<style>

</style>