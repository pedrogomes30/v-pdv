export  async function getAdressByCep(cep){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };    
    var call = await fetch(`http://viacep.com.br/ws/${cep}/json/`, requestOptions)
    .then(response =>response.json())
    .catch(false);
    return call
}