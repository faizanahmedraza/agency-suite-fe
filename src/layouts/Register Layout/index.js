import React from 'react'
import Navbar from './Navbar/navbar'

const Index = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Index