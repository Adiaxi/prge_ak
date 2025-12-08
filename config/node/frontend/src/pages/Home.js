import React from 'react';
import {Typography, Button} from "@mui/material"

function Home(props) {
    return (
        <div className='home'>
            <h1 className='home__header'>GEOPORTAL</h1>
            <Typography>
                Geoportal tematyczny poświęcony dany przestrzennym
            </Typography>

            <Button className='home__button' variant='contained' size='large' >
                START
            </Button>

        </div>
    );
}



export default Home;