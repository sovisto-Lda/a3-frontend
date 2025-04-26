import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx'
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import './assets/css/styles.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>

    </Router>
  );
}