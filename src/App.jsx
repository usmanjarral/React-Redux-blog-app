import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Blogs from './components/Blogs';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <>
      <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
