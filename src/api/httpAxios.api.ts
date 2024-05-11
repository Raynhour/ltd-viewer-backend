import axios from 'axios';
import qs from 'qs';

import type { HttpContractorInstance } from '../contractors/http.contractor';
import type { Config } from './api';

export default class HttpAxios implements HttpContractorInstance {
  URL: string;
  config: Config;
  constructor(URL: string, config: Config) {
    this.URL = URL;
    this.config = config;
  }

  request() {
    const config: any = { ...this.config };
    config.paramsSerializer = (params: any) =>
      qs.stringify(params, { arrayFormat: 'repeat', indices: false });
    return axios
      .request({
        url: this.URL,
        ...config,
      })
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        return Promise.reject(err);
      });
  }
}
