import configs from './config'
import Cookie from 'js-cookie'
import alert from '../errorHandler'

export async function getProducts (){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/product`, requestOptions)
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

export async function setWrongPrice (data,id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/product/${id}`, requestOptions)
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