import { ExternalApiService } from './externa-api.service';
export declare class ExternalApiController {
    private readonly externalApiService;
    constructor(externalApiService: ExternalApiService);
    fetchDataAndSave(): Promise<{
        success: boolean;
        message: string;
    }>;
}
