// external-api.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';

// request to github users api
// const github = 'https://api.github.com/users';

@Injectable()
export class ExternalApiService {
  constructor(private httpService: HttpService) {}

  fetchDataFromExternalApi(): Observable<AxiosResponse<any>> {
    // Add headers to the request
    const headers = {
      'x-api-key': '2FdzF8Y86k6sPEH8LXIZga8SB72zhXM6fH41Jjrf',
    };

    // Make GET request to external API with headers
    return this.httpService
      .get('https://apiv2.legiontd2.com/players/byName/raynhour', { headers })
      .pipe(
        catchError((error: AxiosError) => {
          // Handle errors
          return throwError(error);
        }),
      );
  }

  saveData(data: any) {
    // Logic to save the data to your database or perform any other operations
    console.log('Data received from external API:', data);
    // Example of saving to a database:
    // YourDatabaseModel.create(data);
  }
}
