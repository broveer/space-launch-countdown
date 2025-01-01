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
      {/* <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
      <form 
        action="https://app.kit.com/forms/7517748/subscriptions" 
        className="seva-form formkit-form" 
        method="post"
        data-sv-form="7517748"
        data-uid="235060aff4"
        data-format="sticky bar"
        data-version="5"
        style={{backgroundColor: 'rgb(143, 81, 225)'}}
      >
        <div className="formkit-container" data-stacked="false">
          <div className="formkit-content" style={{color: 'rgb(255, 255, 255)', fontWeight: 700}}>
            <p>Stay up to date on my latest projects by signing up for my Newsletter!</p>
          </div>
          <div style={{color: 'rgb(255, 255, 255)'}}>
            <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
            <div data-element="fields" className="seva-fields formkit-fields" style={{color: 'rgb(255, 255, 255)'}}>
              <div className="formkit-field">
                <input 
                  className="formkit-input" 
                  name="email_address" 
                  aria-label="Email Address" 
                  placeholder="Email Address" 
                  required 
                  type="email"
                  style={{
                    color: 'rgb(68, 73, 81)',
                    borderColor: 'rgb(255, 255, 255)',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}
                />
              </div>
              <button 
                data-element="submit" 
                className="formkit-submit"
                style={{
                  color: 'rgb(255, 255, 255)',
                  backgroundColor: 'rgb(239, 39, 27)',
                  borderRadius: '4px',
                  fontWeight: 700
                }}
              >
                <div className="formkit-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>Sign up</span>
              </button>
            </div>
          </div>
        </div>
      </form> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-hubot font-bold">
              BSLC
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mona text-gray-300 hover:bg-[#EF271B99] transition-all px-3 py-2 rounded text-sm font-medium"
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
        className={`md:hidden fixed inset-0 z-50 bg-gray-800 transition-transform transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-hubot font-bold">Broveer's Space Launch Countdown</h2>
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
                className="text-gray-300 hover:bg-[#EF271B] py-2 rounded-md text-lg font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 font-mona">
            <h1 className='font-hubot my-1 text-xl font-bold'>I am Broveer</h1>
            <p className="mb-4">
              This website was created by me to provide information about upcoming space launches.
              <br></br>I am passionate about space exploration and technology.
              <br></br>Feel free to check out my other projects.
              <br></br>This website is <strong>open source</strong>, feel free to contribute on <Link href="https://github.com/broveer/space-launch-countdown" className="text-blue-400 hover:underline">GitHub</Link>.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Launch information sourced from <a href="https://thespacedevs.com" className="text-blue-400 hover:underline">thespacedevs.com</a>
            </p>
            <h3 className="text-lg font-mona font-semibold my-2 text-gray-300">Check this out</h3>
            <div className="flex font-hubot font-semibold space-x-4">
              <Link href="https://broveer.xyz" className="font-hubot hover:underline">
                Main Website
              </Link>
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
