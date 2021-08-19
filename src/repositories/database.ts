import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
	CREATE TABLE itens (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT
	)`
const SQL_USUARIOS_CREATE = `
	CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nomeUsuario TEXT,
		senha TEXT,
		primeiroNome TEXT,
		genero TEXT
	)
	`
const SQL_USUARIOS_INSERT = `
	INSERT INTO usuarios (nomeUsuario, senha, primeiroNome) VALUES ("adm", "123", "Administrador");
	`

const SQL_MALAS_CREATE = `
	CREATE TABLE malas (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		titulo TEXT,
		descricao TEXT
	)`


const database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Base de dados conectada com sucesso.')
		database.run(SQL_ITENS_CREATE, (err) => {
			if (err) {
				// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela itens criada com sucesso.')
			}
		})
		database.run(SQL_USUARIOS_CREATE, (err) => {
			if (err) {
				// Possívelmente a tabela já foi criada
			} else {
				console.log('tabela usuarios criada com sucesso')

				database.run(SQL_USUARIOS_INSERT, (err) => {
					if (err) {
						console.log(' Possívelmente a tabela já foi criada')
					} else {
						console.log('tabela usuarios iniciada com sucesso')
					}
				})
			}
		})
	}
})
			database.run(SQL_MALAS_CREATE, (err) => {
				if (err) {
			// Possivelmente a tabela já foi criada
			} else {
				console.log('Tabela malas criada com sucesso.')
	}
})



export default database