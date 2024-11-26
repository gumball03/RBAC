import Auth from "./components/auth/auth"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
