import About from "../pages/About";
import Posts from "../pages/Posts";
import PostPage from "../pages/PostPage";
import Login from "../pages/Login";
import Competitions from "../pages/Competitions";
import Factory from "../pages/Factory";
import Inventory from "../pages/Inventory/Inventory";
import Marketplace from "../pages/Marketplace";
import OwnerCars from "../pages/Inventory/OwnerCars";
import Race from "../pages/Race";
import CarPage from "../pages/CarPage";

export const privateRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '/factory', component: <Factory/>, exact: true},
    {path: '/competitions', component: <Competitions/>, exact: true},
    {path: '/inventory', component: <Inventory/>, exact: true},
    {path: '/marketplace', component: <Marketplace/>, exact: true},
    {path: '/posts/:id', component: <PostPage/>, exact: true},
    {path: '/cars/:id', component: <CarPage/>, exact: true},
    {path: '/race', component: <Race/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]