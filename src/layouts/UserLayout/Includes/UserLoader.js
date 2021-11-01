import React from 'react';

const UserLoader = () => {
    return (
        <div>
            <div className="loading-overlayer" style={{display:'none'}}>
                <div className="loading-wrapper text-center">
                    <div className="loader-demo-box">
                        <div className="dot-opacity-loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoader;