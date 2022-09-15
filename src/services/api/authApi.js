import Cookie from 'js-cookie'
import configs from './config'
//jwt token
export async function Authenticate (user){
    var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": configs.configs.BASIC_TOKEN,
        "Content-Type": "application/json"
    },
    redirect: 'follow'
    };

    const call =  await fetch(`${configs.configs.BASE_URL}/auth/${user.email}/${user.password}`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        Cookie.set('._token',result.data.access)
        Cookie.set('expires',result.data.expires)
        return result
    })
    .catch(error => {
        throw new Error(error)
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
    const call =  await fetch(`${configs.configs.BASE_URL}/start`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        if(result.data.error)throw new Error(result.data.data)
        return result.data.data
    })
    .catch(error => {
        throw new Error(error)
    });
    return call
}

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
        const call =  await fetch(`${configs.configs.BASE_URL}/start`, requestOptions)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText);
            return response.json()
        })
        .then(result => {
            if(result.data.error)throw new Error(result.data.data)
            Cookie.set('._token',result.data.access)
            Cookie.set('expires',result.data.expires)
            return result
        })
        .catch(error => {
            throw new Error(error)
        });
        return call
}