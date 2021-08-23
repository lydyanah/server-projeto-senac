import express from 'express'
import Look from '../models/look'
import looksRepository from '../repositories/looks-repository'

const looksRouter = express.Router()

looksRouter.post('/looks', (req, res) => {
	const look: Look = req.body
	looksRepository.criar(look, (idLook) => {
        if (idLook) {
            res.status(201).location(`/looks/${idLook}`).send()
        } else {
            res.status(400).send()
        }
    })
})

looksRouter.get('/looks', (req, res) => {
	
	
	looksRepository.lerTodos((looks) => res.json(looks))
})

looksRouter.get('/looks/:idLook', (req, res) => {
	const idLook: number = +req.params.idLook
	looksRepository.ler(idLook, (look) => {
		if (look) {
			res.json(look)
		} else {
			res.status(404).send()
		}
	})
})

looksRouter.put('/looks/:idLook', (req, res) => {
	const idLook: number = +req.params.idLook
	looksRepository.atualizar(idLook, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

looksRouter.delete('/looks/:idLook', (req, res) => {
	const idLook: number = +req.params.idLook
	looksRepository.apagar(idLook, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default looksRouter