import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Register, Login, NotFound } from './pages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
