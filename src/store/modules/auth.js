import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import router from '@/router';
Vue.use(Vuex)

const state = {
  user: {
    name:'',
    email:'',
    img:null,
    job:'',
    cashier:'',
  },//i}n front, we just have 'cashier' user and  'menagement' only.
  store: {
    id:'',
    name:'',
    abbreviation:'',
    store_group_id:'',
    store_group_name:'',
    cashiers:[],
  },
  sideMenu:false,
  formaPagamento:[
    {method:"Dinheiro",icon:'fa-solid fa-money-bill',color:'#4fd15c'},
    {method:"Cartão Crédito à Vista",icon:'fa-solid fa-credit-card',color:'#6f87ed'},
    {method:"Cartão Crédito à parcelado",icon:'fa-solid fa-money-check',color:'#5772e6'},
    {method:"Cartão Débito",icon:'fa-solid fa-money-check-dollar',color:'#ebd07f'},
    {method:"Pix",icon:'fa-brands fa-pix',color:'#77edca'},
    {method:"Crédito Funcionário",icon:'fa-solid fa-id-card',color:'#d47ba4'}
  ],
  login:{
    login:  false,
    store:  false,
  },
  error:{
    erro:false,
    errorMessage:''
  }
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
            Cookie.set('._token',result.data.access_token)
            Cookie.set('expires',(Math.round(new Date().getTime() / 1000) + result.data.expires_in))
            commit('login',result)
          })
          .catch(error => console.log("ERRO NA API",error));
    })
  },
    logout({commit}){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ Cookie.get('._token'));
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
          commit('logout')
          router.push('/login')
          Cookie.remove('._token');
        })
        .catch(error => console.log("ERRO NA API",error));
        
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

        fetch("http://127.0.0.1:8000/api/v1/me/store", requestOptions)
          .then(response => response.text())
          .then(result => {
            commit('getStore',JSON.parse(result))
          })
          .catch(error => console.log("ERRO NA API",error));
      })
    },
    setCashier({commit},cashier){
      return new Promise(() =>{
        commit('setCashier',cashier);
        router.push('/');
        }
      )
    }
  }




const mutations = {
  login(state,result){
    state.user.email    = result.data.user.email,
    state.user.name     = result.data.user.name,
    state.user.job      = result.data.user.user_type
    state.login.login   = true;
  }, 
  logout(state){
    state.user.email    = ''
    state.user.name     = ''
    state.user.job      = ''
    state.login.login   = false
    state.login.store   = false
  },
  getStore(state,result){
    state.store = result.data
  },
  setError(state,result){
    state.error.erro = true;
    state.error.errorMessage = result
  },
  setCashier(state,cashier){
    state.user.cashier= cashier
    
  } 
};
export default {
  state,
  getters,
  actions,
  mutations
};
