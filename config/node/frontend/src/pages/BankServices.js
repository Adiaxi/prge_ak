import React from 'react';
import {Typography, Button, Card, CardMedia, CardContent} from "@mui/material";
import {Link} from 'react-router-dom';
import bankImage from '../images/bank.png';
import bankCardImage from '../images/BankCard.jpg';
import bankMap from '../images/map.PNG';
import bankAdd from '../images/AddBank.jpg';

function BankServices(props) {
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

                <div className='servicesBody'>
                    <div className='homeDescription'>
                        <Typography className='serviceTitle' variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: '4px' }}>
                            BANK<span style={{ color: '#7B61FF' }}>SERVICES</span>
                        </Typography>

                    </div>

                    <div className='cards'>
                        <Card className="serviceCard">
                            <CardMedia image={bankCardImage} className="cardImage"/>
                            <CardContent>
                                <Typography className="cardTitle">
                                    Overview of availa  ble banks
                                </Typography>
                                <Button className="cardButton" component={Link} to="/list-of-banks">
                                    Go
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="serviceCard">
                            <CardMedia image={bankMap} className="cardImage"/>
                            <CardContent>
                                <Typography className="cardTitle">
                                    Map of available banks
                                </Typography>
                                <Button className="cardButton" component={Link} to="/bank-map">
                                    Go
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="serviceCard">
                            <CardMedia image={bankAdd} className="cardImage"/>
                            <CardContent>
                                <Typography className="cardTitle">
                                    Add bank
                                </Typography>
                                <Button className="cardButton" component={Link} to="/bank-add">
                                    Go
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                </div>




        </div>
    );
}

export default BankServices;