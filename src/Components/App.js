import '../App.css';
import {Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';


import { AuthProvider } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';
import { useContext } from 'react';
import Profile from './Profile';

function App() {
    const [darkMode] = useContext(DarkModeContext);
    const darkClass = darkMode ? "darkMain" : ""
  return (
    

    <Router>
      <AuthProvider>
      <Navbar/>
        <main className={darkClass} > 
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
        </main>
    </AuthProvider>
    </Router>
  );
}

export default App;
