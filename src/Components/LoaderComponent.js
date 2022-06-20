import React from 'react';
import '@src/Styles/loader.css';
import { useSelector } from '@store/store';

const LoaderComponent = () => {
    const { detail } = useSelector((state) => state.portal_settings);

    const { portal_settings } = detail;

    return (
        <div className="loader-container">
            <div className="lds-ripple">
                <div
                    style={{
                        border: `4px solid ${
                            portal_settings
                                ? portal_settings.secondary_color
                                : 'black'
                        }`,
                    }}></div>
                <div></div>
            </div>
            <h4>Loading...</h4>
        </div>
    );
};

export default LoaderComponent;
