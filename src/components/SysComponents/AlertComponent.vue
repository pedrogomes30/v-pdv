<template>
    <v-app>
        <v-alert v-show="alert.active" elevation="24" floating color="red accent-2" dense icon="fa fa-triangle-exclamation" >
            example
        </v-alert>
    </v-app>
  </template>
  
  <script>

  export default {
    name: 'App',
    props:{
        alert:{
            type:String,
            message:String,
            active:Boolean,
        }
    }
  };
  </script>