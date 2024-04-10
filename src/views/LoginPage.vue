<template>
    <div class="background d-flex justify-center align-center" >
        <LoadComponent :overlay="loading" />
        <v-card  
            width="60%"
            elevation='24'
            class="pa-4 text-center ">
                <v-avatar size="90">
                    <v-img src="../assets/PDV.svg" /> 
                </v-avatar>
                <h2 >Autenticação</h2>
                <v-form @submit.prevent="login()" ref="form" >
                    <v-text-field
                        v-model="userTemp.email"
                        :rules="rules.email"
                        type="email"
                        label="Usuário"
                        prepend-inner-icon="mdi-account"
                    />
                    <v-text-field
                        v-model="userTemp.password"
                        :rules="rules.password"
                        :type="passwordShow?'text':'password'"
                        label="Senha"
                        prepend-inner-icon="mdi-key"
                        :append-icon="passwordShow?'mdi-eye':'mdi-eye-off'"
                        @click:append="passwordShow=!passwordShow"
                        class='pb-0 mb-0'
                    />
                    <v-card-actions class="justify-end mt-5">
                        <v-btn 
                            color="var(--primary)" class=' mr-2' text @click="passRecover = !passRecover">
                            <span class="pl-3 ">
                            esqueci minha senha
                            </span> 
                        </v-btn>
                        <v-btn 
                        type="submit" color="var(--primary)" class=' mr-2'>
                            <v-icon color="white">fa fa-right-to-bracket</v-icon>
                            <span class="white--text pl-3 ">
                                Logar-se!
                            </span> 
                        </v-btn>
                    </v-card-actions>
                </v-form> 
                <!-- EMAIL RECOVERY -->
                <v-expand-transition>
                    <div v-show="passRecover">
                        <v-divider></v-divider>
                        <v-card width="100%">
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
                            <v-list>
                                <v-card-subtitle>
                                    Favor informar o e-mail abaixo apra recuperação de Senha
                                </v-card-subtitle>
                                <v-text-field
                                    label="Email"
                                    hide-details="auto"
                                    color="var(--primary)"
                                    v-model=userTemp.emailRecovery
                                    hide-spin-buttons
                                    class='pa-2'
                                    :rules='rules.validarDocumento'
                                    type='text'
                                    prepend-icon='fa fa-at'
                                    autofocus>                
                                </v-text-field>
                            </v-list>
                            <v-card-actions>
                            <v-btn 
                                color="var(--primary)" 
                                text @click="enviarRecuperacao()" 
                            >Enviar</v-btn>
                            </v-card-actions> 
                        </v-card>
                    </div>
                </v-expand-transition>
        </v-card>
    </div>
</template>

<script>
import {Authenticate} from '../services/api/authApi'
import router from '@/router';
import LoadComponent from '../components/SysComponents/LoadComponent.vue';
export default {
    name:'LoginPage',
    computed:{
    },
    data:()=>({
        loading: false,
        snackbar: false,
        passwordShow: false,
        passRecover: false,
        alert:{
            type:'',
            message:'',
            active:false,
        },
        rules: {
            password: [
                v => !!v || "Informe a senha",
            ],
            email: [
                v => !!v || "Informe o e-mail",
            ],
            validarDocumento: [
                v => !!v || "informe email de recuperação",
            ],
        },
        userTemp: {
            email: "",
            password: "",
            emailRecovery:''
        },
    }),
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                try {
                    await Authenticate(this.userTemp);                    
                    router.push("/start");
                }
                catch (e) {
                    console.log("SHOW RESULT",e)
                    this.$store.dispatch('Alert',{type:'error',message:e})
                }
                this.loading = false;
            }
        },
        enviarRecuperacao(){
            this.rules.validarDocumento = [true]
            this.rules.validarDocumento = ['serviço de recuperar e-mail ainda está indisponivel!']
        }
    },
    components: { LoadComponent },
    beforeMount() {
        this.transition = true
    }
    }
</script>

<style>
.background{
    height: 100%;
    width:100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}
</style>