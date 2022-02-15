import React from 'react'

export const LoadingScreen = () => {
    return (
        <div className="loading__loading-content">
            <h1 className="loading__title mb-5">Loading</h1>
            <div className="loading__loader-wrapper">
                <div className="loading__loader">
                    <div className="loading__circle"></div>
                </div>
            </div>
        </div>
    )
}
