const price = {
    listPrice(price){
        const formattedPrice = price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formattedPrice.replace('R$', '').trim();
    }
}

export default price;