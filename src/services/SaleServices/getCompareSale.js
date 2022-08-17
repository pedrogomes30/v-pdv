export   function mergeSales(to_sync_sales, salesServe){
    var result = {
        up:[],
        not_up:[]
    }
    // not cache
    if(!to_sync_sales || to_sync_sales.length === 0){
        result.up     = salesServe
        result.not_up = false
        return result
    } 
    //not server sales
    if(!salesServe || salesServe.length === 0){
        result.up     = false
        result.not_up = to_sync_sales
        return result
    }
    //marge
    if(to_sync_sales.length >0){
        to_sync_sales.forEach((to_sync_sale) => {
            let exists = salesServe.findIndex(x => x.number === to_sync_sale.number);
            if(exists === -1){
                result.not_up.push(to_sync_sale)
            }
        });
    }
    result.up = salesServe
    return result
}