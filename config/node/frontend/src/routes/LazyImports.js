import {lazy} from 'react';


export const Home = lazy(() => import('../pages/Home'));
export const About = lazy(() => import('../pages/About'));
export const ListOfItems = lazy(() => import('../pages/ListOfItems'));
export const NewUser = lazy(() => import('../pages/NewUser'));
export const Map = lazy(() => import('../pages/Map'));
export const Services = lazy(() => import('../pages/Services'));

export const BankServices = lazy(() => import('../pages/BankServices'));
export const ListOfBanks = lazy(() => import('../pages/ListOfBanks'));
export const BankMap = lazy(() => import('../pages/BankMap'));
export const BankAdd = lazy(() => import('../pages/BankAdd'));
export const BankAbout = lazy(() => import('../pages/BankAbout'));
export const BankHelp = lazy(() => import('../pages/BankHelp'));