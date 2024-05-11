type Error = {
  code: number
  message: string
}

export type HandleError = {
  status: string
  error: Error
  invalid_fields?: any
}

type RejectedResponse = {
  response: {
    data: any
    statusText: any
    status: number
  }
  message?: string
}

export default class ErrorHandler extends Error {
  private error: RejectedResponse

  constructor(error: RejectedResponse) {
    super()
    this.error = error
  }

  handle(): HandleError {
    const res = this.getBaseErr()
    if (!this.error) return res
    if (this.error.message) {
      res.error.message = this.translateErrorText(this.error.message)
      return res
    }
    return this.getResponseError()
  }

  getBaseErr(code = -1, message = 'unknown error'): HandleError {
    return {
      status: 'ERR',
      error: {
        code: code,
        message: message
      }
    }
  }

  translateErrorText<Err>(text: Err) {
    if (typeof text !== 'string') {
      return text
    }
    if (text.includes('502 Bad Gateway')) {
      return 'failed to connect to server, try again later'
    }

    if (text.includes('etwork') && text.includes('rror')) {
      return 'failed to connect to server, try again later'
    }

    if (text.includes('imeout') && text.includes('xceed')) {
      return 'failed to connect to server, try again later'
    }

    if (text.includes('valid') && text.includes('nection')) {
      return 'failed to connect to server, try again later'
    }

    return text
  }

  getResponseError(): HandleError {
    const res = this.getBaseErr()
    let message: any = this.error.response.data
    if (!message)
      message = this.translateErrorText(this.error.response.statusText)
    if (typeof message !== 'string') {
      if ('invalid_fields' in message) {
        res.invalid_fields = message.invalid_fields
      }

      if ('error' in message) {
        res.error = message.error
        return res
      }
    }

    res.error = {
      code: this.error.response.status,
      message: this.translateErrorText(message)
    }

    // overwrite the error code if authentication failed or access is denied
    if ([401, 403, 404].includes(this.error.response.status)) {
      res.error.code = this.error.response.status
    }
    return res
  }
}

type invalidFields = {
  [key: string]: string | invalidFields
}
export class ErrorFields {
  private invalidFields: invalidFields
  constructor(invalidFields: invalidFields) {
    this.invalidFields = invalidFields
  }

  error(): RejectedResponse {
    return {
      response: {
        data: {
          invalid_fields: this.invalidFields,
          message: 'Invalid fields'
        },
        status: -1,
        statusText: 'Invalid fields'
      }
    }
  }
}
