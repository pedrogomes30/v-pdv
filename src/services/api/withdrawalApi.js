import Cookie from 'js-cookie'
import alert from '../errorHandler'


export async function getWithdrawal(manager,store){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/withdrawal?manager=${manager}&store=${store}`, requestOptions)
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
export async function getWithdrawalAccount(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/withdrawal?accounts=1`, requestOptions)
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
    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/withdrawal`, requestOptions)
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

export async function deleteWithdrawal(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));   
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/withdrawal/${id}`, requestOptions)
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