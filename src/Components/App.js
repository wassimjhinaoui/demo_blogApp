import '../App.css';
import {Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import LogOut from './LogOut';
import Login from './Login';
import CreatePost from './CreatePost'
import { DarkModeProvider } from '../Contexts/DarkModeContext';
import { AuthProvider } from '../Contexts/AuthContext';

function App() {
  return (
    
    <DarkModeProvider>

    <Router>
      <AuthProvider>
      <Navbar/>
        <main> 
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/logout' element={<LogOut/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
      </Routes>
        </main>
    </AuthProvider>
    </Router>
    </DarkModeProvider>
  );
}

export default App;
