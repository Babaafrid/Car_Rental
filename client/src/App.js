import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CarBooking from './pages/CarBooking'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import 'antd/dist/antd.min.css';
function App() {
  const ProtectedRoute=()=>{
    return localStorage.getItem('user')?<Home />:<Navigate to='/login'/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/userbookings' element={<UserBookings />} />
          <Route exact path='/booking/:carid' element={<CarBooking />} />
          <Route exact path='/addcar' element={<AddCar />} />
          <Route exact path='/editcar/:carid' element={<EditCar />} />
          <Route exact path='/admin' element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
