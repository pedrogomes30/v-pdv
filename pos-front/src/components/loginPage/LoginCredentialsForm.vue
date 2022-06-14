<template>
   
        <v-form @submit.prevent="login()" ref="form" >
            <v-text-field
                v-model="userTemp.email"
                :rules="rules.email"
                type="email"
                label="E-mail"
                prepend-inner-icon="mdi-account"
            />
            <v-text-field
                v-model="userTemp.password"
                :rules="rules.password"
                :type="passwordShow?'text':'password'"
                label="password"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow?'mdi-eye':'mdi-eye-off'"
                @click:append="passwordShow=!passwordShow"
                class='pb-0 mb-0'
            />
            <!-- btn avançar, enviar -->
            <v-menu
            v-model="passRecover"
            :close-on-content-click="false"
            :nudge-width="200"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-spacer></v-spacer>
                    <span 
                    @click='!passRecover'
                    style='font-size:0.75rem;color:#ED0280;text-align:end;'
                    v-bind="attrs" 
                    class='mb-1'
                    v-on="on">
                        esqueci minha senha.
                    </span>
                </template>
                <!-- FORM localizar Usuario -->
                <v-card >
                    <v-list>
                    <v-list-item>
                        <v-list-item-avatar rouded color="var(--primary">
                            <v-icon color="white"> fa fa-at</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                        <v-list-item-title>Recuperar Senha</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-card-subtitle>
                            Favor informar o e-mail abaixo apra recuperação de Senha
                        </v-card-subtitle>
                    <v-text-field
                        label="Email"
                        hide-details="auto"
                        color="var(--primary)"
                        v-model=userTemp.email
                        hide-spin-buttons
                        class='pa-2'
                        :rules='rules.validarDocumento'
                        type='text'
                        prepend-icon='fa fa-at'
                        autofocus>                
                    </v-text-field>
                    </v-list>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="passRecover=!passRecover">Cancelar</v-btn>
                    <v-btn 
                        color="var(--primary)" 
                        text @click="enviarRecuperacao()" 
                    >salvar</v-btn>
                    </v-card-actions> 
                     </v-card>
                    </v-menu>
                    <!--  -->
                    <v-card-actions class="justify-center">
                    <!-- btn recuperar password, voltar -->
                    <v-btn 
                        :loading="loading" 
                        type="submit" color="var(--primary)" class=' mr-2'>
                        <span class="white--text px-8 ">
                            Login
                        </span> 
                    </v-btn>
                    </v-card-actions>
                </v-form> 
</template>

<script>
export default {
    data:()=>({
        loading:false,
        snackbar:false,
        passwordShow:false,
        passRecover:false,
        rules:{
            password:[
                v=>!!v || 'a password é obrigatória!',
            ],
            email:[
                v=>!!v || 'o email é obrigatório!',
            ],
        },
        userTemp:{
            email:'',
            password:'',
        },
    }),
    methods:{
        login(){
            if(this.$refs.form.validate()){ 
                this.loading = true;
                try{
                    this.$store.dispatch('login',this.userTemp)  
                }catch(e){
                    alert('erro ao fazer login: ',e)
                }
                this.loading = false;
            }
        },
    }
}
</script>

<style>

</style>