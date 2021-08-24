import express from 'express'
import Item from '../models/item'
import Look from '../models/look'
import itensRepository from '../repositories/itens-repository'
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

looksRouter.post('/looks/:id/itens', (req, res) => {
	const item: Item = {...req.body, ...{
		lookId: req.params.id
	}}
	itensRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/itens/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

looksRouter.get('/looks/:id/itens', (req, res) => {
	const id: number = +req.params.id
	itensRepository.lerTodosDoLook(id, (looks) => res.json(looks))
})	





export default looksRouter