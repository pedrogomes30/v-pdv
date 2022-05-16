<template>
<div class='basePage'>
  <!-- cabeçalho -->
  <v-row no-gutters dense style='max-height:20%'>
    <v-col cols="auto" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> fa fa-newspaper</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">NOVIDADES</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col> 
    <v-col cols="auto" align-self="center" >
      
    </v-col> 
  <!--  -->
  </v-row>
  <v-row no-gutters dense>
    <v-col cols='6'>
      <v-card height="100%" width="100%">
        <v-card-title>
          <h4>comunicação</h4>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols='6'>

    </v-col>
  </v-row>
</div>
</template>

<script>
  

  export default {
    name: 'NewsPage',
    computed:{

    },
    components: {
    },
  }
</script>
