import express from 'express'
import Usuario from '../models/usuario'
import usuariosRepository from '../repositories/usuarios-repository'

const loginRouter = express.Router()

loginRouter.post('/login', (req,res) => {
	const usuarioProcurado: Usuario = req.body
	usuariosRepository.lerPorNome(usuarioProcurado.
	nomeUsuario,(usuarioEncontrado) => {
		if (usuarioEncontrado) {
			if (usuarioEncontrado.senha === 
			usuarioProcurado.senha) {
				res.json({
					token: `${usuarioEncontrado.idUsuario}:$
					{usuarioEncontrado.nomeUsuario}`
				})
			} else {
				res.status(400).send()
			}
		} else {
			res.status(401).send()
		}
	})
})

export default loginRouter