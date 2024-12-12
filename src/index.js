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
    title: 'Profes cuc api',
    description: 'API para gestionar profesores y sus clases.',
    routes: [
      {
        method: 'GET',
        description: 'Obtener todos los profesores',
        path: `${serverName}/api/professor`,
        query: {
          page: {
            type: 'number',
            description: 'Número de la página de resultados (por defecto 1)',
            required: false,
            example: `${serverName}/api/professor?page=10`
          }
        }
      },
      {
        method: 'GET',
        path: `${serverName}/api/professor/:id`,
        query: null,
        description: 'Obtener un profesor por ID'
      }
    ]
  })
})

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
