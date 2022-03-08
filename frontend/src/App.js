import React from 'react';
//React toastify/css
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//React router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
//Pages
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx';
//Components
import Header from './components/Header.jsx'

//App
function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/login' element={ <Login /> }/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
