import Look from '../models/look'
import database from './database'

const looksRepository = {
	criar: (look: Look, callback: (idLook?: number) => void) => {
		const sql = 'INSERT INTO looks ( descricaoLook, estacaoLook, ocasioesLook) VALUES (?, ?, ?)'
		const params = [look.descricaoLook, look.estacaoLook, look.ocasioesLook]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (looks: Look[]) => void) => {
		const sql = 'SELECT * FROM Looks'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (idLook: number, callback: (Look?: Look) => void) => {
		const sql = 'SELECT * FROM Looks WHERE idLook = ?'
		const params = [idLook]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (idLook: number, look: Look, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE looks SET ocasioesLook = ?, estacaoLook = ? WHERE idLook = ?'
		const params = [look.estacaoLook, look.ocasioesLook, look.descricaoLook,idLook]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (idLook: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM looks WHERE idLook = ?'
		const params = [idLook]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default looksRepository