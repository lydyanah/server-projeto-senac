import Usuario from '../models/usuario'
import database from './database'

const usuariosRepository = {
	criar: (usuario: Usuario, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO usuarios (nomeUsuario, senha, primeiroNome) VALUES (?, ?, ?, ?, ?, ?, ?)'
		const params = [usuario.nomeUsuario, usuario.primeiroNome, usuario.sobreNome , usuario.dataNascimento, usuario.senha, usuario.genero, usuario.email]
		database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	lerTodos: (callback: (usuario: Usuario[]) => void) => {
		const sql = 'SELECT * FROM usuarios'
		const params: any[] = []
		database.all(sql, params, (_err, rows) => callback(rows))
	},

	ler: (id: number, callback: (usuario?: Usuario) => void) => {
		const sql = 'SELECT * FROM usuarios WHERE id = ?'
		const params = [id]
		database.get(sql, params, (_err, row) => callback(row))
	},

	lerPorNome:(nomeUsuario: string, callback: (usuario?: Usuario) => void) => {
		const sql = 'SELECT * FROM usuarios WHERE nomeUsuario LIKE = ?'
		const params = [nomeUsuario]
		database.get(sql, params, (_err, row) => callback(row))
	},
	

	atualizar: (idUsuario: number, usuario: Usuario, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE usuario SET nome = ?, descricao = ? WHERE idUsuario = ?'
		const params = [usuario.nomeUsuario, usuario.senha, idUsuario]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	apagar: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM usuario WHERE id = ?'
		const params = [id]
		database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default usuariosRepository