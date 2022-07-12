const state = {
    pessoas:[
        //(cliente(fisico, juridico), funcionario, funcionarioParc, filial, empresaParc)
        {

            documento:'46629364031',
            nome:'exemplo de cliente fisico',
            email:'exemploCliente@email.com',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:'cliente',             
        },
        {
            //só pode ser cadastrado no gerenciador
            documento:'95479374052',
            nome:'exemplo de funcionário',
            email:'exemploFuncionario@email.com',
            telefone:'',
            empresaParc:'43745839000161',
            nomeEmpresaParc:'Loja A',
            tipo:'funcionario',         
        },
        {
            //obrigatorio neste tipo de cliente
            documento:'51213314011',
            nome:'exemplo de funcionário parceiro',
            email:'exemploFuncionarioParc@email.com',
            telefone:'',
            empresaParc:'47516941000146',
            nomeEmpresaParc:'EMPRESA DE ROUPAS',
            tipo:'funcionarioParceiro', 
            //        
        },
        {
            documento:'48607319000106',
            nome:'exemplo de cliente juridico',
            email:'exemploClienteEmpresa@email.com',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:'cliente',             
        },
        {
            //só pode ser cadastrado no gerenciador
            documento:'43745839000161',
            nome:'LOJA AVENIDA',
            email:'LOJA AVENIDA@email.com',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:'filial', 
            //        
        },
        {
            //quando empresa parceira, não precisa do documento e email
            documento:'47516941000146',
            nome:'exemplo de loja parceira',
            email:'exemploFuncionarioParc@email.com',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:'empresaParceira',         
        },
    ],
};
const actions = {
    updatePessoa({commit},pessoa){
        return new Promise(resolve =>{
            console.log(pessoa)
            //obter da api 
            const newPessoa = pessoa 
            commit('updatePessoa',newPessoa)
            resolve()
        })
    },    
};
const mutations = {
    updatePessoa(state,newPessoa){
        state.pessoa.push(newPessoa)
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