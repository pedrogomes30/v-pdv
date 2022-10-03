import configs from './config'
import Cookie from 'js-cookie'


export async function getWithdrawal(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/withdrawal`, requestOptions)
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
export async function getWithdrawalAccount(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/withdrawal/accounts`, requestOptions)
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

export async function saveWithdrawal(withdrawal){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));
    var raw = JSON.stringify(withdrawal);    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/withdrawal`, requestOptions)
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

export async function deleteWithdrawal(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));   
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/withdrawal/${id}`, requestOptions)
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