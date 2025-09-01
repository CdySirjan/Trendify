 import React from 'react'
 import { Routes, Route } from 'react-router-dom'
 import Navbar from './components/Navbar'
 import Footer from './components/Footer'
 import Home from './pages/Home'
 import Product from './pages/Product'
 import Cart from './pages/Cart'
 import About from './pages/About'
 export default function App() {
 return (
 <div className="min-h-screen flex flex-col">
 <Navbar />
 4
<main className="flex-1">
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/about" element={<About />} />
 <Route path="/product/:id" element={<Product />} />
 <Route path="/cart" element={<Cart />} />
 </Routes>
 </main>
 <Footer />
 </div>
 )
 }