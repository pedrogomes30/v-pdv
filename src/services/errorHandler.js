import Store from '../store/index'
import router from '@/router'

export default function alert(type='success',message){
    console.log(message)
    switch(type){
        case 'success':
            break
        case 'error':
            var code = message.replace(/[^0-9]/g,'');
            if(code == 401){
                router.push("/expired");
            }
            break
        }
    Store.dispatch('Alert',{type:type,message:message})
}
