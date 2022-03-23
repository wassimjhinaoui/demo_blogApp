import React, {createContext, useState } from 'react'

export const DarkModeContext = createContext()

export function DarkModeProvider(props) {
    const [darkMode,setDarkMode] = useState(false)

  return (
    <DarkModeContext.Provider value={[darkMode,setDarkMode]}>
        {props.children}
    </DarkModeContext.Provider>
  )
}
