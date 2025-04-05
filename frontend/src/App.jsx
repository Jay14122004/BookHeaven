import React, { useEffect } from 'react'
import Home from './components/pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AllBooks from './components/pages/AllBooks'
import LogIn from './components/pages/LogIn'
import SignUp from './components/pages/SignUp'
import Profile from './components/pages/Profile'
import Cart from './components/pages/Cart'
import ViewBookDetail from './components/ViewBookDetail/ViewBookDetail'
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from './store/auth'
import { useNavigate } from 'react-router-dom'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Setting from './components/Profile/Setting'
import AllOrders from './components/pages/AllOrders'
import AddBook from './components/pages/AddBook'
import UpdateBook from './components/pages/UpdateBook'



function App() {
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedRole = localStorage.getItem("role");

    useEffect(()=>{
      if(localStorage.getItem("role") && localStorage.getItem("id") && localStorage.getItem("token")){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(storedRole));
      };
    },[]);
  

  return (
    <div>
      <Navbar/>
          <Routes>
            <Route exact path="/" element = {<Home/>}/>
            <Route exact path="/all-books" element = {<AllBooks/>}/>
            <Route exact path="/LogIn" element = {<LogIn/>}/>
            <Route exact path="/SignUp" element = {<SignUp/>}/>
            <Route exact path="/Profile" element = {<Profile/>}>
              {role === "user" ? <Route index element={<Favourites/>} /> : <Route index element={<AllOrders/>} />}
              {role === "admin" && (
                <Route path='/Profile/add-book' element={<AddBook/>}/>
              )}
              <Route path='/Profile/orderHistory' element={<UserOrderHistory/>}/>
              <Route path='/Profile/settings' element={<Setting/>}/>
            </Route>
            <Route exact path="/Cart" element = {<Cart/>}/>
            <Route exact path="/updateBook/:id" element = {<UpdateBook/>}/>
            <Route exact path='/view-book-details/:id' element={<ViewBookDetail/>}/>
        </Routes>
      <Footer/>
    </div>
  )
}

export default App;
