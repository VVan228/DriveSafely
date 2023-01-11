import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import Error from "../../pages/Error";
import PostPage from "../../pages/PostPage";
import {publicRoutes, privateRoutes} from "../../router";
import {AuthContext} from "../../context";
import Loader from "./loader/Loader";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const AppRouter = (props) => {

    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    // console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <TransitionGroup className={props.className}>
            <CSSTransition
                key={window.location.key}
                timeout={450}
                classNames="fade"
            ><Routes>
                {isAuth ? privateRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
                ) : ""}
                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
                )}
            </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AppRouter;