import React from 'react'
import Navbar from './Navbar/navbar'
import Footer from './Footer/footer'

const Index = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Index