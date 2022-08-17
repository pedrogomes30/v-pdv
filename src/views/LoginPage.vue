<template>
    <div class="background d-flex justify-center align-center" >
        <v-col cols="10" lg="4" class="mx-auto">
            <v-card  class="pa-4">
                <div class="text-center">
                    <v-avatar size="90">
                        <v-img src="../assets/PDV.svg" /> 
                    </v-avatar>
                </div>
                <div >
                    <div class='text-center'>
                        <h2>V-PDV LOGIN</h2>
                    </div>
                    <LoginCredentialsForm />
                </div>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import LoginCredentialsForm from '../components/loginPage/LoginCredentialsForm.vue';
export default {
    name:'LoginPage',
    computed:{
    },
    data:()=>({

    }),
    components:{
        LoginCredentialsForm,
    },
    methods:{
    },
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