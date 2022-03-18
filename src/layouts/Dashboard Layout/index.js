import React from 'react'
import Navbar from './Navbar/navbar'
import Sidebar from './Sidebar/sidebar'

const Index = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                {children}
            </div>
        </>
    )
}

export default Index