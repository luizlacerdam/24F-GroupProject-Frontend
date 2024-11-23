import { requestPost } from '../../../utils/requests';

export default async function SignUpAction({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const username = formData.get('username');
  try {
    const response = await requestPost('/users', { email, password, username, role: 'user' });
    
    if (response.status === 201) {
        console.log(response.data.message);
      return { message: response.data.message, status: 'success' };
    }

    return { message: 'An error occurred', status: 'danger' };
  } catch (error) {
    console.error(error);
    return { message: error.response?.data?.message || 'Something went wrong', status: 'error' };
  }
}
