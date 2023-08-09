import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loginpage from './pages/loginpage';
import Signuppage from './pages/Signuppage';
import Homescreenpage from './pages/homescreenpage';
import Blogpage from './pages/blogpage';
import Admindashboard from './pages/admindashboard';
import Dashloginpage from './pages/dashloginpage';

import CardContext from './context/CardContext';
import UserContext from './context/UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [user, setUser] = useState(' ');
  const [cards, setCards] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CardContext.Provider value={{ cards, setCards }}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Loginpage />} />
              <Route path="/sign-in" element={<Loginpage />} />
              <Route path="/home" element={<Homescreenpage />} />
              <Route path="/blog/:id" element={<Blogpage />} />
              <Route path="/admindashboard" element={<Admindashboard />} />
              <Route path="/sign-up" element={<Signuppage />} />
              <Route path="/dashlogin" element={<Dashloginpage />} />
            </Routes>
          </div>
        </Router>
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
