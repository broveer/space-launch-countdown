'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/launches', label: 'Other Launches' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 border-b border-b-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-hubot font-bold text-[#EF271B]">
              space.broveer.xyz
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mona text-gray-300 hover:text-[#EF271B] px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-[#EF271B]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden fixed inset-0 z-50 bg-gray-800 transition-transform transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-hubot font-bold text-[#EF271B]">space.broveer.xyz</h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-[#EF271B]"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-[#EF271B] px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-mona font-semibold mb-2 text-gray-300">Follow me</h3>
            <div className="flex font-hubot font-semibold space-x-4">
              <a href="https://github.com/broveer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                GitHub
              </a>
              <a href="https://bsky.app/profile/broveer.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                Bluesky
              </a>
              <a href="https://twitter.com/realbroveer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  )
}

export default Navbar