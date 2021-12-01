import * as dotenv from 'dotenv'
import * as express from 'express'
import { ResourceContainer } from './src/containers/resourceContainer'
import { ServiceContainer } from './src/containers/serviceContainer'
dotenv.config()

const PORT = 3001

const resources = new ResourceContainer()
const services = new ServiceContainer(resources)

resources.init().then(() => {
  const app = express.default()
  app.get('/fetchSoftware', async (req, res) => {
    const result = await services.catalog.fetchSoftware()
    res.send({ data: result })
  })

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  })
})
