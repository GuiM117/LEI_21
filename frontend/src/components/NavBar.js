import React from 'react'
import '../styles/NavBar.css'



const navBar = () => {
    return (
        <div className="navBar">
            <button onClick="activateLasers()" className="button">
                Hello
            </button>
        </div>
    )
}

export default navBar