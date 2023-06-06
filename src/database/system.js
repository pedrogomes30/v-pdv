import DB from "./index"

const ENTITY = 'system';

export default{
async delete(entity) {

		let db = await DB.getDb(ENTITY);

		return new Promise(resolve => {

			let trans = db.transaction([ENTITY],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(ENTITY);
			store.delete(entity.id);
		});	
	},
	async get() {

		let db = await DB.getDb(ENTITY);

		return new Promise(resolve => {

			let trans = db.transaction([ENTITY],'readonly');
			trans.oncomplete = () => {
				resolve(entitys);
			};
			
			let store = trans.objectStore(ENTITY);
			let entitys = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					entitys.push(cursor.value)
					cursor.continue();
				}
			};


		});
	},

	async saveConfigs(configs) {
		let db = await DB.getDb('configs');
		let store = db.transaction(['configs'], 'readwrite').objectStore('configs');
	
		return new Promise(resolve => {
		let request = store.clear();
	
		request.onsuccess = () => {
			let index = 0;
			configs.forEach(config => {
			config.index = index;
			store.add(config);
			index++;
			});
	
			resolve();
		};
		});
	},
	
	async getConfigByIndex(index) {
		let db = await DB.getDb('configs');
		let store = db.transaction(['configs'], 'readonly').objectStore('configs');
		let indexStore = store.index('index');
	
		return new Promise(resolve => {
		let request = indexStore.get(index);
	
		request.onsuccess = () => {
			resolve(request.result);
		};
		});
	},
	
	
	async clear() {
		let db = await DB.getDb(ENTITY);
		return new Promise(resolve => {
			let trans = db.transaction([ENTITY], 'readwrite');
			trans.oncomplete = () => {
				resolve();
			};
			let store = trans.objectStore(ENTITY);
			store.clear();
		});
	},

	async getIndex(index) {
		let db = await DB.getDb(ENTITY);
	
		return new Promise(resolve => {
		let trans = db.transaction([ENTITY], 'readonly');
		trans.oncomplete = () => {
			resolve(config);
		};
	
		let store = trans.objectStore(ENTITY);
		let config;
	
		store.get(1).onsuccess = e => {
			let result = e.target.result;
			if (result && result.configs && result.configs.length > index) {
			config = result.configs[index];
			}
		};
		});
	}


} 

