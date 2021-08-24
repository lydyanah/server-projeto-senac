import express from 'express'
import Look from '../models/look'
import looksRepository from '../repositories/looks-repository'

const looksRouter = express.Router()

looksRouter.post('/looks', (req, res) => {
	const look: Look = req.body
	looksRepository.criar(look, (id) => {
        if (id) {
            res.status(201).location(`/looks/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

looksRouter.get('/looks', (req, res) => {
	
	
	looksRepository.lerTodos((looks) => res.json(looks))
})

looksRouter.get('/looks/:id', (req, res) => {
	const id: number = +req.params.id
	looksRepository.ler(id, (look) => {
		if (look) {
			res.json(look)
		} else {
			res.status(404).send()
		}
	})
})

looksRouter.put('/looks/:id', (req, res) => {
	const id: number = +req.params.id
	looksRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

looksRouter.delete('/looks/:id', (req, res) => {
	const id: number = +req.params.id
	looksRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default looksRouter