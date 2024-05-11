import type { Config } from '../api/api';
export default interface ApiContractor {
    get: (url: string, config?: Config) => Promise<any>;
    post: <Res>(url: string, data?: any, config?: Config) => Promise<Res>;
}
