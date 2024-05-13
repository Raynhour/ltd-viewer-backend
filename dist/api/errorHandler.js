"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFields = void 0;
class ErrorHandler extends Error {
    constructor(error) {
        super();
        this.error = error;
    }
    handle() {
        const res = this.getBaseErr();
        if (!this.error)
            return res;
        if (this.error.message) {
            res.error.message = this.translateErrorText(this.error.message);
            return res;
        }
        return this.getResponseError();
    }
    getBaseErr(code = -1, message = 'unknown error') {
        return {
            status: 'ERR',
            error: {
                code: code,
                message: message
            }
        };
    }
    translateErrorText(text) {
        if (typeof text !== 'string') {
            return text;
        }
        if (text.includes('502 Bad Gateway')) {
            return 'failed to connect to server, try again later';
        }
        if (text.includes('etwork') && text.includes('rror')) {
            return 'failed to connect to server, try again later';
        }
        if (text.includes('imeout') && text.includes('xceed')) {
            return 'failed to connect to server, try again later';
        }
        if (text.includes('valid') && text.includes('nection')) {
            return 'failed to connect to server, try again later';
        }
        return text;
    }
    getResponseError() {
        const res = this.getBaseErr();
        let message = this.error.response.data;
        if (!message)
            message = this.translateErrorText(this.error.response.statusText);
        if (typeof message !== 'string') {
            if ('invalid_fields' in message) {
                res.invalid_fields = message.invalid_fields;
            }
            if ('error' in message) {
                res.error = message.error;
                return res;
            }
        }
        res.error = {
            code: this.error.response.status,
            message: this.translateErrorText(message)
        };
        if ([401, 403, 404].includes(this.error.response.status)) {
            res.error.code = this.error.response.status;
        }
        return res;
    }
}
exports.default = ErrorHandler;
class ErrorFields {
    constructor(invalidFields) {
        this.invalidFields = invalidFields;
    }
    error() {
        return {
            response: {
                data: {
                    invalid_fields: this.invalidFields,
                    message: 'Invalid fields'
                },
                status: -1,
                statusText: 'Invalid fields'
            }
        };
    }
}
exports.ErrorFields = ErrorFields;
//# sourceMappingURL=errorHandler.js.map