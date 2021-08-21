import Mala from '../models/mala'
import database from './database'

const malasRepository = {
	criar: (mala: Mala, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO Malas (idUsuario, idItem, titulo, descricao,) VALUES (?, ?)'
		const params = [mala.titulo, mala.descricao]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (malas: Mala[]) => void) => {
		const sql = 'SELECT * FROM malas'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (idMala: number, callback: (mala?: Mala) => void) => {
		const sql = 'SELECT * FROM malas WHERE idMala = ?'
		const params = [idMala]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (idMala: number, mala: Mala, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE malas SET titulo = ?, descricao = ? WHERE idMala = ?'
		const params = [mala.titulo, mala.descricao, idMala]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (idMala: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM malas WHERE idMala = ?'
		const params = [idMala]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default malasRepository