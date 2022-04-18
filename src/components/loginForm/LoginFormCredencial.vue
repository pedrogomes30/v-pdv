<template>
    <v-card-text>
        <v-text-field
            v-model="user"
            :rules="userRules"
            type="user"
            label="Usuário"
            placeholder="Usuário"
            prepend-inner-icon="mdi-account"
        />
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="passwordShow?'text':'password'"
            label="Senha"
            placeholder="Senha"
            prepend-inner-icon="mdi-key"
            :append-icon="passwordShow?'mdi-eye':'mdi-eye-off'"
            @click:append="passwordShow=!passwordShow"
        />
        <v-row align="center">
            <v-switch label="Lembrar-me" color="#d40279" ></v-switch>
            <a href="/passRecover" class="pa-4"> Recuperar senha</a>
        </v-row>
    </v-card-text>
</template>

<script>
export default {
    data:()=>({
       
        snackbar:false,
        passwordShow:false,
        password:'',
        passwordRules:[
            v=>!!v || 'a senha é obrigatória!',
        ],
        user:'',
        userRules:[
            v=>!!v || 'o usuário é obrigatório!',
        ],
    }),
    methods:{
        
    },
}
</script>

<style>

</style>