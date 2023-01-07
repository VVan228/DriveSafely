import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import MyIconButton from "../button/MyIconButton";
import NavbarItem from "./NavbarItem";
import classes from "./Navbar.module.css";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {currentPage, setCurrentPage} = useState(0)
    const navbarItems = [
        <NavbarItem to="/wallet"><i className="bi bi-wallet"></i></NavbarItem>,
        <NavbarItem to="/competitions"><i className="bi bi-speedometer2"></i></NavbarItem>,
        <NavbarItem to="/inventory"><i className="bi bi-car-front"></i></NavbarItem>,
        <NavbarItem to="/marketplace"><i className="bi bi-cart"></i></NavbarItem>]


    const logout = event => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
    }


    if (!isAuth) {
        return "";
    } else {
        return (
            <nav className="navbar bg-light w-100 px-5">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row w-100 d-flex flex-row justify-content-evenly">
                    {navbarItems.map((item, index) =>
                        <div key={index}>{item}</div>
                    )}
                    <MyIconButton onClick={logout} className="m-0"><i className="bi bi-box-arrow-right p-0 m-0"
                                                                      color="#CF2624"/></MyIconButton>
                </ul>
            </nav>
        );
    }
};

export default Navbar;