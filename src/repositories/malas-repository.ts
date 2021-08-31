import Item from '../models/item'
import Mala from '../models/mala'
import database from './database'
import itensRepository from './itens-repository'

const malasRepository = {
	criar: (mala: Mala, callback: (id?: number) => void) => {

		const insereItens = (itens: Item[], malaId: number, callback: (id?: number) => void) => {
			if (itens.length === 0) {
				callback(malaId)
			} else {
				const item = itens.pop()
				if (item?.id) {
					const sql = 'INSERT INTO malas_item (malaId, itemId) VALUES (?,?)'
					const params = [malaId, item.id]
					database.run(sql, params, function (_err) {
						insereItens(itens, malaId, callback)
					})
				}	
			}
		}

		const sql = 'INSERT INTO malas ( tituloMala, descricaoMala ) VALUES (?,?)'
		const params = [mala.tituloMala,mala.descricaoMala]
		database.run(sql, params, function (_err) {
			const lookId = this?.lastID
			insereItens(mala.item, lookId, callback)
		})
	},
	

	lerTodos: (callback: (malas: Mala[]) => void) => {
		const sql = 'SELECT * FROM malas'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (mala?: Mala) => void) => {
		const sql = 'SELECT * FROM malas WHERE MalaId = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, mala: Mala, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE malas SET tituloMala = ?, descricaoMala = ? WHERE id = ?'
		const params = [mala.tituloMala, mala.descricaoMala, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		itensRepository.apagarDaMala(id, () => {
		const sql = 'SELECT FROM malas WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	})
},
}

export default malasRepository