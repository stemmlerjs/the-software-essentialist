import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { Routes } from './routes'
import dtoValidationMiddleware from './middleware/validator.middleware'
import { ResponseDto, ResponsePayload } from './dto/response.dto'

AppDataSource.initialize()
    .then(async () => {
        // create express app
        const app = express()
        app.use(bodyParser.json())

        // register express routes from defined application routes
        Routes.forEach((route) => {
            ;(app as any)[route.method](
                route.route,
                dtoValidationMiddleware(route.dto),
                async (req: Request, res: Response, next: Function) => {
                    try {
                        const result = await new (route.controller as any)()[
                            route.action
                        ](req, res, next)
                        return res.status(result.code).json(result.response)
                    } catch (error) {
                        const response: ResponsePayload = {
                            error: error.message,
                            data: undefined,
                            success: false,
                        }
                        res.status(error.code).json(response)
                    }
                }
            )
        })

        app.listen(3000)

        console.log('Server has started on port 3000')
    })
    .catch((error) => console.log(error))
