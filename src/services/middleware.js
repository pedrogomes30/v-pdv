import Cookie from 'js-cookie';
export default{
    auth(to, from, next){
        const token = Cookie.get('._token');
        const expires = Cookie.get('expires');
        var now = Math.round(new Date().getTime() / 1000)
        if(!token || expires <= now){
            next('/expired'); 
        }
        next();
    },
    
}