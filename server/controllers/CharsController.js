import { charsService } from '../services/CharsService.js'
import BaseController from '../utils/BaseController.js'


export class CharsController extends BaseController {
    constructor() {
        super('api/chars')
        this.router

        .get('', this.getAllChars)
        .get('/:id', this.getCharById)
        .post('', this.createChar)
        .delete('/:id', this.deleteChar)
        .put('/:id', this.editChar)

    }

    async getAllChars(req, res, next) {
        try {
            const chars = await charsService.getAllChars(req.query)
            res.send(chars)
        } catch (error) {
            next(error)
        }
    }

    async getCharById(req, res, next) {
        try {
            const charId = req.params.id
            const foundChar = await charsService.getCharById(charId)
            res.send(foundChar)
        } catch (error) {
            next(error)
        }
    }

    async createChar(req, res, next) {
        try {
            const charToCreate = req.body
            const createdChar = await charsService.createChar(charToCreate)
            res.send(createdChar)
        } catch (error) {
            next(error)
        }
    }

    async deleteChar(req, res, next) {
        try {
            const charToDeleteId = req.params.id
            const deletedChar = await charsService.deleteChar(charToDeleteId)
            res.send(deletedChar)
        } catch (error) {
            next(error)
        }
    }

    async editChar(req, res, next) {
        try {
            req.body.id = req.params.id
            const editedChar = await charsService.editChar(req.body)
            res.send(editedChar)
        } catch (error) {
            next(error)
        }
    }

}