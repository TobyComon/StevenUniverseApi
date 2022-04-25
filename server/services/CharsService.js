import { generateId } from "../../client/app/Utils/generateId.js"
import { FakeDB } from "../db/FakeDB.js"
import { BadRequest } from "../utils/Errors.js"


class CharsService {
    async editChar(newChar) {
        const originalChar = await this.getCharById(newChar.id)
        originalChar.name = newChar.name || originalChar.name
    }

    async deleteChar(charToDeleteId) {
        const charToDelete = await this.getCharById(charToDeleteId)
        FakeDB.chars = FakeDB.chars.filter(c => c.id !== charToDeleteId)
        return charToDelete

    }

    async createChar(charToCreate) {
        charToCreate.id = generateId()
        FakeDB.chars.push(charToCreate)
        return FakeDB.chars
    }

    async getCharById(charId) {
        const foundChar = FakeDB.chars.find(c => c.id === charId)
        if (!foundChar) {
            throw new BadRequest('Unable to find that Character!')
        }
        return foundChar
    }

    async getAllChars(query = {}) {
        return FakeDB.chars
    }

}

export const charsService = new CharsService()