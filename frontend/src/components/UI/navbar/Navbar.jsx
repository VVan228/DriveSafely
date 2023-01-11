import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context";
import NavbarItem from "./NavbarItem";
import classes from "./Navbar.module.css";
import wheelIcon from "../../../icons/wheel.svg"

const Navbar = () => {

    const {isAuth, setIsAuth, account} = useContext(AuthContext)
    const {currentPage, setCurrentPage} = useState(0)

    const logout = () => {
        localStorage.setItem('auth', 'false')
        setIsAuth(false)
        setAccount
        console.log(isAuth)
    }

    const navbarItems = [
        {to: '/factory', className: classes.navItem, title: "Фабрика", icon: <i className="pi pi-box"></i>},
        {to: '/inventory', className: classes.navItem, title: "Гараж", icon: <i className="pi pi-car"></i>},
        {to: '/competitions', className: classes.navItem, title: "Соревнования", icon: <img src={wheelIcon} style={{width: "50px", height: "50px"}}></img>},
        {to: '/marketplace', className: classes.navItem, title: "Магазин", icon: <i className="pi pi-shopping-bag"></i>, onclick: {}},
        {to: '/login', className: classes.navItem, title: "Выйти", icon: <i className="pi pi-sign-out"></i>, onclick: () => logout()},
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
                                {item.icon}
                            </NavbarItem>
                        </div>
                    )}

                </ul>
            </nav>
        );
    }
};

export default Navbar;