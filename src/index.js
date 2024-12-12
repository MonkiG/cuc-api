const express = require('express')
const morgan = require('morgan')

const { PORT, ENV } = require('./config')
const { getServerUrl } = require('./utils')

const professorControllers = require('./routes/professor')
const subjectControllers = require('./routes/subjects')

const app = express()
const apiRouter = express.Router()

app.use(morgan(ENV === 'dev' ? 'dev' : 'combined'))
app.use('/api', apiRouter)

app.get('/hello-world', (_, res) => {
  return res.json({ message: 'Hello, world!' })
})

apiRouter.use(professorControllers)
apiRouter.use(subjectControllers)

apiRouter.get('/', (req, res) => {
  const serverName = getServerUrl(req)
  res.json({
    title: 'CUC API',
    description: 'Centro Universitario de la Costa - Unofficial API',
    routes: [
      {
        method: 'GET',
        description: 'Retrieve all university professors',
        path: `${serverName}/api/professor`,
        query: {
          page: {
            type: 'number',
            description: 'Number of page results (default: 1)',
            required: false,
            example: `${serverName}/api/professor?page=10`
          }
        },
        example: `${serverName}/api/professor`
      },
      {
        method: 'GET',
        description: 'Retrieve a professor by Id',
        path: `${serverName}/api/professor/:id`,
        query: null,
        example: `${serverName}/api/professor/292dee29-fad2-43f7-b919-79472c89464c`
      },
      {
        method: 'GET',
        description: 'Retrieve all subjects',
        path: `${serverName}/api/subject`,
        query: {
          page: {
            type: 'number',
            description: 'Number of page results (default: 1)',
            required: false,
            example: `${serverName}/api/subject?page=10`
          }
        },
        example: `${serverName}/api/subject`
      },
      {
        method: 'GET',
        description: 'Retrieve a subject by Id',
        path: `${serverName}/api/subject/:id`,
        query: null,
        example: `${serverName}/api/subject/1b15e5cb-c77f-4881-bfe7-ecb9d1c0f6ed`
      }
    ]
  })
})

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
