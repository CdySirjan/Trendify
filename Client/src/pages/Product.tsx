 import React from 'react'
 import { useParams } from 'react-router-dom'
 export default function Product() {
 const { id } = useParams()
 return (
 <section className="container mx-auto px-4 py-12">
 <h2 className="text-2xl font-semibold mb-4">Product {id}</h2>
 <p className="text-gray-600">Product details placeholder</p>
 </section>
 )
 }