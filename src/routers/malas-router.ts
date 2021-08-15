import express from 'express'
import Mala from '../models/mala'
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

malasRouter.get('/malas/:idMala', (req, res) => {
	const id: number = +req.params.idMala
	malasRepository.ler(id, (mala) => {
		if (mala) {
			res.json(mala)
		} else {
			res.status(404).send()
		}
	})
})

malasRouter.put('/malas/:idMala', (req, res) => {
	const id: number = +req.params.idMala
	malasRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

malasRouter.delete('/malas/:idMala', (req, res) => {
	const id: number = +req.params.idMala
	malasRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default malasRouter