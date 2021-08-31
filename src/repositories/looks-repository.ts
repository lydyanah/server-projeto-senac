import Item from '../models/item'
import Look from '../models/look'
import database from './database'
import itensRepository from './itens-repository'

const looksRepository = {
	criar: (look: Look, callback: (id?: number) => void) => {

		const insereItens = (itens: Item[], lookId: number, callback: (id?: number) => void) => {
			if (itens.length === 0) {
				callback(lookId)
			} else {
				const item = itens.pop()
				if (item?.id) {
					const sql = 'INSERT INTO looks_item (lookId, itemId) VALUES (?,?)'
					const params = [lookId, item.id]
					database.run(sql, params, function (_err) {
						insereItens(itens, lookId, callback)
					})
				}	
			}
		}

		const sql = 'INSERT INTO looks ( descricaoLook, tagsLook) VALUES (?,?)'
		const params = [look.descricaoLook, look.tagsLook]
		database.run(sql, params, function (_err) {
			const lookId = this?.lastID
			insereItens(look.item, lookId, callback)
		})
	},

	lerTodos: (callback: (looks: Look[]) => void) => {
		const sql = 'SELECT * FROM Looks'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (Look?: Look) => void) => {
		const sql = 'SELECT * FROM Looks WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, look: Look, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE looks SET ocasioesLook = ?, estacaoLook = ? WHERE idLook = ?'
		const params = [look.descricaoLook,id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

		apagar: (id: number, callback: (notFound: boolean) => void) => {
			itensRepository.apagarDoLook(id, () => {
			const sql = 'SELECT FROM looks WHERE id = ?'
			const params = [id]
			database.run(sql, params, function(_err) {
				callback(this.changes === 0)
			})
		})
	},
}

export default looksRepository