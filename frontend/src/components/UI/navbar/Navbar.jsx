import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import MyIconButton from "../button/MyIconButton";
import NavbarItem from "./NavbarItem";
import classes from "./Navbar.module.css";
import { Image } from 'primereact/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheelchair} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const logout = event => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {currentPage, setCurrentPage} = useState(0)
    const navbarItems = [
        <NavbarItem to="/wallet" className={classes.navItem}>
            <i className="pi pi-wallet"/>
        </NavbarItem>,

        <NavbarItem to="/competitions" className={classes.rotatingIcon}>
            <i className="fa-solid fa-gear"/>
        </NavbarItem>,

        <NavbarItem to="/inventory" className={classes.navItem}>
            <i className="pi pi-car"/>
        </NavbarItem>,

        <NavbarItem to="/marketplace" className={classes.navItem}>
            <i className="pi pi-shopping-bag"/>
        </NavbarItem>,

        <MyIconButton className={classes.navItem} onClick={logout}>
            <i className="pi pi-sign-out" color="#CF2624" style={{fontSize: "2em"}}/>
        </MyIconButton>]





    if (!isAuth) {
        return "";
    } else {
        return (
            <nav className="navbar bg-light w-100 px-5">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row w-100 d-flex flex-row justify-content-evenly align-items-center">
                    {navbarItems.map((item, index) =>
                        <div key={index}>{item}</div>
                    )}

                </ul>
            </nav>
        );
    }
};

export default Navbar;