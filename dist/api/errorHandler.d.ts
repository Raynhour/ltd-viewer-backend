type Error = {
    code: number;
    message: string;
};
export type HandleError = {
    status: string;
    error: Error;
    invalid_fields?: any;
};
type RejectedResponse = {
    response: {
        data: any;
        statusText: any;
        status: number;
    };
    message?: string;
};
export default class ErrorHandler extends Error {
    private error;
    constructor(error: RejectedResponse);
    handle(): HandleError;
    getBaseErr(code?: number, message?: string): HandleError;
    translateErrorText<Err>(text: Err): Err | "failed to connect to server, try again later";
    getResponseError(): HandleError;
}
type invalidFields = {
    [key: string]: string | invalidFields;
};
export declare class ErrorFields {
    private invalidFields;
    constructor(invalidFields: invalidFields);
    error(): RejectedResponse;
}
export {};
