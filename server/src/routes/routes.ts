import {Router} from 'express';
import { ServiceContainer } from '../containers/serviceContainer';

function initRoutes(services: ServiceContainer) {
  const router = Router();
  router.get('/fetchSoftware', async (req, res) => {
    const result = await services.catalog.fetchSoftware()
    res.send({ data: result })
  })
  router.get('/makeOrder', async (req, res) => {
    res.send('not implemented')
  })
  router.get('/signin', async (req, res) => {
    res.send('not implemented')
  })
  router.get('/signup', async (req, res) => {
    res.send('not implemented')
  })
  router.get('/signout', async (req, res) => {
    res.send('not implemented')
  })
  router.get('/getBoughtKeys', async (req, res) => {
    res.send('not implemented')
  })
  return router
}