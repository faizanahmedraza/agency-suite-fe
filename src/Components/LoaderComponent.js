import React from 'react'
import "@src/Styles/loader.css"
import { useSelector } from "@store/store"

const LoaderComponent = () => {
    const { detail } = useSelector(state => state.portal_settings)

    const { portal_settings } = detail

    return (
        <div className='loader-container'>
            <div className="lds-circle"><div style={{ backgroundColor: portal_settings ?  portal_settings.primary_color : "#7367f0" }}></div></div>
            <h4>Loading...</h4>
        </div>

    )
}

export default LoaderComponent