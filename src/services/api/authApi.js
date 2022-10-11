import Cookie from 'js-cookie'
import alert from '../errorHandler'


//jwt token with no cashier
export async function Authenticate (user){
    var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": process.env.VUE_APP_TOKEN,
        "Content-Type": "application/json"
    },
    redirect: 'follow'
    };
    const call =  await fetch(`${process.env.VUE_APP_BACK_URL}/auth/${user.email}/${user.password}`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        Cookie.set('._token',result.data.access)
        Cookie.set('expires',result.data.expires)
        return result
    })
    .catch(error => {
        alert('error',error.message)
    });
    return call
}


//first configs
export async function start (){
    var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": "Bearer "+ Cookie.get('._token'),
    },
    redirect: 'follow'
    };
    const call =  await fetch(`${process.env.VUE_APP_BACK_URL}/start`, requestOptions)
    .then(response => {
        console.log('url',process.env.VUE_APP_BACK_URL)
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        if(result.data.error)throw new Error(result.data.data)
        return result.data.data
    })
    .catch(error => {
        alert('error',error.message)
    });
    return call
}


//jwt token with a cashier
export async function setCashier(cashier_id){
    var raw = JSON.stringify({
        "cashier": cashier_id
      });
    var requestOptions = {
        method: 'POST',
        body:raw,
        headers: {
            "Authorization": "Bearer "+ Cookie.get('._token'),
        },
        redirect: 'follow'
    };
    const call =  await fetch(`${process.env.VUE_APP_BACK_URL}/start`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        if(result.data.error)throw new Error(result.data.data)
        Cookie.set('._token',result.data.access)
        Cookie.set('expires',result.data.expires)
        return result
    })
    .catch(error => {
        alert('error',error.message)
    });
    return call
}