import DB  from "./index"

const ENTITY = 'products'

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

	async save(entity) {
		let db = await DB.getDb(ENTITY);

		return new Promise(resolve => {

			let trans = db.transaction([ENTITY],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(ENTITY);
			store.put(entity);

		});
	
	}    

} 