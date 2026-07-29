import { Router } from 'express'
import { authController } from './auth.controller'
import { autenticar } from '../../shared/middlewares/auth.middleware'

export const authRouter = Router()

authRouter.post('/login',   authController.login)
authRouter.post('/refresh', authController.refresh)
authRouter.get('/me',       autenticar, authController.me) 