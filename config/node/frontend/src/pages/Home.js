import React from 'react';
import {Typography, Button} from "@mui/material";
import {Link} from 'react-router-dom';
import bankImage from '../images/bank.png';

function Home(props) {
    return (
        <div className='home'>

            <div className='menu'>

                <div className='menuLeft'>
                    <Link to='/'>
                        <img src={bankImage} className='bank_Icon' alt='Bank' />
                    </Link>

                    <Button className='leftButtons' component={Link} to="/bank-about">
                        About
                    </Button>

                    <Button className='leftButtons' href="https://github.com/Adiaxi" target="_blank">
                        Contact
                    </Button>

                    <Button className='leftButtons' component={Link} to="/bank-help">
                        Help
                    </Button>


                </div>

                <div className='homeBody'>
                    <div className='homeDescription'>
                        <Typography className='homeTitle' variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: '4px' }}>
                            BANK<span style={{ color: '#7B61FF' }}>PORTAL</span>
                        </Typography>
                        <h2>Site about bank locations and related features.</h2>
                        <Button component={Link} to="/bank-services" className='homeStart'>
                            START
                        </Button>
                    </div>

                    <div>
                            <img src={bankImage} className='bankBigIcon' alt='Bank' />
                    </div>

                </div>



            </div>

        </div>
    );
}

export default Home;