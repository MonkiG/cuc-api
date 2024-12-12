/* eslint-disable no-unused-vars */
/**
 * Base class of the repositories
 * @class
 */
class BaseRepository {
  async getAll () {
    throw new Error('This method must be implemented by the inheriting class')
  }

  async create (data) {
    throw new Error('This method must be implemented by the inheriting class')
  }

  async get (id) {
    throw new Error('This method must be implemented by the inheriting class')
  }
}

module.exports = BaseRepository
