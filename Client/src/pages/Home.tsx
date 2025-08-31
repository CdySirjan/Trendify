import { useState } from "react";
import { ShoppingCart, Heart, Menu, X, Search, User } from "lucide-react";

const navigationItems = ["Home", "Men", "Women", "Kids", "Accessories", "Sale"];

const featuredProducts = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: 129.99,
    image: "https://via.placeholder.com/300x400?text=Denim+Jacket",
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    price: 89.99,
    image: "https://via.placeholder.com/300x400?text=Floral+Dress",
  },
  {
    id: 3,
    name: "Cotton Basic T-Shirt",
    price: 24.99,
    image: "https://via.placeholder.com/300x400?text=T-Shirt",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ClothShop</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline hover:text-yellow-300 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden md:flex space-x-4 items-center">
            <Search className="w-5 h-5 cursor-pointer" />
            <User className="w-5 h-5 cursor-pointer" />
            <Heart className="w-5 h-5 cursor-pointer" />
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-blue-700">
            <ul className="flex flex-col px-4 py-2 space-y-2">
              {navigationItems.map((item) => (
                <li key={item}>
                  <a href="#" className="block py-2 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold mb-2">Welcome to ClothShop</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find your perfect style with our exclusive collection of clothing.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        &copy; 2025 ClothShop. All rights reserved.
      </footer>
    </div>
  );
}
