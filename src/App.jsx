import {
  createBrowserRouter,
  createRoutesFromElements,
  Route, RouterProvider
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from './pages/login/Login';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
      ,
    ),
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;