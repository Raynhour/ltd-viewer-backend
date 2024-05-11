import type { HttpContractorInstance } from '../contractors/http.contractor';
import type { Config } from './api';
export default class HttpAxios implements HttpContractorInstance {
    URL: string;
    config: Config;
    constructor(URL: string, config: Config);
    request(): Promise<any>;
}
