import configs from './config'
import Cookie from 'js-cookie'
import alert from '../errorHandler'

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
      if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        return result.data.data
    })
    .catch(error => {
      alert('error',error.message)
    });
    return call   
}