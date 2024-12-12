const BaseService = require('./base')

class ProfessorServices extends BaseService {
  async getAll () {
    try {
      const rows = await this.repository.getAll()
      return [null, rows]
    } catch (error) {
      return [error, null]
    }
  }

  async getById (id) {
    try {
      const rows = await this.repository.get(id)
      return [null, rows]
    } catch (error) {
      return [error, null]
    }
  }
}

module.exports = ProfessorServices
