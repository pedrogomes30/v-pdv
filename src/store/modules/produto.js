// import axios from 'axios';
import {Produtos} from '../../api/gerenciadorPdv/produtoApi'

const state = {
    produtos: Produtos,
    categorias:[
        {id:2,categoria:"ADORNOS/PRESENTES",ncm:49090000,cor:'#7789fc'},
        {id:3,categoria:"PELUCIAS",ncm:58012300,cor:'#77bafc'},
        {id:4,categoria:"MAQUIAGEM",ncm:42021210,cor:'#de96fa'},
        {id:5,categoria:"ACESSORIOS DE CABELO",ncm:62171000,cor:'#93db95'},
        {id:6,categoria:"ACESSORIOS DE MAQUIAGEM",ncm:96162000,cor:'#e68eb7'},
        {id:7,categoria:"ANEIS",ncm:71110000,cor:'#e68eb7'},
        {id:8,categoria:"BRINCOS",ncm:71171900,cor:'#e68eb7'},
        {id:9,categoria:"CHAPEU",ncm:65050031,cor:'#e68eb7'},
        {id:10,categoria:"CINTOS",ncm:42033000,cor:'#e68eb7'},
        {id:11,categoria:"CARTEIRAS",ncm:42022100,cor:'#e68eb7'},
        {id:12,categoria:"BOLSAS",ncm:42022220,cor:'#e68eb7'},
        {id:13,categoria:"UNHAS",ncm:68053090,cor:'#e68eb7'},
        {id:14,categoria:"NECESSAIR",ncm:42021220,cor:'#e68eb7'},
        {id:15,categoria:"PRODUTOS PARA CABELO",ncm:33059000,cor:'#e68eb7'},
        {id:16,categoria:"CUIDADOS COM A PELE",ncm:33049910,cor:'#e68eb7'},
        {id:17,categoria:"BIJUTERIAS",ncm:71179000,cor:'#e68eb7'},
        {id:18,categoria:"OCULOS",ncm:90041000,cor:'#e68eb7'},
        {id:19,categoria:"CADASTRO ANTIGO",ncm:71179000,cor:'#e68eb7'},
        {id:20,categoria:"RELOGIOS",ncm:91061000,cor:'#e68eb7'},
        {id:21,categoria:"INVERNO",ncm:61169100,cor:'#e68eb7'},
    ],
};
const actions = {
    updateProducts({commit},produtos){
        return new Promise(resolve =>{
            
            resolve(commit('returnProducts',produtos))
        })
    },
};
const mutations = {
    returnProducts(state, produto){
        if (produto === null){
            state.produto = Produtos
        }
    },
};
const getters = {
    
};
export default {
  state,
  getters,
  actions,
  mutations
};