import Login from './Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeUser from './HomeUser'
import HomeTrainer from './HomeTrainer'
import { AuthContext } from './components/AuthContext';
import { useContext} from 'react';

const PrivateRoute = ({ isAuthenticated , children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const LoginByPass = ({ isAuthenticated , type_user, children }) => {
  console.log("LoginByPass: " + isAuthenticated)
  const navTo = type_user === "user" ? "/home_user" : "/home_trainer"
  return isAuthenticated ? <Navigate to ={navTo}/> : children 
};

const Logout = () => {
  const { logout } = useContext(AuthContext)
  logout()
  return <Navigate to ="/"/>
};



export function Router() {
  const { isAuthenticated, userType } = useContext(AuthContext)
  //console.log("ROUTER: " + isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginByPass isAuthenticated={isAuthenticated} type_user={userType}> <Login/> </LoginByPass> } />
        <Route path="/home_user" element={<PrivateRoute isAuthenticated={isAuthenticated}> <HomeUser/> </PrivateRoute>} />
        <Route path="/home_trainer" element={<PrivateRoute isAuthenticated={isAuthenticated}> <HomeTrainer/> </PrivateRoute>} />
        <Route path="/logout" element={ <Logout/> } />
      </Routes>
    </BrowserRouter>
  );

}