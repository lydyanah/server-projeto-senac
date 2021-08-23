import express from 'express'
import Item from '../models/item'
import itensRepository from '../repositories/itens-repository'

const itensRouter = express.Router()

itensRouter.post('/itens', (req, res) => {
	const item: Item = req.body
	itensRepository.criar(item, (idItem) => {
        if (idItem) {
            res.status(201).location(`/itens/${idItem}`).send()
        } else {
            res.status(400).send()
        }
    })
})

itensRouter.get('/itens', (req, res) => {
	
	
	itensRepository.lerTodos((itens) => res.json(itens))
})

itensRouter.get('/itens/:idItem', (req, res) => {
	const idItem: number = +req.params.idItem
	itensRepository.ler(idItem, (item) => {
		if (item) {
			res.json(item)
		} else {
			res.status(404).send()
		}
	})
})

itensRouter.put('/itens/:idItem', (req, res) => {
	const idItem: number = +req.params.idItem
	itensRepository.atualizar(idItem, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

itensRouter.delete('/itens/:idItem', (req, res) => {
	const idItem: number = +req.params.idItem
	itensRepository.apagar(idItem, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default itensRouter