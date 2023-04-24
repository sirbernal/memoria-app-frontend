import './App.css';
import Login from './Login';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import HomeUser from './HomeUser'
import HomeTrainer from './HomeTrainer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home_user" element={<HomeUser />} />
        <Route path="/home_trainer" element={<HomeTrainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
