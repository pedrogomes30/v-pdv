<template>
<div class='basePage'> 
  <!-- header -->
  <v-row no-gutters dense >
    <v-col cols="cols-10" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> mdi-cart-check</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">FECHAMENTOS DE CAIXA</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col>  
    <v-col>
      <v-row class="d-flex flex-row-reverse pr-5 pt-3">
        <NewClosureForm />
        <NewWithdrawalForm/>
      </v-row>
    </v-col>
  </v-row>
  <!-- body -->
  <div  style="height:100%" id="exemplo">
       <!-- <ManagerView />         -->
       <ClosureList />
  </div>
</div>
</template>

<script>
  // import ManagerView from '../components/fechamento/ManagerView'
  import NewClosureForm from '../components/fechamento/NewClosureForm';
  import NewWithdrawalForm from '../components/fechamento/NewWithdrawalForm';
import ClosureList from '@/components/fechamento/ClosureList.vue';  
export default {
    name: 'ClosurePage',
  components:{
    // ManagerView,
    NewClosureForm,
    NewWithdrawalForm,
    ClosureList
}
  }
</script>
<style>
  #body_content{
    height: 90vh;
  }
</style>