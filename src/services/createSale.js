import { format } from 'date-fns'
import { setSale } from './api/saleApi'


//set a salenumber, store, cashier, date, employee, and send to backend a valid sale, and return it with backend id or not(error case)

export default async function generateSale(newSale,sales,auth){
    try{
        newSale.store               = {
            store_id : auth.store.store_id,
            store_name : auth.store.store_name,
            store_abbreviation : auth.store.store_abbreviation
        }
        newSale.cashier             = {
            cashier_id : auth.cashier_id,
            cashier_name : auth.cashier_name
        }
        newSale.employee_cashier    = {
            user_id : auth.user_id,
            user_name : auth.user_name
        }
        newSale.payment_method      = newSale.payments.lengh >1 ? 6 : newSale.payments[0].method_id
        newSale.number              = getNumber(newSale,sales,auth)
        newSale.sale_date           = format(new Date(), "yyyy-MM-dd HH:mm:ss")
        var result                  = await setSale(newSale)
        if(result.data.error){
            newSale.status = 'Erro'
            newSale.obs    = newSale.obs+'-> error info: '+result.data.data
        }else{
            newSale.id     = result.data.data.id
            newSale.nfce   = result.data.data.nfce
            newSale.status = 'Finalizada'
        }
        return newSale
    }catch(e){
        newSale.status = 'Erro'
        console.log('error',e)
        return newSale
    }
}
//check if this number already exists in sale list
function validNumber(number,sales){
    let exists = sales.findIndex(x => x.number === number);
    if(exists === -1){
        return true
    }
    return false
}

function getNumber(newSale,sales,auth){
    var number      = numberGenerate(newSale,auth,false)
    var check       = validNumber(number,sales)
    console.log('FIRST GENERATE-- number -> ',number,'CHECK-> ',check)
    while (!check){
        number      = numberGenerate(newSale,auth,number)
        check       = validNumber(number,sales)
        console.log("CHECKS -> ",check,' NUMBER -> ',number)
        break
    }
    return number
}

//return a sale stributes number
export function numberGenerate(sale,auth,update=false){    
    if(!update){
        var number      = format(new Date(), "yyyyMMddkkmm")
        number          = number + auth.store.store_id
        number          = number + auth.cashier_id
        number          = number + auth.user_id
        number          = number + sale.payment_method
        number          = number + (Math.round(sale.total_value)*100)
        number          = number + '-'+ auth.store.store_abbreviation
        console.log('generates',number)
        return number
    }
    console.log('updates 0/4',update)
    update              = update.toString();
    console.log('updates 1/4',update)
    update              = update.replace(/[^0-9]/g,'');
    console.log('updates 2/4',update)
    update              = parseInt(update)
    console.log('updates 3/4',update,typeof(update))
    update              = update +  1
    console.log('updates 3/4',update,typeof(update))
    update              = update+'-'+auth.store.store_abbreviation
    console.log('updates 4/4',update)
    return update
}


