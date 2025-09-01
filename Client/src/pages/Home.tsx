 import React from 'react'
 import { Link } from 'react-router-dom'
 export default function Home() {
 return (
 <section className="container mx-auto px-4 py-12">
 <div className="grid md:grid-cols-2 gap-8 items-center">
 <div>
 <h1 className="text-4xl font-bold mb-4">Welcome to MyShop</h1>
 <p className="mb-6 text-gray-600">
 A minimal MERN e-commerce frontend starter rebuilt in TypeScript +
 Tailwind.
 </p>
 <div className="flex gap-4">
 <Link to="/products" className="px-6 py-3 bg-blue-600 text-white 
rounded">
 Browse Products
 </Link>
 <Link to="/cart" className="px-6 py-3 border rounded">
 View Cart
 </Link>
 </div>
 </div>
 <div>
 <div className="w-full rounded-lg bg-gray-100 h-64 flex items-center 
justify-center">
 <span className="text-gray-400">Hero / image placeholder</span>
 </div>
 </div>
 </div>
 </section>
 )
 }