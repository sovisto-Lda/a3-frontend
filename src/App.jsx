import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx'
import Products from './pages/Products.jsx'
import Header from './components/Header/Header.jsx';
import Register from './pages/Register.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Login.jsx'
import './assets/css/styles.css';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}