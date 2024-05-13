import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosRequestHeaders, AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class HttpWrapperService {
  constructor(private httpService: HttpService) {}

  get<T>(
    url: string,
    params?: any,
    _headers?: AxiosRequestHeaders
  ): Promise<AxiosResponse<T>> {
    const headers = {
      'x-api-key': process.env.X_API_KEY,
      ..._headers
    };
    // send get parameter includeDetails

    const response: Promise<AxiosResponse<T>> = firstValueFrom(
      this.httpService.get<T>(url, { headers, params }).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw Error(`Failed to fetch data: ${error.message}`);
        })
      )
    );

    return response;
  }

  // Add other methods for POST, PUT, DELETE, etc. as needed...
}
