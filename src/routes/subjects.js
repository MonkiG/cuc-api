const { Router } = require('express')

const PgSubjectRepository = require('../services/repositories/PgSubjectRepository')
const SubjectsServices = require('../services/subject')
const { getServerUrl } = require('../utils')
const Pagination = require('../models/Pagination')

const router = Router()

const repository = new PgSubjectRepository()
const service = new SubjectsServices(repository)

router.get('/subject', async (req, res) => {
  let { page } = req.query
  page = parseInt(page) || 1

  const [err, subjects] = await service.getAll()
  if (err) {
    return res.status(500).json({ message: 'Unexpected error', error: err })
  }

  const serverUrl = getServerUrl(req)

  const parsedData = subjects.map((x) => {
    const { professor, ...rest } = x
    return {
      ...rest,
      professor: `${serverUrl}/api/professor/${x.professor}`,
      url: `${serverUrl}/api/subject/${x.id}`
    }
  })

  const pagination = new Pagination(parsedData, `${serverUrl}/api/subject`)

  try {
    const paginatedSubjects = pagination.getPaginatedItems(page)
    const pageInfo = pagination.getPageInfo(page)

    return res.json({
      page: pageInfo,
      results: paginatedSubjects
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/subject/:id', async (req, res) => {
  const { id } = req.params
  const [err, subject] = await service.getById(id)

  if (err) { return res.status(500).json({ message: 'Unexpected error', error: err }) }

  const serverUrl = getServerUrl(req)
  const parsedData = {
    ...subject,
    professor: `${serverUrl}/api/professor/${subject.professor}`
  }

  return subject ? res.json(parsedData) : res.status(404).send()
})

module.exports = router
