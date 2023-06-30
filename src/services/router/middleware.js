import TokenService from '../token'

export default{
    auth(to, from, next){
        if(!TokenService.getToken()){
            next('/expired'); 
        }
        next();
    },
    
}