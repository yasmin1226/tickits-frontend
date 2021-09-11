import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
const NavBar = props => {
    const token = localStorage.getItem("token");
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/tikets">Tikets</NavLink>
                        </li> */}


                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register" tabIndex="-1" > Rgister</NavLink>
                        </li>
                        {token && <li className="nav-item">
                            <a className="nav-link" onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = "http://localhost:3000/login"

                            }} tabIndex="-1" > LogOut</a>
                        </li>}
                        {token == undefined && <li className="nav-item">
                            <NavLink className="nav-link" to="/login" tabIndex="-1" > Login</NavLink>
                        </li>}
                    </ul>

                </div>
            </nav>
        </>
    );

}
export default NavBar;