import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className='w-full h-[80px]'>
            <div className='px-6 flex justify-between'>
                <div className='py-5'>
                    <h1 className='text-3xl font-bold'>
                        <Link to="/">Many Request</Link>
                    </h1>
                </div>
                <div className='py-7 hidden sm:block'>
                    <Link to="/login">
                        <button className='text-gray-500 font-semibold hover:text-black'>Log in</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar