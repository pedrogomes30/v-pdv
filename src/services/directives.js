import * as types from './valueFormat';

export const currency = {
    beforeMount(el) {
      el.addEventListener('input', () => {
        el.value = types.typeCurrency(el.value);
      });
    },
  };
  
  export const ean = {
    beforeMount(el) {
      el.addEventListener('input', () => {
        el.value = types.typeEan(el.value);
      });
    },
  };
  
  export const document = {
    beforeMount(el) {
      el.addEventListener('input', () => {
        el.value = types.typeDocument(el.value);
      });
    },
  };
  
  export const fone = {
    beforeMount(el) {
      el.addEventListener('input', () => {
        el.value = types.typeFone(el.value);
      });
    },
  };
  