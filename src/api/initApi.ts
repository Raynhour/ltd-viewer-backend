import type ApiContractor from '../contractors/api.contractor';
import Api from './api';
import HttpAxios from './httpAxios.api';

const instance: ApiContractor = new Api(HttpAxios);
Object.freeze(instance);
export default instance;
