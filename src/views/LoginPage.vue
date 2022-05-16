<template>
    <v-app>
        <v-main class="background d-flex justify-center align-center" >
            <v-col cols="10" lg="4" class="mx-auto">
                <v-card  class="pa-4">
                    <div class="text-center">
                        <v-avatar size="90">
                            <v-img src="../assets/PDV.svg" /> 
                        </v-avatar>
                        <h2>V-PDV LOGIN</h2>
                    </div>
                    <!-- já informado Login -->
                    <v-form @submit.prevent="isLogin?goto():makeLogin()" ref="form" >
                        <div v-if="isLogin">
                            <v-text-field
                                v-model="usuario.loja"
                                :rules="rules.store"
                                disabled
                                type="text"
                                :label="`${usuario.loja} - ${usuario.abreviacao}`"
                                prepend-inner-icon="mdi-store"
                            />
                            <v-combobox
                                
                                v-model="usuario.caixaNome"
                                :items="usuario.caixas"
                                :rules="rules.caixaNome"
                                type="text"
                                label="Caixa"
                                prepend-inner-icon="fas fa-cash-register"
                                @click:append="passwordShow=!passwordShow"
                            />
                        </div>
                        <!-- não informado o login -->
                        <div v-else>
                            <v-text-field
                                v-model="usuarioTemp.login"
                                :rules="rules.usuario"
                                type="user"
                                label="Usuário"
                                placeholder="Usuário"
                                prepend-inner-icon="mdi-account"
                            />
                            <v-text-field
                                v-model="usuarioTemp.senha"
                                :rules="rules.senha"
                                :type="passwordShow?'text':'password'"
                                label="Senha"
                                placeholder="Senha"
                                prepend-inner-icon="mdi-key"
                                :append-icon="passwordShow?'mdi-eye':'mdi-eye-off'"
                                @click:append="passwordShow=!passwordShow"
                            />
                        </div>
                        <v-card-actions class="justify-center">
                        <!-- btn avançar, enviar -->
                        
                             <v-menu
                                v-model="recuperarSenha"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn @click='isLogin?backRecover():recoverPass()' 
                                        color="white" 
                                        class='ml-2 mr-2'
                                        light
                                        v-bind="attrs" 
                                        v-on="on"
                                        title="Recuperar Senha"
                                        >
                                        <span class=" px-8">
                                            {{btEsquerda}}
                                        </span>
                                    </v-btn>   
                                </template>
                                <!-- FORM localizar cliente -->
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
                                            Favor informar o e-mail abaixo apra recuperação de senha
                                        </v-card-subtitle>
                                    <v-text-field
                                        label="Email"
                                        hide-details="auto"
                                        color="var(--primary)"
                                        v-model=usuario.email
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
                                    <v-btn text @click="!recuperarSenha">Cancelar</v-btn>
                                    <v-btn color="var(--primary)" text @click="enviarRecuperacao()">salvar</v-btn>
                                    </v-card-actions>
                                </v-card>
                                <!--  -->
                            </v-menu>
                        <!-- btn recuperar senha, voltar -->
                        <v-btn :loading="loading" type="submit" color="var(--primary)" class=' mr-2'>
                            <span class="white--text px-8 ">
                                {{btDireita}}
                            </span> 
                        </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-main>
    
    </v-app>
</template>

<script>
import router from '@/router';
export default {
    name:'LoginPage',
    computed:{
        usuario(){
            return this.$store.state.auth
        }
    },
    data:()=>({
        loading:false,
        isLogin: false,
        btDireita: "Avançar",
        btEsquerda: "Recuperar Senha",
        snackbar:false,
        passwordShow:false,
        recuperarSenha:false,
        stores:'storeExample', //retorno da loja do usuario
        usuarioTemp:{
            login:'',
            senha:'',
        },
        rules:{
            senha:[
                v=>!!v || 'a senha é obrigatória!',
            ],
            usuario:[
                v=>!!v || 'o usuário é obrigatório!',
            ],
            store:[
                v=>!!v || 'a loja é obrigatória!',
            ],
            caixa:[
                v=>!!v || 'o caixa é obrigatório!',
            ],
        },
    }),
    methods:{
        enviarRecuperacao(){
            console.log(this.usuario.email)
            this.recuperarSenha = false
        },
        makeLogin(){
            if(this.$refs.form.validate()){ 
                try{
                    this.$store.dispatch('makeLogin',this.usuarioTemp)  
                    this.btDireita = 'Login'
                    this.btEsquerda = 'voltar'
                    this.isLogin=true
                }catch(e){
                    alert('erro ao fazer login: ',e)
                }
            }
        },
        goto(){
            if(this.isLogin){
                router.push('/novidades')
            }
        },
        backRecover(){
            this.isLogin = !this.isLogin
        },
        recoverPass(){
            this.recuperarSenha = !this.recuperarSenha
        }
    },
    components:{
    }
}
</script>
    
<style>
.background{
    background-image: radial-gradient( #d40279 , #541A3B) !important;
    height: 100%;
    width:100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}
</style>

<style scoped>

</style>