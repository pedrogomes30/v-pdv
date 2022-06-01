import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import router from '@/router';
Vue.use(Vuex)

const state = {
  user: {
    name:'',
    email:'',
    job:''
  },//i}n front, we just have 'cashier' user and  'menagement' only.
  store: {
    id:'',
    name:'',
    abbreviation:'',
    store_group_id:'',
    store_group_name:'',
    cashiers:[],
  },
  sideMenu:true,
  formaPagamento:[
    {method:"Dinheiro",icon:'fa-solid fa-money-bill',color:'#4fd15c'},
    {method:"Cartão Crédito à Vista",icon:'fa-solid fa-credit-card',color:'#6f87ed'},
    {method:"Cartão Crédito à parcelado",icon:'fa-solid fa-money-check',color:'#5772e6'},
    {method:"Cartão Débito",icon:'fa-solid fa-money-check-dollar',color:'#ebd07f'},
    {method:"Pix",icon:'fa-brands fa-pix',color:'#77edca'},
    {method:"Crédito Funcionário",icon:'fa-solid fa-id-card',color:'#d47ba4'}
  ] 
};
const getters = {

};
const actions = {
  login({commit},user)
  {
    return new Promise(() =>{
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        var raw = JSON.stringify({
          "email": user.email,
          "password": user.password
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/v1/login", requestOptions)
          .then(response => response.text())
          .then(result => {
            result = JSON.parse(result)
            Cookie.set('._token',result.access_token)
            router.push('/storecashier')
            commit('login',result)
          })
          .catch(error => console.log('error', error));
    })
  },
    logout(){
      Cookie.get('._token');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));
      var formdata = new FormData();
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/v1/logout", requestOptions)
        .then(response => response.text())
        .then(() => {
          router.push('/login')
          Cookie.remove('._token');
        })
        .catch(error => console.log('error', error)); 
        
    },
    getStore({commit}){
      return new Promise(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/v1/store", requestOptions)
          .then(response => response.text())
          .then(result => {
            commit('getStore',JSON.parse(result))
            router.push('/novidades')
          })
          .catch(error => console.log('error', error));
      })
    }
  }




const mutations = {
  login(state,result){
    console.log(result)
    state.user.email = result.user.email,
    state.user.name = result.user.name,
    state.user.job = result.user.user_type
  }, 
  logout(state,result){
    state.user.email = result.email,
    state.user.name = result.name,
    state.user.job = result.user_type
  },
  getStore(state,result){
    state.store = result
  } 
};
export default {
  state,
  getters,
  actions,
  mutations
};
