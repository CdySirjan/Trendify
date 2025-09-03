import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
const ProductWrapper: React.FC = () => {
  // Provide placeholder values to satisfy ProductProps; replace with real fetching/context logic.
  const product = {} as any;
  const currency = 'USD' as any;
  const addToCart = (_item: any) => {};
  return <Product product={product} currency={currency} addToCart={addToCart} />;
};

const CartWrapper: React.FC = () => {
  // Placeholder values to satisfy CartProps; replace with real store/context logic.
  const products = [] as any[];
  const currency = 'USD' as any;
  const cartItems = [] as any;
  const updateQuantity = (_id: string, _size: string, _quantity: number) => {};
  return <Cart products={products} currency={currency} cartItems={cartItems} updateQuantity={updateQuantity} />;
};

const App: React.FC = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Navbar & Search */}
      <NavBar />
      <SearchBar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<ProductWrapper />} />
        <Route path="/cart" element={<CartWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
