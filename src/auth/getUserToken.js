import { getItem } from '../utils/localStorageHandling';

export default function getUserToken() {
  const userLocal = getItem('user');

  if (userLocal) {
    return userLocal.token;
  }
  return null;
}
