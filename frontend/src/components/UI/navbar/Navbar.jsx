import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import MyIconButton from "../button/MyIconButton";
import NavbarItem from "./NavbarItem";
import classes from "./Navbar.module.css";
import {Image} from 'primereact/image';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWheelchair} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {currentPage, setCurrentPage} = useState(0)

    const logout = event => {
        event.preventDefault()
        localStorage.removeItem('auth')
        setIsAuth(false)
        console.log(isAuth)
    }

    const navbarItems = [
        {to: '/factory', className: classes.navItem, title: "Фабрика", icon: "pi pi-box"},
        {to: '/inventory', className: classes.navItem, title: "Гараж", icon: "pi pi-car"},
        {to: '/competitions', className: [classes.navItem, classes.rotatingIcon].join(" "), title: "Соревнования", icon: "fa-solid fa-gear"},
        {to: '/marketplace', className: classes.navItem, title: "Магазин", icon: "pi pi-shopping-bag"},
        {to: '/login', className: classes.navItem, title: "Выйти", icon: "pi pi-sign-out", onclick: {logout}},
    ]


    if (!isAuth) {
        return "";
    } else {
        return (
            <nav className={[classes.nav, "navbar bg-light w-100 px-5"].join(" ")}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row w-100 d-flex flex-row justify-content-evenly align-items-center">
                    {navbarItems.map((item, index) =>
                        <div key={index}>
                            <NavbarItem to={item.to} className={item.className} title={item.title}
                                        onClick={item.onclick}>
                                <i className={item.icon}></i>
                            </NavbarItem>
                        </div>
                    )}

                </ul>
            </nav>
        );
    }
};

export default Navbar;