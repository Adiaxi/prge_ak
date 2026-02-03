import React from 'react';
import {Typography, Button, Card, CardMedia, CardContent} from "@mui/material";
import {Link} from 'react-router-dom';
import bankImage from '../images/bank.png';
import bankCardImage from '../images/BankCard.jpg';
import bankMap from '../images/map.PNG';
import bankAdd from '../images/AddBank.jpg';

function BankAbout(props) {
    return (
        <div className='home'>

            <div className='menu'>

                <div className='menuLeft'>
                    <Link to='/'>
                        <img src={bankImage} className='bank_Icon' alt='Bank' />
                    </Link>

                    <Typography className='menuTitle' variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: '4px' }}>
                            BANK<span style={{ color: '#7B61FF' }}>PORTAL</span>
                        </Typography>

                </div>
            </div>

            <div className='about'>

BankPortal is a demonstration web application and UI template designed to present banks, their structure, and related data. The platform allows users to browse available banks, log in to the system, and manage selected banking information through a unified interface.


            </div>




        </div>
    );
}

export default BankAbout;