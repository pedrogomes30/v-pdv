<template>
    <v-form @submit.prevent="selectStoreCashier()" ref="form" >
        <v-text-field
            v-model="store.name"
            :rules="rules.store"
            disabled
            type="text"
            :label="`${store.name} - ${store.abbreviaiton}`"
            prepend-inner-icon="mdi-store"
        />
        <v-select                
            v-model="cashierSelected" 
            :items="cashiers"
            :rules="rules.cashier"
            item-text="name"
            item-value="name"
            type="combobox"
            label="selecione o caixa"
            prepend-inner-icon="fas fa-cash-register"
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
</template>

<script>
import router from '@/router';
export default {
    computed:{
        store(){
            return this.$store.state.auth.store
        },
        cashiers(){
            return this.$store.state.auth.store.cashiers
        },
        isCashier(){
            return this.$store.state.auth.login.store
        }
    },
    data:()=>({
        cashierSelected:'',
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
        if(this.isCashier){
            router.push('/')
        }else{
            this.$store.dispatch('getStore');
        }
    },
    methods: {
        selectStoreCashier(){
            if(this.$refs.form.validate()){ 
                this.loading = true;
                try{
                    this.$store.dispatch('setCashier',this.cashierSelected)  
                }catch(e){
                    alert('erro ao escolher caixa: ',e)
                }
                this.loading = false;
            }
        }        
    },
}
</script>

<style>

</style>