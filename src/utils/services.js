import axios from 'axios';
import { ctxValue } from './config';


export async function customerLookUp(searchTerm) {
    const url = `${ctxValue('SEARCH_SERVICE')}/customers/getCustomerInfo`;
    return axios
      .get(url, {
        params: { searchTerm },
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ctxValue('API_KEY'),
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          return { status: 401, message: 'E-mail already has cupon' };
        }
        return { status: 500, message: 'System issue' };
      });
}

