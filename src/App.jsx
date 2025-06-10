import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx'
import Products from './pages/Products.jsx'
import AboutUs from './pages/AboutUs.jsx'
import ProductPage from './pages/Product.jsx'
import Header from './components/Header/Header.jsx';
import Register from './pages/Register.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Login.jsx';
import './assets/css/styles.css';
import Account from './pages/Account.jsx';
import { jwtDecode } from 'jwt-decode';
import PDHome from './pages/PDHome.jsx';
import Favorites from './pages/Favorites.jsx';
import Settings from './pages/Settings.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; // Check if token is not expired
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}

function AppContent() {
  const location = useLocation();
  const user = isLoggedIn(); // Check if user is logged in

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Header userLogged={user}/>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product/:code" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/favorites" element={<Favorites />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/partnerdashboard" element={<PDHome />} />

        <Route path='/cart' element={<ProtectedRoute> <ShoppingCart /> </ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute> <Checkout /> </ProtectedRoute>} />

        
      </Routes>
    </>
  );
}