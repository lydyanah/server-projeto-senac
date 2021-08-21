import Item from '../models/item'
import database from './database'

const itensRepository = {
	criar: (item: Item, callback: (idItem?: number) => void) => {
		const sql = 'INSERT INTO itens (nome, descricao, categoria, subcategoria, tamanho, cor, marca) VALUES (?, ?, ?, ?, ?, ?, ?)'
		const params = [item.nome, item.descricao, item.categoria, item.subcategoria, item.tamanho, item.cor, item.marca]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (itens: Item[]) => void) => {
		const sql = 'SELECT * FROM itens'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (idItem: number, callback: (item?: Item) => void) => {
		const sql = 'SELECT * FROM itens WHERE idItem = ?'
		const params = [idItem]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (idItem: number, item: Item, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE itens SET nome = ?, descricao = ? WHERE idItem = ?'
		const params = [item.nome, item.descricao, idItem]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (idItem: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM itens WHERE idItem = ?'
		const params = [idItem]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default itensRepository