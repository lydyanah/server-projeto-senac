import user from '../models/user'
import database from './database'

const itensRepository = {
	criar: (user: user, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO user (nome, descricao) VALUES (?, ?)'
		const params = [user.nome, user.descricao,user.categoria]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (user: user[]) => void) => {
		const sql = 'SELECT * FROM user'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (user?: user) => void) => {
		const sql = 'SELECT * FROM user WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	atualizar: (id: number, user: user, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE user SET nome = ?, descricao = ? WHERE id = ?'
		const params = [user.nome, user.descricao, id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM user WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default itensRepository