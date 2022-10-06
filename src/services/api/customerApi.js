import Cookie from 'js-cookie'
import alert from '../errorHandler'

export async function getCustomer (document){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') ); 
    var raw = JSON.stringify({
        "document": document
    }); 
        var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body:raw,
      redirect: 'follow'
    };    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/customer`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(error => {
        alert('error',error.message)
    });
    return call   
}

export async function setCustomer (customer){
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
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/customer`, requestOptions)
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