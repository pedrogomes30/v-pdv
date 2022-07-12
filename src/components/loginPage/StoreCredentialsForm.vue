<template>
    <v-form @submit.prevent="sendStoreCashier()" ref="form" >
        <v-text-field
            v-model="start.store.store_name"
            :rules="rules.store"
            disabled
            type="text"
            :label="`${start.store.store_name} - ${start.store.store_abbreviation}`"
            prepend-inner-icon="mdi-store"
        />
        <v-select                
            v-model="start.cashier_id" 
            :items="start.store.store_cashiers"
            :rules="rules.cashier"
            item-text="cashier_name"
            item-value="cashier_id"
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
import {start} from '../../services/api/authApi'
export default {
    computed:{
      
    },
    data:()=>({
        start:{
            store: {
                store_id: 1,
                store_name: "",
                store_abbreviation: "",
                store_group_id: '',
                store_group_name: "",
                store_group_theme: null,
                store_cashiers: [
                    {
                        cashier_id: '',
                        cashier_name: "example",
                        cashier_store: ''
                    },
                ]
            }
        },
        rules:{
            store:[
                v=>!!v || 'a loja é obrigatória!',
            ],
            cashier:[
                v=>!!v || 'o cashier é obrigatório!',
            ],
        },
    }),
    async beforeMount(){
        try{
           this.start = await start();
        }catch(e){
            alert(e)
        }
    },
    methods: {
        sendStoreCashier(){
            if(this.$refs.form.validate()){ 
                try{
                    let exists = this.start.store.store_cashiers.findIndex(x => x.cashier_id === this.start.cashier_id);
                    console.log(this.start.cashier_id)
                    if(exists !== -1){
                        this.loading = true;
                        this.start.cashier_name = this.start.store.store_cashiers[exists].cashier_name
                        this.loading = false;
                    }else{
                        throw new Error('store cashier not found')
                    }
                    this.$store.dispatch('start',this.start)  
                    router.push('/')
                }catch(e){
                    alert(e)
                }
            }
        }        
    },
}
</script>

<style>

</style>