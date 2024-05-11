import type ApiContractor from '../contractors/api.contractor';
import type HttpContractor from '../contractors/http.contractor';
import ErrorHandler from './errorHandler';

export type Config = {
  method: string;
  headers?: any;
  data?: any;
  params?: any;
};

export default class Api implements ApiContractor {
  private static instance: Api;
  private http: HttpContractor;
  constructor(http: HttpContractor) {
    this.http = http;
  }

  public static getInstance(http: HttpContractor): Api {
    if (this.instance) return this.instance;
    return new Api(http);
  }

  async request(url: string, config: Config): Promise<any> {
    const _config: Config = { ...config };
    if (!('headers' in _config)) {
      _config.headers = {};
    }

    _config.headers['x-api-key'] = '';
    try {
      return await new this.http(url, _config).request();
    } catch (error: any) {
      return Promise.reject(new ErrorHandler(error).handle());
    }
  }

  async get(url: string, config?: Config): Promise<any> {
    const _config = {
      method: 'get',
    };
    _config.method = 'get';
    const res: Promise<any> = await this.request(url, {
      ...config,
      ..._config,
    });
    return res;
  }

  async post<Data, Res>(
    url: string,
    data: Data,
    config?: Config,
  ): Promise<Res> {
    const _config = {
      method: 'post',
      data: data,
    };
    const res: Promise<Res> = await this.request(url, {
      ...config,
      ..._config,
    });
    return res;
  }
}
