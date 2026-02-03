import {createHashRouter} from "react-router-dom";
import {Home, About, Map, Services, ListOfItems, NewUser, BankServices, ListOfBanks, BankMap, BankAdd, BankAbout, BankHelp} from "./LazyImports";


const routes = createHashRouter(
    [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/map',
            element: <Map/>
        },
        {
            path: '/services',
            element: <Services/>
        },
        {
            path: '/list',
            element: <ListOfItems/>
        },
        {
            path: '/newuser',
            element: <NewUser/>
        },
        {
            path: '*',
            element: <div>404</div>
        },

        {
            path: '/bank-services',
            element: <BankServices/>
        },
        {
            path: '/list-of-banks',
            element: <ListOfBanks/>
        },
        {
            path: '/bank-map',
            element: <BankMap/>
        },
        {
            path: '/bank-add',
            element: <BankAdd/>
        },
        {
            path: '/bank-about',
            element: <BankAbout/>
        },
        {
            path: '/bank-help',
            element: <BankHelp/>
        },
    ]
)


export default routes;