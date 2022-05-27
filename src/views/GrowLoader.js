import React from "react";
import {
    Spinner
} from 'reactstrap'

const GrowLoader = (props) => {
    const style = {
        height: '3rem',
        width: '3rem'
    }
    const newStyle = props.style ? props.style : style;
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner type='grow' color="primary" className='me-25' style={newStyle} />
        </div>
    )
}

export default GrowLoader;