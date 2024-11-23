import { Form, useActionData, useNavigation } from 'react-router-dom';

export default function SignIn() {
  const actionReturn = useActionData();
  console.log(actionReturn);
  
  const { state } = useNavigation();

  return (
    <div
      className="login template d-flex
    justify-content-center align-items-center w-100 vh-100 bg-primary"
    >
      <div className="form-container p-5 rounded bg-white">
        <Form method="post" replace>
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-2">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Enter Username"
            />
          </div>
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
              {state === 'submitting' ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </Form>
        <span
          className="d-flex justify-content-center mt-3 p-1"
        >
          {actionReturn ? actionReturn.message : null}
        </span>
        <div>
          <a href="/sign-in">Sign in</a>
        </div>
      </div>
    </div>
  );
}
