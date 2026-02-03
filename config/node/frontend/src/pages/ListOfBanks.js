import React, { useState, useEffect } from 'react';
import {Typography, Button, Card, CardMedia, CardContent} from "@mui/material";
import {Link} from 'react-router-dom';
import bankImage from '../images/bank.png';
import bankCardImage from '../images/BankCard.jpg';
import bankMap from '../images/map.PNG';
import bankWorkers from '../images/workers.jpg';

function ListOfBanks(props) {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:10000/app/get_banks')
            .then(res => {
                if (!res.ok) throw new Error('Błąd sieci');
                return res.json();
            })
            .then(res => {
                console.log("Dane z backendu:", res);
                setBanks(res.data);
            })
            .catch(err => console.error("Błąd:", err));
    }, []);


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

                <div className='bankListBody'>
                    <div className="listName">
                        List of banks
                    </div>

                    <div className='cardsList'>
                        {banks && banks.length > 0 ? (
                            banks.map((bank) => (
                                <Card className="serviceCardList" key={bank.id}>
                                    <CardMedia image={bankCardImage} className="cardImage"/>
                                    <CardContent>
                                        <Typography className="cardTitle">
                                            {bank.name}
                                            <p class='listAddress'>{bank.address}</p>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography style={{ color: 'white', fontSize: '1.4rem', paddingLeft: '20px', marginTop: '200px', letterSpacing:'7px'}}>
                                Loading banks...
                            </Typography>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ListOfBanks;