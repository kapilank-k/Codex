import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Game from './components/GameItems/Game.jsx'; // <-- Step 2: Import the Game component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     {/* <Game />     <-- Step 4: Render the Game component instead */}
  </StrictMode>,
)
