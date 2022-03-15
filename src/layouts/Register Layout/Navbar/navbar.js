import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-screen h-[80px]'>
            <div className='px-6 flex justify-between'>
                <div className='py-5'>
                    <h1 className='text-3xl font-bold'>Many Request</h1>
                </div>
                <div className='py-7 hidden sm:block'>
                    <button className='text-gray-500 font-semibold hover:text-black'>Log in</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar