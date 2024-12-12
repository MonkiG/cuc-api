class Pagination {
  constructor (items, serverUrl, itemsPerPage = 50) {
    this.serverUrl = serverUrl
    this.items = items // Los elementos a paginar
    this.totalItems = items.length // Total de elementos
    this.itemsPerPage = itemsPerPage // Elementos por página
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) // Total de páginas
  }

  getPaginatedItems (page) {
    // Validación de la página
    if (page < 1 || page > this.totalPages) {
      throw new Error('Page number out of range')
    }

    const startIndex = (page - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const dataToShow = this.items.slice(startIndex, endIndex)
    this.itemsShowed = dataToShow.length
    return dataToShow
  }

  getPageInfo (page) {
    // Información sobre la página actual
    return {
      number: page,
      next:
        page < this.totalPages ? `${this.serverUrl}?page=${page + 1}` : null,
      prev: page > 1 ? `${this.serverUrl}?page=${page - 1}` : null,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      itemsShowed: this.itemsShowed
    }
  }
}

module.exports = Pagination
