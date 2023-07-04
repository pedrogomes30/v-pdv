import Cookie from "js-cookie";
import router from '@/services/router';

const DB_NAME = process.env.VUE_APP_DB_NAME
const DB_VERSION = process.env.VUE_APP_DB_VERSION;
let DB;


export default {
	async  getDb() {

		return new Promise((resolve, reject) => {
			if(DB) { return resolve(DB); }
				if (!window.indexedDB) {
					window.alert('Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.')
					Cookie.remove('_token')
					router.push('')
				}
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				reject('Error',e);
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				let db = e.target.result;
				db.createObjectStore('products', { autoIncrement: true, keyPath:'id' });
				db.createObjectStore('sales', { autoIncrement: true, keyPath:'id' });
				db.createObjectStore('system', { autoIncrement: true, keyPath:'id' });
				db.createObjectStore('closures', { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	
}