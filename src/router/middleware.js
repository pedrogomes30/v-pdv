import TokenService from '../services/token'

export default{
    auth(to, from, next){
        if(!TokenService.isValid()){
            next('/expired'); 
        }
        next();
    },
    
}