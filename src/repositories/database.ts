import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
	CREATE TABLE itens (
		idItem INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		categoria TEXT,
		descricao TEXT,
		subcategoria TEXT,
		tamanho TEXT,
		cor TEXT,
		marca TEXT
	)`
const SQL_USUARIOS_CREATE = `
	CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nomeUsuario TEXT,
		primeiroNome TEXT,
		sobreNome TEXT,
		dataNascimento TEXT,
		senha TEXT,
		email TEXT
		
	)
	`
const SQL_USUARIOS_INSERT = `
	INSERT INTO usuarios (nomeUsuario, primeiroNome, sobreNome , dataNascimento , senha, genero , email) VALUES ("adm", "Administrador", "Beta", "12 de fevereiro de 2005", "123", "masculino", "administrador@adm.com");
	`

const SQL_MALAS_CREATE = `
	CREATE TABLE malas (
		idMala INTEGER PRIMARY KEY AUTOINCREMENT,
		titulo TEXT,
		descricaoMala TEXT
	)`

	const SQL_LOOKS_CREATE = `
	CREATE TABLE looks (
		idLook INTEGER PRIMARY KEY AUTOINCREMENT,
		descricaoLook TEXT,
		estacaoLook TEXT,
		ocasioesLook TEXT
		
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

database.run(SQL_LOOKS_CREATE, (err) => {
	if (err) {
		// Possivelmente a tabela já foi criada
	} else {
		console.log('Tabela looks criada com sucesso.')
	}
})




	export default database