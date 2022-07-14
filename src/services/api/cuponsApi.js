import configs from './config'
import Cookie from 'js-cookie'

export async function getCupom (code){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') );    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        "code": code
      }),
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/cupom`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        return result.data.data
    })
    .catch(error => {
        throw new Error(error)
    });
    return call   
}