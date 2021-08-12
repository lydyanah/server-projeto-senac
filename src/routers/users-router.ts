import express from 'express'
import User from '../models/user'
import userRepository from '../repositories/users-repository'

const usersRouter = express.Router()

usersRouter.post('/users', (req, res) => {
	const user: User = req.body
	userRepository.criar(user, (id) => {
        if (id) {
            res.status(201).location(`/users/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

usersRouter.get('/user', (req, res) => {
	userRepository.lerTodos((itens) => res.json(itens))
})

usersRouter.get('/users/:id', (req, res) => {
	const id: number = +req.params.id
	userRepository.ler(id, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

usersRouter.put('/users/:id', (req, res) => {
	const id: number = +req.params.id
	userRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

usersRouter.delete('/users/:id', (req, res) => {
	const id: number = +req.params.id
	userRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default usersRouter