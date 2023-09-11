import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect, useState } from 'react';
import store from './store';
import { useSelector } from 'react-redux';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ResetPassword from './components/User/ResetPassword';
import ForgotPassword from './components/User/ForgotPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/DashBoard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import NotFound from './components/layout/Not Found/NotFound';


function App() {

  const {isAuthenticated,user,loading} = useSelector(state => state.user)
  const [stripeApiKey,setStripeApiKey] = useState('')

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:['Roboto','Droid Sans','Chilanka']
      }
    })

    store.dispatch(loadUser())

    getStripeApiKey();
  },[])

  // window.addEventListener('contextmenu', (e)=>e.preventDefault())

  const PaymentRoute = ({ loading,isAuthenticated }) => {
    if(loading){
      <Loader/>

    }
    else if (isAuthenticated === false) {
      return <Navigate to="/login" replace />;
    }
     else {
      return (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
          );
    }
  };
  
  return (
    <Router>
      <Header />
      <Routes>

        <Route exact path='/login' element={<LoginSignUp />}/>
      </Routes>
      {isAuthenticated  && <UserOptions  user={user}/>}
      <Routes>
        
        <Route exact path='/' element={<Home/>}/>
    
        <Route  path='/products' element={<Products />}/>
        <Route  path='/products/:keyword' element={<Products />}/>
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path='/search' element={<Search />}/>
        <Route exact path='/contact' element={<Contact />}/>
        <Route exact path='/about' element={<About />}/>
      
        <Route path="/account"
          element={
            loading ?  <Loader /> : (isAuthenticated === false) ?(<Navigate to="/login" replace />)  :  <Profile />
          }
        />
        <Route path="/me/update"
          element={
            loading ?  <Loader /> : (isAuthenticated === false) ? (<Navigate to="/login" replace />):   <UpdateProfile />
          }
        />
         <Route path="/password/update"
          element={
            loading ?  <Loader /> : (isAuthenticated === false) ?  (<Navigate to="/login" replace />): <UpdatePassword />
          }
        />

        <Route exact path='/password/forgot' element={<ForgotPassword />}/>
        <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route exact path='/cart' element={<Cart />}/>

        <Route path="/shipping"
          element={
            loading ?  <Loader /> : (isAuthenticated === false) ? (<Navigate to="/login" replace />) : <Shipping />
          }
        />
        <Route path="/order/confirm"
          element={
            loading ?  <Loader /> : (isAuthenticated === false) ?  (<Navigate to="/login" replace />):<ConfirmOrder /> 
          }
        />
        <Route path="/process/payment"
              element={<PaymentRoute isAuthenticated={isAuthenticated} />}
        />
       
        <Route path="/success"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? (<Navigate to="/login" replace />) : <OrderSuccess />
              }
        />

        <Route path="/orders"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ?  (<Navigate to="/login" replace />): <MyOrders />
              }
        />
        <Route path="/order/:id"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ?  (<Navigate to="/login" replace />): <OrderDetails />
              }
        />

        <Route path="/admin/dashboard"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<Dashboard />
              }
        />    
         <Route path="/admin/products"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<ProductList />
              }
        /> 
         <Route path="/admin/product"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<NewProduct />
              }
        /> 
         <Route path="/admin/product/:id"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<UpdateProduct />
              }
        /> 
         <Route path="/admin/orders"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<OrderList />
              }
        />
        <Route path="/admin/order/:id"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<ProcessOrder />
              }
        />
         <Route path="/admin/users"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<UsersList />
              }
        />
        <Route path="/admin/user/:id"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<UpdateUser />
              }
        />

        <Route path="/admin/reviews"
              element={
                loading ?  <Loader /> : (isAuthenticated === false) ? 
                 (<Navigate to="/login" replace />): (user.role !== 'admin') ?
                 (<Navigate to="/login" replace />):<ProductReviews />
              }
        />  
        <Route path='*' element={<NotFound/>}/>



  
      </Routes>
      <Footer  />
    </Router>
  );
}

export default App;