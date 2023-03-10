import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css";

const NavbarItem = ({children, ...props}) => {
    return (
        <li {...props}>
            <NavLink className={classes.navLink} to={props.to}>{children}</NavLink>
        </li>
    );
};

export default NavbarItem;