import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Loginpage from './pages/loginpage';
import Signuppage from './pages/Signuppage';
import Homescreenpage from './pages/homescreenpage';


function App() {
  return (
    <Router>
    <div className="App">
     
      
          <Routes>
            <Route exact path="/" element={<Loginpage />} />
            <Route path="/sign-in" element={<Loginpage />} />
            <Route exact path="/home" element={<Homescreenpage/>} />
        
            {/* <Route path="/sign-up" element={<Signuppage />} /> */}
          </Routes>
       
    </div>
  </Router>
)
}
    
 

export default App;
