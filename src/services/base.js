const BaseRepository = require("./repositories/BaseRepository");

/**
 * Class that represent a service
 * @class
 */
class BaseService {
  /**
   *
   * @param {BaseRepository} repository
   */
  constructor(repository) {
    if (!(repository instanceof BaseRepository))
      throw new Error("The repository must implement tha BaseRepository class");
    this.repository = repository;
  }
}

module.exports = BaseService;
