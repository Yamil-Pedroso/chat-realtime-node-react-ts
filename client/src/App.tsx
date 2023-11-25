import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MyChatPage from './pages/MyChatPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-chat" element={<MyChatPage />} />
      </Routes>
    </Router>
  )
}

export default App
