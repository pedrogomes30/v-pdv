import configs from './config'
import Cookie from 'js-cookie'

export async function setSale (sale){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer " + Cookie.get('._token') ); 
    var raw = JSON.stringify({
        sale
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
    };    
    const call = await fetch(`${configs.configs.BASE_URL}/sale`, requestOptions)
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