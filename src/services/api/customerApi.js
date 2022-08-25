import configs from './config'
import Cookie from 'js-cookie'

export async function getCustomer (document){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') ); 
    var raw = JSON.stringify({
        "document": document
    }); 
    console.log(raw)
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body:raw,
      redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/customer`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(error => {
        throw new Error(error)
    });
    return call   
}

export async function setCustomer (customer){
    console.log('setcutomerApi',customer)
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') ); 
    var raw = JSON.stringify({
        customer
    }); 
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:raw,
      redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/customer`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(error => {
        throw new Error(error)
    });
    return call   
}