import React from 'react'
import { useSelector } from "@store/store"
import { Navigate } from 'react-router-dom'

const Ability = ({ children, route }) => {

    const { user } = useSelector(state => state.login)

    const { customer_restricted } = route.meta

    if (user && user.roles[0].name === "Customer" && customer_restricted  ) return <Navigate to='/un-authorized' replace/>

    return (
        <>{children}</>
    )
}

export default Ability