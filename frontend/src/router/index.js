import About from "../pages/About";
import Posts from "../pages/Posts";
import PostPage from "../pages/PostPage";
import Login from "../pages/Login";
import Competitions from "../pages/Competitions";
import Wallet from "../pages/Wallet";
import Inventory from "../pages/Inventory";
import Marketplace from "../pages/Marketplace";

export const privateRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '/wallet', component: <Wallet/>, exact: true},
    {path: '/competitions', component: <Competitions/>, exact: true},
    {path: '/inventory', component: <Inventory/>, exact: true},
    {path: '/marketplace', component: <Marketplace/>, exact: true},
    {path: '/posts/:id', component: <PostPage/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]