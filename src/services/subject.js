/* eslint-disable camelcase */
const BaseService = require('./base')

class SubjectsServices extends BaseService {
  async getAll () {
    try {
      const rows = await this.repository.getAll()
      const parsedData = rows.map((x) => {
        const { professor_id, ...rest } = x
        return { ...rest, professor: professor_id }
      })

      return [null, parsedData]
    } catch (error) {
      return [error, null]
    }
  }

  async getById (id) {
    try {
      const subject = await this.repository.get(id)
      const { professor_id, ...rest } = subject
      const parsedData = { ...rest, professor: professor_id }

      return [null, parsedData]
    } catch (error) {
      return [error, null]
    }
  }
}

module.exports = SubjectsServices
