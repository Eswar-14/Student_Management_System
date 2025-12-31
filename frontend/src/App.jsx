import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import ListStudentComponent from './components/ListComponent'
import './App.css'

function App() {
  
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <ListStudentComponent />
      </div>
      <FooterComponent />
    </>
  )
}

export default App
