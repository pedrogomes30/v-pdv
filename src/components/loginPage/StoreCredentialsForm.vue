<template>
    <v-form @submit.prevent="setStart()" ref="form" >
        <v-text-field
            v-model="startValue.store.store_name"
            :rules="rules.store"
            disabled
            type="text"
            :label="`${startValue.store.store_name} - ${startValue.store.store_abbreviation}`"
            prepend-inner-icon="mdi-store"
        />
        <v-select                
            v-model="cashier_selected.cashier_id" 
            :items="startValue.store.store_cashiers"
            :rules="rules.cashier"
            item-text="cashier_name"
            item-value="cashier_id"
            type="combobox"
            label="selecione o caixa"
            @change="verifyCashier"
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
        <v-dialog
            v-model="dialog"
            max-width="350"
            @click:outside="noKickUser"
            >
            <v-card>
                <v-card-title class="text-h5">
                Caixa já com um usuário
                </v-card-title>

                <v-card-text>
                O usuário <b>{{cashier_selected.user_authenticated?cashier_selected.user_authenticated.user_name : '' }}</b> está logado neste caixa, deseja remove-lo e conectar a este caixa ?
                <!-- há um usuario conectadoa  este caixa deseja derrubá-lo ? -->
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="noKickUser"
                >
                    Não derrubar
                </v-btn>

                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog=false"
                >
                    Derrubar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import router from '@/router';
import {start, setCashier} from '../../services/api/authApi'
// import {mapAction} from 'vuex'
export default {
    computed:{
    //   ...mapState(['auth'])
    },
    data:()=>({
        startValue:{
            store: {
                store_id: 1,
                store_name: "SEM RESULTADO DE LOJA",
                store_abbreviation: "",
                store_group_id: '',
                store_group_name: "",
                store_group_theme: null,
                store_cashiers: [
                    {
                        cashier_id: '',
                        cashier_name: "Selecione um caixa",
                        cashier_store: ''
                    },
                ]
            },
        },
        cashier_selected:{
            cashier_id: '',
            cashier_name: "Selecione um caixa",
            cashier_store: '',
            user_authenticated: {
                user_id: '',
                user_name: ''
            }          
        },
        dialog:false,
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
           this.startValue = await start();
           this.cashier_selected = []
        }catch(e){
            alert(e)
        }
    },
    methods: {
        verifyCashier(){
            if(this.$refs.form.validate()){ 
                try{
                    let exists = this.startValue.store.store_cashiers.findIndex(x => x.cashier_id === this.cashier_selected.cashier_id);
                    if(exists !== -1){
                        var cashier_selected = this.startValue.store.store_cashiers[exists]
                        if(cashier_selected.user_authenticated && cashier_selected.user_authenticated.user_id !== this.startValue.user_id){
                            this.cashier_selected = Object.assign({},cashier_selected) 
                            this.dialog = true
                        }else{
                            this.cashier_selected = Object.assign({},cashier_selected) 
                        }
                    }else{
                        throw new Error('store cashier not found')
                    }
                }catch(e){
                    alert(e)
                }
            }
        },
        noKickUser(){
            this.dialog = false
            this.cashier_selected = []  
        },
        async setStart(){
            if(this.cashier_selected.cashier_id !== ''){
                this.loading = true;
                await setCashier(this.cashier_selected.cashier_id)
                this.startValue.cashier_id      = this.cashier_selected.cashier_id
                this.startValue.cashier_name    = this.cashier_selected.cashier_name
                this.$store.dispatch('start',this.startValue)  
                router.push('/')
                this.loading = false; 
            }
        }
    },
}
</script>

<style>

</style>