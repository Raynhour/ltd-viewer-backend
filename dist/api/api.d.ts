import type ApiContractor from '../contractors/api.contractor';
import type HttpContractor from '../contractors/http.contractor';
export type Config = {
    method: string;
    headers?: any;
    data?: any;
    params?: any;
};
export default class Api implements ApiContractor {
    private static instance;
    private http;
    constructor(http: HttpContractor);
    static getInstance(http: HttpContractor): Api;
    request(url: string, config: Config): Promise<any>;
    get(url: string, config?: Config): Promise<any>;
    post<Data, Res>(url: string, data: Data, config?: Config): Promise<Res>;
}
