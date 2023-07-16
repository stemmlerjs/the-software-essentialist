import { HttpCodes } from '../enum/http-codes'

export class ResponseDto {
    response: ResponsePayload
    code: HttpCodes
}

export class ResponsePayload {
    error: string
    data: any
    success: boolean
}
