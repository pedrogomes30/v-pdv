<template>
    <v-container id="alert" >
        <v-alert
            v-show="alert.active"
            dense
            :type="alert.type"
            transition="scale-transition"
            dismissible
            @click="removerAlert()"
        >{{alert.message}}</v-alert>
    </v-container>
</template>
  <script>
    export default {
        name: 'App',
        computed:{
            alert(){
                return this.$store.state.errorHandle.alert
            }
        },
        methods:{
            removeAlert(){
                console.log('removed')
                this.$store.dispatch('AlertRemove')
            }
        }
    };
    
  </script>
  <style>
    #alert{
        position: absolute;
        align-self: center;
        width: 40%;
        padding: 0;
        margin: 0;
        background:  none;
    }
  </style>