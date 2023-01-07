import React, {useContext} from 'react';
import {Route, Routes, Switch} from "react-router-dom";
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import Error from "../../pages/Error";
import PostPage from "../../pages/PostPage";
import {publicRoutes, privateRoutes} from "../../router";
import {AuthContext} from "../../context";
import Loader from "./loader/Loader";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const AppRouter = () => {

    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={450}
                classNames="fade"
            ><Switch>
                {isAuth ? privateRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
                ) : ""}
                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
                )}
            </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AppRouter;