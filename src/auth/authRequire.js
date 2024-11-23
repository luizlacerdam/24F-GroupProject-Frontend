import { redirect } from 'react-router-dom';
import { getItem } from '../utils/localStorageHandling';
import { requestDataWithToken } from '../utils/requests';
import getUserToken from './getUserToken';

export default async function isLoggedIn() {
  const userLocal = getItem('user');
  console.log('userLocal', userLocal);
  

  if (!userLocal) {
    throw redirect('/sign-in');
  }

  try {
    const response = await requestDataWithToken(
      '/users/validate',
      getUserToken(),
    );
    return response;
  } catch (er) {
    console.log(er);
    throw redirect('/sign-in');
  }
}
