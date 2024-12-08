import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import authLoader from './auth/authLoader';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import SignInAction from './pages/signin/Actions/SignInAction';
import SignIn from './pages/signin/SignIn';
import SignUpAction from './pages/signup/Actions/SignUpAction';
import SignUp from './pages/signup/SignUp';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
       
        <Route 
          path="/sign-up" 
          element={<SignUp />}
          action={SignUpAction}
        /> 
        <Route
          // loader={ signInLoader }
          action={ SignInAction }
          path="/sign-in"
          element={ <SignIn /> }
        />
        <Route path="/" element={<Home />} />
        {/* Protected Routes */}
        <Route loader={authLoader}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route loader={authLoader}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
      </Route>
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
