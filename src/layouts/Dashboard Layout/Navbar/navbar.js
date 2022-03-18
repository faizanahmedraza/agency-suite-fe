import React, { useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/solid'

const Navbar = () => {

    const [showUserInfo, setShowUserInfo] = useState(false)

    return (
        <div>
            <nav className='w-full h-auto'>
                <div className=' flex justify-between '>
                    <div className='py-2 bg-gray-900'>
                        <h1 className='text-3xl font-bold text-white px-5'>Many Request</h1>
                    </div>
                    <div className='py-2 px-6  hidden sm:block'>
                        <div class="ml-3 relative">
                            <div>
                                <button type="button" onClick={() => setShowUserInfo(!showUserInfo)} class="flex justify-between text-sm text-gray-600 px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <UserCircleIcon />
                                    <span>Haris Ghori</span>
                                    &nbsp;
                                    <svg className="text-gray-400 ml-1 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {
                                showUserInfo &&
                                (
                                    <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                        <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">Setting</a>
                                        <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-1">Give us feedback</a>
                                        <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar