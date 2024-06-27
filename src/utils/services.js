import axios from 'axios';
import { ctxValue } from './config';


export async function customerLookUp(nameValue) {
  return axios
    .post(
      ctxValue('SEARCH_SERVICE') + '/promo/create',
      { nameValue },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      
      if(err?.response?.status === 401){
        return { status: 401, message: 'E-mail already has cupon' };
      }
      return { status: 500, message: 'System issue' };
    });
}