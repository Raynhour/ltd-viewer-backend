import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
export declare class ExternalApiService {
    private httpService;
    constructor(httpService: HttpService);
    fetchDataFromExternalApi(): Observable<AxiosResponse<any>>;
    saveData(data: any): void;
}
