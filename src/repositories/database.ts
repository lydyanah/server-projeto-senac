import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
	CREATE TABLE itens (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		categoria TEXT NOT NULL,
		subcategoria TEXT NULL, 
		tamanho TEXT NULL,
		cor TEXT NULL,
		marca TEXT NULL,
		material TEXT NULL,
		cuidados TEXT NULL,
		preco TEXT NULL,
		dataCompra TEXT NULL,
		status TEXT NULL,
		estacaoLook TEXT NULL,
		ocasioesLook TEXT NULL,
		notasItem TEXT NULL,
		tagsItem TEXT NULL
	)`

const SQL_USUARIOS_CREATE = `
	CREATE TABLE usuarios (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nomeUsuario TEXT NOT NULL,
		primeiroNome TEXT NOT NULL,
		sobreNome TEXT NOT NULL,
		senha TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE
		
	)
	`
const SQL_USUARIOS_INSERT = `
	INSERT INTO usuarios (nomeUsuario, primeiroNome, sobreNome , senha ,email) VALUES ("adm", "Administrador", "Beta","123","administrador@adm.com");
	`

const SQL_MALAS_CREATE = `
	CREATE TABLE malas (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		tituloMala TEXT NOT NULL,
		descricaoMala TEXT NULL
	)`

	const SQL_LOOKS_CREATE = `
	CREATE TABLE looks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		descricaoLook TEXT NOT NULL,
		tagsLook TEXT NULL
		
		
	)`
	const SQL_LOOKS_ITEM_CREATE = `
	CREATE TABLE looks_item (
		lookId INTERGER NOT NULL,
		itemId INTERGER NOT NULL,
		FOREIGN KEY(lookId) REFERENCES look(id),
		FOREIGN KEY(itemId)	REFERENCES item(id)
		)`

	const SQL_MALAS_ITEM_CREATE = `
	CREATE TABLE malas_item (
		malaId INTERGER NOT NULL,
		itemId INTERGER NOT NULL,
		FOREIGN KEY(malaId) REFERENCES mala(id),
		FOREIGN KEY(itemId)	REFERENCES item(id)
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

database.run(SQL_LOOKS_ITEM_CREATE, (err) => {
	if (err) {
		// Possivelmente a tabela já foi criada
	} else {
		console.log('Tabela look_item criada com sucesso.')
	}
})

database.run(SQL_MALAS_ITEM_CREATE, (err) => {
	if (err) {
		// Possivelmente a tabela já foi criada
	} else {
		console.log('Tabela mala_item criada com sucesso.')
	}
})



	export default database