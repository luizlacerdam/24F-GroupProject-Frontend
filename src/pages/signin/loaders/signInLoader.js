import { redirect } from 'react-router-dom';
import getUserToken from '../../../auth/getUserToken';
import { requestDataWithToken } from '../../../utils/requests';

export default async function signInLoader() {
  try {
    const response = await requestDataWithToken(
      '/users/validate',
      getUserToken(),
    );
    if (response.status === 'OK') {
      return redirect('/dashboard');
    }
    return response;
  } catch (er) {
    console.log(er);
    return null;
  }
}
