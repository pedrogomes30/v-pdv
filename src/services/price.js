const price = {
    listPrice(price) {
        if (price !== null && price !== undefined) {
            const formattedPrice = price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            return formattedPrice.replace('R$', '').trim();
        } else {
            return false;
        }
    }
}

export default price;
