import React, { useContext } from 'react'
import '../toggleDarkMode.css'
import {DarkModeContext} from '../Contexts/DarkModeContext'


export default function ToggleDarkMode() {
    const [darkMode,setDarkMode] = useContext(DarkModeContext)

  return (
    <div>
        <input type="checkbox" checked={darkMode} onChange={e => (setDarkMode(prev => !prev))} className="checkbox" id="checkbox"/>
        <label htmlFor="checkbox" className="label">
            <i className="fas fa-moon"></i>
            <i className='fas fa-sun'></i>
            <div className='ball'></div>
        </label>
    </div>
  )
}
