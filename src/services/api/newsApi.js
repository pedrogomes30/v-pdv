import configs from './config'
import Cookie from 'js-cookie'
import alert from '../errorHandler' 


//GET NEWS
export async function getNews (){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') );    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/news`, requestOptions)
    .then(response => {
        if(!response.ok) {
            throw new Error(`${response.status} - ${response.statusText} `);
        }
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

// SAVE COMENTS
export async function saveComent (coment){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') );    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body:JSON.stringify(coment)
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/news/coment`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status}- ${response.statusText}`);
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

// SAVE REACTIONS
export async function saveReaction (reaction){
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer "+Cookie.get('._token') );    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body:JSON.stringify(reaction)
    };
    
    const call = await fetch(`${configs.configs.BASE_URL}/news/reaction`, requestOptions)
    .then(response => {
        if(!response.ok) throw new Error(`${response.status}- ${response.statusText}`);
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