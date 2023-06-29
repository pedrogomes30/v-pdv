import TokenService from '../services/token'

export default{
    auth(to, from, next){
        if(!TokenService.getToken()){
            next('/expired'); 
        }
        next();
    },
    
}