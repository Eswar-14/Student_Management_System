import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import ListStudentComponent from './components/ListStudentComponent'
import StudentComponent from './components/StudentComponent'
import './App.css'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListStudentComponent />} />
            <Route path="/students" element={<ListStudentComponent />} />
            {/* Add this new route */}
            <Route path="/add-student" element={<StudentComponent />} />
            <Route path='/edit-student/:id' element={<StudentComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
