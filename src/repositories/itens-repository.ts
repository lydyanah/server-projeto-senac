import Item from '../models/item'
import database from './database'

const itensRepository = {
	criar: (item: Item, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO itens (categoria, subcategoria, tamanho, cor, marca, material, cuidados, preco, dataCompra, status, estacaoLook, ocasioesLook, notasItem, tagsItem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
		const params = [item.categoria, item.subcategoria, item.tamanho, item.cor, item.marca, item.material, item.cuidados, item.preco, item.dataCompra, item.status, item.estacaoLook, item.ocasioesLook, item.notasItem, item.tagsItem]
		database.run(sql, params, function(_err) {
			console.error(_err)
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (itens: Item[]) => void) => {
		const sql = 'SELECT * FROM itens'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	lerTodosDoLook: (lookId:number,callback: (itens:Item[]) => void) => {
		const sql = 'SELECT * FROM itens WHERE lookId = ?'
		const params: any[] = [lookId]
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	apagarDoLook: (lookId: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM itens WHERE lookId = ?'
		const params = [lookId]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
	lerTodosDaMala: (malaId:number,callback: (itens:Item[]) => void) => {
		const sql = 'SELECT * FROM itens WHERE malaId = ?'
		const params: any[] = [malaId]
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	apagarDaMala: (malaId: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM itens WHERE malaId = ?'
		const params = [malaId]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},



	ler: (id: number, callback: (item?: Item) => void) => {
		const sql = 'SELECT * FROM itens WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, item: Item, callback: (notFound: boolean) => void) => {
		

		const sql = 'UPDATE itens SET  = ?, descricao = ? WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM itens WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}
	



	

export default itensRepository