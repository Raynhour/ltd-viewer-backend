import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosRequestHeaders } from 'axios';
export declare class HttpWrapperService {
    private httpService;
    constructor(httpService: HttpService);
    get<T>(url: string, params?: any, _headers?: AxiosRequestHeaders): Promise<AxiosResponse<T>>;
}
