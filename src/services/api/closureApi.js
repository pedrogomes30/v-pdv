import Cookie from 'js-cookie'
import alert from '../errorHandler'


export async function getClosure(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/closure`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json()
    })
    .then(result => {
        return result.data
        })
    .catch(error => {
        alert('error',error.message)
    });
    return call   
}


export async function saveClosure(closure){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));
    var raw = JSON.stringify(closure);    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const call = await fetch(`${process.env.VUE_APP_BACK_URL}/closure`, requestOptions)
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