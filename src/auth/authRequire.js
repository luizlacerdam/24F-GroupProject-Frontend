import { redirect } from 'react-router-dom';
import { getItem } from '../utils/localStorageHandling';
import { requestDataWithToken } from '../utils/requests';
import getUserToken from './getUserToken';

export default async function isLoggedIn() {
  const userLocal = getItem('user');

  if (!userLocal) {
    throw redirect('/login');
  }

  try {
    const response = await requestDataWithToken(
      '/login/validate',
      getUserToken(),
    );
    return response;
  } catch (er) {
    console.log(er);
    throw redirect('/login');
  }
}
