export function typeDocument(value) {
    value = value.replace(/\D/g, '');
    const maxDigitsCpf = 11;
    const maxDigitsCnpj = 14;
  
    if (value.length <= maxDigitsCpf) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length <= maxDigitsCnpj) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    }
  
    const maxLength = 14;
    return value.substring(0, maxLength);
}

export function typeCurrency(value) {
  console.log('Input:', value);

  value = value.replace(/\D/g, '');

  while (value.length < 3) {
      value = '0' + value;
  }

  value = (value / 100).toFixed(2);
  return `R$ ${value}`;
}


  
export function typeEan(value) {
    value = value.replace(/\D/g, '');
    value = value.substring(0, 13);
    return value;
}

export function typeFone(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    const maxLength = 11;
    return value.substring(0, maxLength);
}