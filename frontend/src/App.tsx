import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Signup, Login, NotFound } from './pages';
import { NavBar } from './components';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
