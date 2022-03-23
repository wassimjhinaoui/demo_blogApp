import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { DarkModeContext } from '../Contexts/DarkModeContext'
import {AuthContext} from '../Contexts/AuthContext'
import ToggleDarkMode from './ToggleDarkMode'

function Navbar() {
    const [darkMode,setDarkMode] = useContext(DarkModeContext)
    const {isAuth} = useContext(AuthContext)

    const classes = `navbar ${darkMode ? "dark" : ""}`

  return (
    <nav className={classes}>
        <h2>Wassim jhinaoui</h2>
        <ul className={darkMode ? "darkUl" : ""}>
            <Link to="/"><li>Home</li></Link>
            
            {!isAuth ? <Link to="/login"><li>Log In</li></Link> 
                     :<><Link to="/logout"><li>Log out</li></Link>
                        <Link to="/createpost"><li>Create Post</li></Link>
                      </>}
        </ul>
        <ToggleDarkMode/>
    </nav>
  )
}

export default Navbar