// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ExternalApiService } from './externa-api.service';

@Controller()
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get('fetch-and-save')
  async fetchDataAndSave() {
    try {
      // Fetch data from external API
      const response = await this.externalApiService
        .fetchDataFromExternalApi()
        .toPromise();

      // Save the fetched data
      this.externalApiService.saveData(response.data);

      return { success: true, message: 'Data fetched and saved successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to fetch or save data' };
    }
  }
}
