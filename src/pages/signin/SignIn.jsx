import { Form, useActionData, useNavigation } from 'react-router-dom';

export default function SignIn() {
  const actionReturn = useActionData();
  const { state } = useNavigation();

  return (
    <div
      className="login template d-flex
    justify-content-center align-items-center w-100 vh-100 bg-primary"
    >
      <div className="form-container p-5 rounded bg-white">
        <Form method="post" replace>
          <h3 className="text-center">Sign in</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              disabled={ state === 'submitting' }
            >
              {state === 'submitting' ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </Form>
        <div className='mt-1'>
          <a href="/sign-up">Create an account</a>
        </div>
        <span
          className="d-flex justify-content-center mt-3 p-1 text-danger"
        >
          {actionReturn ? actionReturn.response.data.message : null}
        </span>
      </div>
    </div>
  );
}
