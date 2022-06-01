<template lang="StoreCashierPage">
    <div class="background d-flex justify-center align-center" >
        <v-col cols="10" lg="4" class="mx-auto">
            <v-card  class="pa-4">
                <div class="text-center">
                    <v-avatar size="90">
                        <v-img src="../assets/PDV.svg" /> 
                    </v-avatar>
                    <h2>Loja e Caixa</h2>
                </div>
                <v-form @submit.prevent="selectStoreCashier()" ref="form" >
                    <v-text-field
                        v-model="store.name"
                        :rules="rules.store"
                        disabled
                        type="text"
                        :label="`${store.name} - ${store.abbreviaiton}`"
                        prepend-inner-icon="mdi-store"
                    />
                    <v-combobox                
                        v-model="store.cashiers" 
                        :items="store.cashiers"
                        :rules="rules.cashier"
                        type="text"
                        label="cashiers"
                        prepend-inner-icon="fas fa-cash-register"
                        @click:append="passwordShow=!passwordShow"
                    />
                    <v-card-actions class="justify-center">
                        <v-spacer></v-spacer>
                        <v-btn text to='/login'>Voltar</v-btn>
                        <v-btn type="submit" color="var(--primary)" class=' mr-2'>
                        <span class="white--text px-8 ">
                            Acessar
                        </span> 
                    </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-col>
    </div>
</template>
<script>
export default {
    name:'storeCashierPage',
    computed:{
        store(){
            return this.$store.state.auth.store
        }
    },
    data:()=>({
        rules:{
            store:[
                v=>!!v || 'a loja é obrigatória!',
            ],
            cashier:[
                v=>!!v || 'o cashier é obrigatório!',
            ],
        },
    }),
    beforeMount(){
        console.log("em beforemount")
        this.$store.dispatch('getStore');
    },
}
</script>
<style lang="">
    
</style>