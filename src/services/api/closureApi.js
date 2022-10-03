import configs from './config'
import Cookie from 'js-cookie'


export async function getClosure(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+Cookie.get('._token'));    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/closure`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json()
    })
    .then(result => {
        return result.data
        })
    .catch(error => {
        throw new Error(error)
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
    
    const call = await fetch(`${configs.configs.BASE_URL}/closure`, requestOptions)
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