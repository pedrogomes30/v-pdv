<template>
    <v-container style="display:block;position:absolute;top:-250px;" >
        <v-alert
        transition="scroll-y-transition"
        v-show="alert.active"
        
        dense
        dismissible
        :type="alert.type"
        >{{alert.message}}
        <v-progress-linear
        class="pa-0 ma-0"
        color="white"
        value="15"
        reverse
        indeterminate
        ></v-progress-linear>
        </v-alert>
    </v-container>
</template>
  
  <script>
    export default {
        name: 'App',
        computed:{
            alert(){
                return this.$store.state.alert
            }
        },
    };
    
  </script>