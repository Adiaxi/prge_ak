import {Suspense} from "react";
import Home from "./pages/Home";
import './styles/style.scss';
import {CircularProgress} from "@mui/material"

import {RouterProvider} from 'react-router-dom'
import routes from './routes/Router'

function App() {
  return (
    <div className="app">
        <Suspense fallback={<CircularProgress color="secondary" />}>

            <RouterProvider router={routes}/>
        </Suspense>

    </div>
  );
}

export default App;
