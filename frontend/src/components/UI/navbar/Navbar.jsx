import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = event => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <nav className="navbar bg-light w-100 px-5">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">О нас</NavLink>
                </li>
                <li className="nav-item ms-3">
                    <NavLink className="nav-link" to="/posts">Посты</NavLink>
                </li>
            </ul>
            <MyButton onClick={logout}>Выйти</MyButton>
        </nav>
    );
};

export default Navbar;