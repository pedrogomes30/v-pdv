import configs from './config'
import Cookie from 'js-cookie'

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