import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Cart', to: '/cart' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyShop
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md border"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
