import { format } from 'date-fns'
// import { setSale } from '../api/saleApi'


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
        newSale.status = {
            "status_id": 8,
            "status_description": "Enviando",
            "status_icon": 'fa fa-rotate',
            "status_color": 'green'
        }
        newSale.payment_method      = newSale.payments.lengh >1 ? 6 : newSale.payments[0].method_id
        newSale.sale_date           = newSale.sale_date == '' ? format(new Date(), "yyyy-MM-dd HH:mm:ss") : newSale.sale_date
        newSale.number              = newSale.number == '' ? getNumber(newSale,sales,auth) : newSale.number
        //send to back
        console.log(newSale);
        // var result                  = await setSale(newSale)
        // if(result.data.error){
        //     newSale.status      = 'Erro'
        //     newSale.sys_obs     = result.data.data
        // }else{
        //     newSale.id     = result.data.data.id
        //     newSale.nfce   = result.data.data.nfce
        //     newSale.status = 'Finalizada'
        // }
        return newSale
    }catch(e){
        newSale.status.description      = 'Erro'
        newSale.sys_obs                 = e
        console.log("ERRO AO CRIAR VENDA", e)
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
    while (!check){
        number      = numberGenerate(newSale,auth,number)
        check       = validNumber(number,sales)
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
        number          = number + (sale.total_value.toFixed())*100
        number          = number + '-'+ auth.store.store_abbreviation
        return number
    }
    update              = update.toString();
    update              = update.replace(/[^0-9]/g,'');
    update              = parseInt(update)
    update              = update +  1
    update              = update+'-'+auth.store.store_abbreviation
    return update
}
