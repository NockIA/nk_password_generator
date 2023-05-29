import React from 'react'
import ReactDOM from 'react-dom/client'
import { PwdGenerator } from './components/pwd_generator/pwdGenerator'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PwdGenerator />
  </React.StrictMode>,
)
