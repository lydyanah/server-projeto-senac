import Mala from '../models/mala'
import database from './database'

const malasRepository = {
	criar: (mala: Mala, callback: (idMala?: number) => void) => {
		const sql = 'INSERT INTO Malas (titulo, descricaoMala) VALUES (?, ?)'
		const params = [mala.titulo, mala.descricaoMala]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (mala: Mala[]) => void) => {
		const sql = 'SELECT * FROM malas'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (Mala?: Mala) => void) => {
		const sql = 'SELECT * FROM malas WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, mala: Mala, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE malas SET titulo = ?, descricaoMala = ? WHERE id = ?'
		const params = [mala.titulo, mala.descricaoMala, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM malas WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default malasRepository