import express from 'express'
import Item from '../models/item'
import Mala from '../models/mala'
import itensRepository from '../repositories/itens-repository'
import malasRepository from '../repositories/malas-repository'

const malasRouter = express.Router()

malasRouter.post('/malas', (req, res) => {
	const mala: Mala = req.body
	malasRepository.criar(mala, (id) => {
        if (id) {
            res.status(201).location(`/malas/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

malasRouter.get('/malas', (req, res) => {
	
	
	malasRepository.lerTodos((malas) => res.json(malas))
})

malasRouter.get('/malas/:id', (req, res) => {
	const id: number = +req.params.id
	malasRepository.ler(id, (mala) => {
		if (mala) {
			res.json(mala)
		} else {
			res.status(404).send()
		}
	})
})

malasRouter.put('/malas/:id', (req, res) => {
	const id: number = +req.params.id
	malasRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

malasRouter.delete('/malas/:id', (req, res) => {
	const id: number = +req.params.id
	malasRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

malasRouter.post('/malas/:id/itens', (req, res) => {
	const item: Item = {...req.body, ...{
		malaId: req.params.id
	}}
	itensRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/itens/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

malasRouter.get('/malas/:id/itens', (req, res) => {
	const id: number = +req.params.id
	itensRepository.lerTodosDaMala(id, (malas) => res.json(malas))
})	




export default malasRouter