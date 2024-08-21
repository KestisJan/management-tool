import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Signup, Login, NotFound, UserProfile } from './pages';
import { NavBar, PrivateRoute } from './components';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile/:userId' element={<UserProfile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
