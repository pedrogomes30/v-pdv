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

                    <v-form @submit.prevent="submitHandler" ref="form" >
                        <div v-if="isLogin">
                            <LoginFormStore/>
                        </div>
                        <div v-else>
                            <LoginFormCredencial/>
                        </div>
                        <v-card-actions class="justify-center">
                        <v-btn :loading="loading" type="submit" color="#d40279">
                            <span class="white--text px-8">
                                {{btCall}}
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
import LoginFormCredencial from '../components/loginForm/LoginFormCredencial.vue';
import LoginFormStore from '../components/loginForm/LoginFormStore.vue';
export default {
    LoginForm : LoginFormCredencial,
    name:'LoginPage',
    data:()=>({
         loading:false,
        isLogin: false,
        btCall: "Avançar",
    }),
    methods:{
        submitHandler(){
            if(this.$refs.form.validate()){ 
                this.loading = true
                this.btCall = "Login"
                // momento onde é chamado a api de login do gerenciador
                setTimeout(()=>{
                    this.isLogin = true
                    this.loading = false
                    this.snackbar = true
                },3000)
                
            }
        },
    },
    components:{
        LoginFormCredencial,
        LoginFormStore,
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