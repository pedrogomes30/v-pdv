<template>
    <v-container id="alert" >
        <v-alert
            v-show="alert.active"
            dense
            :type="alert.type"
            transition="scale-transition"
            @click="removeAlert()"
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
                this.$store.dispatch('AlertRemove')
            }
        }
    };
    
  </script>
  <style>
    #alert{
        z-index: 0;
        position: absolute;
        align-self: center;
        padding: 10px;
        width: 40%;
        margin: 0;
        background:  none;
    }
  </style>